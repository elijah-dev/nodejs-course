module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/src/utils/$1",
    "^@controllers(.*)$": "<rootDir>/src/controllers/$1",
    "^@routes(.*)$": "<rootDir>/src/routes/$1",
    "^@services(.*)$": "<rootDir>/src/services/$1",
    "^@middleware(.*)$": "<rootDir>/src/middleware/$1",
    "^@loggers(.*)$": "<rootDir>/src/middleware/$1",
    "^@model(.*)$": "<rootDir>/src/model/$1",
    "^@providers(.*)$": "<rootDir>/src/providers/$1",
    "^@constants(.*)$": "<rootDir>/src/constants/$1",
  },
};
