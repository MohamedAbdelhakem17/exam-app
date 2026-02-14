import { REGISTER_STEEP } from "@/lib/constants/auth.constant";

type RegisterResponse = {
  payload: {
    token: string;
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: string;
      emailVerified: boolean;
      phoneVerified: boolean;
    };
  };
};

type ForgotPasswordResponse = {
  info: string;
};

type CreatePasswordResponse = { token: string };

type RegisterStepsType = (typeof REGISTER_STEEP)[keyof typeof REGISTER_STEEP];

export {
  CreatePasswordResponse,
  ForgotPasswordResponse,
  RegisterResponse,
  RegisterStepsType,
};
