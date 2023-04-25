import { initLocalStrategy } from "./local";
import { initJwtStrategy } from "./jwt";

export const initAuth = () => {
  initLocalStrategy();
  initJwtStrategy();
};
