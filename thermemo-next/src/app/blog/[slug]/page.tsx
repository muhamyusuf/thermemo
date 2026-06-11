import { notFound } from "next/navigation";
import Link from "next/link";
import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { BLOG, getToneGradient } from "@/lib/data";
import { BLOG_CONTENT } from "@/lib/blog-content";

export async function generateStaticParams() {
  return BLOG.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | thermemo`,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG.find((p) => p.slug === slug);

  if (!post) notFound();

  const content = BLOG_CONTENT[slug];

  return (
    <Background>
      <article className="py-28 lg:pt-44 lg:pb-32">
        <div className="container max-w-2xl">
          <div className="mb-10">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">← Kembali ke blog</Link>
            </Button>
          </div>

          <div
            className="w-full h-64 mb-10"
            style={{
              background: getToneGradient(post.tone),
              borderRadius: "2px",
            }}
          />

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-primary">
                {post.cat}
              </span>
              <span className="text-muted-foreground text-xs">
                {post.date} · {post.read} read
              </span>
            </div>
            <h1 className="text-3xl tracking-tight md:text-4xl font-bold">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            {content ? (
              content.map((block, i) => {
                if (block.type === "heading") {
                  return <h2 key={i} className="text-foreground">{block.text}</h2>;
                }
                if (block.type === "pullquote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-primary pl-4 italic text-primary text-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return <p key={i} className="leading-7">{block.text}</p>;
              })
            ) : (
              <>
                <p>{post.excerpt}</p>
                <p>
                  ini adalah field notes thermemo — catatan kecil dari balik booth,
                  tentang hal-hal yang kami pelajari setiap sesinya.
                </p>
              </>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              tag{" "}
              <span className="font-semibold text-foreground">@thermemo.id #thermemo</span>{" "}
              kalau kamu punya cerita sendiri dari booth.
            </p>
            <Button asChild>
              <Link href="/photobooth">Start the Booth</Link>
            </Button>
          </div>
        </div>
      </article>
    </Background>
  );
}
