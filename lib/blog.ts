import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  cover?: string;
};

export type Post = PostMeta & {
  content: string;
};

async function listSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

function estimateReadingTime(text: string): string {
  // ~200 WPM is the conservative reading-speed estimate used everywhere.
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await listSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        author: String(data.author ?? "Darrel"),
        cover: data.cover ? String(data.cover) : undefined,
        readingTime: estimateReadingTime(content),
      } satisfies PostMeta;
    }),
  );
  // Newest first.
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      excerpt: String(data.excerpt ?? ""),
      date: String(data.date ?? ""),
      author: String(data.author ?? "Darrel"),
      cover: data.cover ? String(data.cover) : undefined,
      readingTime: estimateReadingTime(content),
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  return listSlugs();
}
