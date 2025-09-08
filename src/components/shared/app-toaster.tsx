import { Check } from "lucide-react";

type AppToasterProps = {
  message: string;
};

export default function AppToaster({ message }: AppToasterProps) {
  return (
    <div className="flex items-center gap-x-2.5 py-3 px-4 bg-gray-800  shadow">
      <Check className="text-green-600" />
      <p className="text-sm font-medium text-white">{message}</p>
    </div>
  );
}
