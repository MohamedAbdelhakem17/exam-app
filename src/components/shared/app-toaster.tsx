import { Check } from "lucide-react";

type AppToasterProps = {
    massage: string;
};

export default function AppToaster({ massage }: AppToasterProps) {
    return (
        <div className="flex items-center gap-x-2.5 py-3 px-4 bg-gray-800  shadow">
            <Check className="text-green-600" />
            <p className="text-sm font-medium text-white">{massage}</p>
        </div>
    );
}
