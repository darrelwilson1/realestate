import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { FadeIn } from "@/components/motion/fade-in";
import { getAllSlugs, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

// Pre-render every post at build time. ISR can be opted-in via revalidate below.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Custom MDX renderers — gives blog posts the same display-font / muted-text feel as the rest of the site.
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 font-display text-4xl font-medium tracking-tight"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 font-display text-2xl font-medium tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 font-display text-xl font-medium tracking-tight" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mt-5 text-pretty text-lg leading-relaxed text-foreground/85"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/85" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/85" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l-2 border-brand pl-5 text-pretty text-xl italic text-foreground/90"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-brand underline-offset-4 transition-colors hover:underline"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <section className="relative pt-24 sm:pt-32">
        <div className="glow-radial absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>
          <FadeIn>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-pretty text-xl text-muted-foreground">
              {post.excerpt}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 pt-12 sm:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="prose-custom">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
