import React from "react";
import Link from "next/link";
import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";

const contactInfo = [
  {
    title: "Lokasi",
    content: (
      <p className="text-muted-foreground mt-3">
        Jl. Cigadung Selatan No. 42
        <br />
        Bandung, Jawa Barat
      </p>
    ),
  },
  {
    title: "Jam buka",
    content: (
      <div className="mt-3">
        <p className="text-muted-foreground">Selasa – Minggu</p>
        <p className="text-muted-foreground">12.00 – 21.00 WIB</p>
        <p className="text-muted-foreground text-sm mt-1">(Senin tutup)</p>
      </div>
    ),
  },
  {
    title: "Hubungi kami",
    content: (
      <div className="mt-3 space-y-2">
        <div>
          <p className="font-medium">Instagram</p>
          <Link
            href="https://instagram.com/thermemo.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            @thermemo.id
          </Link>
        </div>
        <div>
          <p className="font-medium">WhatsApp</p>
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            +62 812-3456-7890
          </Link>
        </div>
        <div>
          <p className="font-medium">Email</p>
          <Link
            href="mailto:halo@thermemo.id"
            className="text-muted-foreground hover:text-foreground"
          >
            halo@thermemo.id
          </Link>
        </div>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Hubungi kami
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          Ada pertanyaan, kolaborasi, atau cuma mau say hi — kami di sini.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">Kirim pesan</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
