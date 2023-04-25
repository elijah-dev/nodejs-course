import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const deleteUserById: RequestHandler = catchErrors(async (req, res) => {
    const user = await userService.delete(req.params.id);

    res.status(200);
    res.json(user);
});
