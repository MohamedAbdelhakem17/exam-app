import FEATURES from "@/lib/constants/auth-sidebar-content.constant";
import { FolderCode } from "lucide-react";

export default function AuthContent() {
  return (
    <aside className="hidden lg:flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative bg-gradient-to-b from-blue-50 to-white backdrop-blur-[200px]">
      {/* Overlay */}
      <div className="absolute bg-blue-400 rounded-full opacity-30 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 right-4 top-20 md:top-28 blur-3xl" />
      <div className="absolute bottom-0 left-0 bg-blue-400 rounded-full opacity-30 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 blur-3xl" />

      {/* Main Content */}
      <div className="w-full max-w-md lg:max-w-[28.625rem] relative">
        {/* Header */}
        <header className="flex items-center gap-2 mb-16 md:mb-24">
          {/* Icon */}
          <FolderCode className="w-8 h-8 md:w-10 md:h-10 p-1 fill-blue-600 stroke-white" />

          {/* Label */}
          <span className="text-lg md:text-xl font-semibold text-blue-600">
            Exam App
          </span>
        </header>

        {/* Content */}
        <div>
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-gray-800 mb-8 md:mb-10 lg:mb-14 font-inter">
            Empower your learning journey with our smart exam platform.
          </h2>

          {/* Features List */}
          <ul className="space-y-4 md:space-y-6">
            {FEATURES.map((item, index) => {
              const Icon = item.Icon;

              return (
                // item
                <li key={index} className="flex items-start gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center p-1 border-2 border-blue-600 h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>

                  {/* Information */}
                  <div>
                    {/* title  */}
                    <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-semibold text-blue-700">
                      {item.title}
                    </h3>

                    {/* description */}
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
