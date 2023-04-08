import { logger } from "@loggers";

export const registerServiceLogger = <T>(service: T): T => {
  const serviceToProxy = service as Record<string | symbol, unknown>;

  const proxiedService = new Proxy(serviceToProxy, {
    get(target, property) {
      const prop = target[property];
      if (typeof prop === "function") {
        return function (...args: unknown[]) {
          logger.info(`${target.constructor.name} ${String(property)}(${args.join(", ")})`);

          return prop.apply(target, args) as unknown;
        };
      }

      return target[property];
    },
  });

  return proxiedService as T;
};
