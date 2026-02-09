import "server-only";

const SERVER_ENV_VARS = [
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "BASE_API_URL",
] as const;

type ServerEnvKey = (typeof SERVER_ENV_VARS)[number];

const missing = SERVER_ENV_VARS.filter(
  (key: ServerEnvKey) => !process.env[key],
);

if (missing.length) {
  throw new Error(`Missing server env variables:\n${missing.join("\n")}`);
}

const SERVER_ENV = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  BASE_API_URL: process.env.BASE_API_URL!,
} as const;

export default SERVER_ENV;
