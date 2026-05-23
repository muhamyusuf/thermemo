import { notFound } from "next/navigation";
import Link from "next/link";
import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { BLOG } from "@/lib/data";

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
  return { title: post.title, description: post.excerpt };
}

const toneGradients: Record<string, string> = {
  g1: "linear-gradient(160deg, #b0aba2, #3b3631)",
  g2: "linear-gradient(200deg, #d4cfc6, #2a2622)",
  g3: "linear-gradient(135deg, #9b9690, #545049)",
  g4: "linear-gradient(180deg, #cac4ba, #6a625a)",
  g5: "linear-gradient(220deg, #88847e, #1a1816)",
  g6: "linear-gradient(160deg, #d8d3ca, #4a443e)",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <Background>
      <article className="py-28 lg:pt-44 lg:pb-32">
        <div className="container max-w-2xl">
          {/* back */}
          <div className="mb-10">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">← Kembali ke blog</Link>
            </Button>
          </div>

          {/* hero */}
          <div
            className="w-full h-64 mb-10"
            style={{
              background: toneGradients[post.tone] ?? toneGradients.g1,
              borderRadius: "2px",
            }}
          />

          {/* header */}
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

          {/* body placeholder */}
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              {post.excerpt}
            </p>
            <p>
              ini adalah field notes thermemo — catatan kecil dari balik booth,
              tentang hal-hal yang kami pelajari setiap sesinya.
            </p>
            <p>
              tulisan ini sedang dalam pengembangan. nantikan update berikutnya
              di instagram kami{" "}
              <a
                href="https://instagram.com/thermemo.id"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @thermemo.id
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </Background>
  );
}
