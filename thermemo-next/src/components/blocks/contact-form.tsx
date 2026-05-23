"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  message: z.string().min(1, "Pesan wajib diisi"),
  agree: z.literal(true, "Wajib disetujui"),
});

type Schema = z.infer<typeof formSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    } as unknown as Schema,
  });

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    console.log(data);
    setSubmitted(true);
    form.reset();
  });

  if (submitted) {
    return (
      <div className="w-full gap-2 rounded-md border p-2 sm:p-5 md:p-8">
        <div className="h-full px-3 py-6">
          <div className="mx-auto mb-4 flex w-fit justify-center rounded-full border p-2">
            <Check className="size-8" />
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold text-pretty">
            Terima kasih
          </h2>
          <p className="text-muted-foreground text-center text-lg text-pretty">
            Pesan diterima. kami akan balas dalam 1×24 jam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 space-y-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nama lengkap *</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nama kamu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="kamu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>WhatsApp (opsional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="08xxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tulis pesanmu di sini"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Saya setuju dengan ketentuan penggunaan</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end pt-3">
          <Button className="rounded-lg" size="sm">
            Kirim pesan
          </Button>
        </div>
      </form>
    </Form>
  );
}
