import z from "zod";

export const addUserToGroupSchema = z.object({
  userIds: z.array(z.string()).default([]),
  groupId: z.string(),
});
