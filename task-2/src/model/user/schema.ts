import z from "zod";

export type GetUserSchemaParams = {
  refineLogin?: [(v: string) => boolean, (v: string) => { message: string }];
};

export const getUserSchema = (params?: GetUserSchemaParams) => {
  const login = z.string().email();

  return z
    .object({
      id: z.string().uuid(),
      login: params?.refineLogin ? login.refine(...params.refineLogin) : login,
      password: z.string().regex(/[a-zA-Z]/).regex(/\d/),
      age: z.number().min(4).max(130),
      isDeleted: z.boolean(),
    })
    .required();
};

export type UserSchema = ReturnType<typeof getUserSchema>;
export type User = z.infer<UserSchema>;

export const getUserSchemaForCreation = (params: GetUserSchemaParams) =>
  getUserSchema(params).omit({ id: true, isDeleted: true });

export type CreateUserSchema = ReturnType<typeof getUserSchemaForCreation>;
export type CreateUserData = z.infer<CreateUserSchema>;

export const getUserSchemaForUpdate = () =>
  getUserSchema().omit({ id: true, isDeleted: true }).partial();

export type UpdateUserSchema = ReturnType<typeof getUserSchemaForUpdate>;
export type UpdateUserData = z.infer<CreateUserSchema>;

export const suggestQueryParamsSchema = z.object({
  query: z.string().default(""),
  limit: z.string().regex(/^\d+$/).transform(Number),
});
