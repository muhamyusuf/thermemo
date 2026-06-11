import Link from "next/link";
import { Background } from "@/components/background";
import { Card, CardContent } from "@/components/ui/card";
import { BLOG, getToneGradient } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Field notes dari thermemo — cerita dari booth, tips menyimpan struk, dan hal-hal kecil yang layak ditulis.",
};

export default function BlogPage() {
  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-3">
              field notes
            </p>
            <h1 className="text-3xl tracking-tight md:text-4xl lg:text-5xl mb-4">
              Stories from the booth.
            </h1>
            <p
              className="text-primary text-xl"
              style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
            >
              fragments worth reading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div
                    className="h-48 w-full"
                    style={{ background: getToneGradient(post.tone) }}
                  />
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-primary">
                        {post.cat}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {post.date} · {post.read} read
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-xl leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Background>
  );
}
