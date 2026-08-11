import { z } from "zod";

// Accepts both the /contact phone form (phone only) and the landing CTA form
// (name + email + message). All fields optional at the shape level; the refine
// requires at least a phone OR an email so there's always a way to reach back.
export const contactFormSchema = z
  .object({
    phone: z
      .string()
      .min(6, "Phone number is too short")
      .max(20)
      .regex(/^[+\d\s()-]+$/, "Invalid phone number")
      .optional(),
    name: z.string().min(1).max(120).optional(),
    email: z.string().email("Invalid email").max(254).optional(),
    message: z.string().max(5000).optional(),
    utm_source: z.string().max(80).regex(/^[a-zA-Z0-9_-]+$/).optional(),
    utm_medium: z.string().max(80).regex(/^[a-zA-Z0-9_-]+$/).optional(),
    utm_campaign: z.string().max(120).regex(/^[a-zA-Z0-9_-]+$/).optional(),
    utm_content: z.string().max(180).regex(/^[a-zA-Z0-9_-]+$/).optional(),
    source_path: z.string().max(300).regex(/^\/[a-zA-Z0-9_/?&=.-]*$/).optional(),
  })
  .refine((d) => Boolean(d.phone || d.email), {
    message: "Provide a phone number or email",
    path: ["phone"],
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
