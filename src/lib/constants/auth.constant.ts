const FORGOT_PASSWORD_STEEP = {
  EMAIL: "email",
  OTP: "otp",
  CREATE_PASSWORD: "create-password",
} as const;

const REGISTER_STEEP = {
  VERIFY_EMAIL: "verify-email",
  CONFIRM_EMAIL: "confirm-email",
  REGISTER: "register",
} as const;

export { FORGOT_PASSWORD_STEEP, REGISTER_STEEP };
