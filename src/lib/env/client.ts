const CLIENT_ENV_VARS = ["NEXT_PUBLIC_SITE_URL"] as const;

type ClientEnvKey = (typeof CLIENT_ENV_VARS)[number];

const missing = CLIENT_ENV_VARS.filter(
  (key: ClientEnvKey) => !process.env[key],
);

if (missing.length) {
  throw new Error(`Missing client env variables:\n${missing.join("\n")}`);
}

const CLIENT_ENV = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
} as const;

export default CLIENT_ENV;
