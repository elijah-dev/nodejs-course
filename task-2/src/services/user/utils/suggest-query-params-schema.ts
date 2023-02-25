import z from "zod";

export const suggestQueryParamsSchema = z.object({
  query: z.string().default(""),
  limit: z.string().regex(/^\d+$/).transform(Number),
});
