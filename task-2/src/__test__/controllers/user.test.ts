import express from "express";
import { router as userRouter } from "@routes/user";
import { userService } from "@services";
import { users as usersMock, user as userMock } from "../__mocks__/users";
import request from "supertest";
import bodyParser from "body-parser";

jest.mock("@services");

describe("/user", () => {
  const userServiceMock = jest.mocked(userService);
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/", userRouter);

  const user = request(app);

  test("GET / returns 200 and all users", async () => {
    userServiceMock.getAll = jest.fn(async () =>
      Promise.resolve(usersMock)
    ) as unknown as typeof userServiceMock.getAll;

    const response = await user.get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(usersMock);
  });

  test("GET /:id returns 200 and found user", async () => {
    const getByIdMock = jest.fn(async () =>
      Promise.resolve(userMock)
    ) as unknown as typeof userServiceMock.getById;
    userServiceMock.getById = getByIdMock;

    const response = await user.get("/test-id");

    expect(getByIdMock).toBeCalledWith("test-id");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userMock);
  });

  test("PUT /:id returns 200 and updated user", async () => {
    const updateMock = jest.fn(async () =>
      Promise.resolve(userMock)
    ) as unknown as typeof userServiceMock.update;
    userServiceMock.update = updateMock;

    const body = { age: 21 };

    const response = await user.put("/test-id").send(body);

    expect(updateMock).toBeCalledWith("test-id", body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userMock);
  });

  test("DELETE /:id returns 200 and deleted user", async () => {
    const deleteMock = jest.fn(async () =>
      Promise.resolve(userMock)
    ) as unknown as typeof userServiceMock.delete;
    userServiceMock.delete = deleteMock;

    const response = await user.delete("/test-id");

    expect(deleteMock).toBeCalledWith("test-id");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userMock);
  });

  test("POST /create returns 200 and created user", async () => {
    const createMock = jest.fn(async () =>
      Promise.resolve(userMock)
    ) as unknown as typeof userServiceMock.create;
    userServiceMock.create = createMock;

    const body = { age: 21 };

    const response = await user.post("/create").send(body);

    expect(createMock).toBeCalledWith(body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(userMock);
  });

  test("GET /suggest returns 200 and suggested users", async () => {
    const suggestMock = jest.fn(async () =>
      Promise.resolve(userMock)
    ) as unknown as typeof userServiceMock.suggest;
    userServiceMock.suggest = suggestMock;

    const response = await user.get("/suggest?query=test&limit=20");

    expect(suggestMock).toBeCalledWith({ query: "test", limit: "20" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userMock);
  });
});
