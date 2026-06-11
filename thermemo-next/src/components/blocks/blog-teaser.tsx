import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG } from "@/lib/data";

export function BlogTeaser() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              from the blog
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Notes for better receipt memories.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline md:flex"
          >
            View all posts <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {BLOG.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="border bg-card p-5 shadow-receipt transition-transform hover:-translate-y-1">
              <p className="mb-10 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {post.cat} · {post.read}
              </p>
              <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline md:hidden"
        >
          View all posts <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
