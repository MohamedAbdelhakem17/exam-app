import { REGISTER_STEEP } from "@/lib/constants/auth.constant";

type RegisterResponse = {
  token: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    _id: string;
    createdAt: "string";
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
