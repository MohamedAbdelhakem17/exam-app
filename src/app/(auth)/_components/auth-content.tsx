import {
  FolderCode,
  BookOpenCheck,
  Brain,
  RectangleEllipsis,
} from "lucide-react";

export default function AuthContent() {
  // variables
  const FEATURES = [
    {
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
      Icon: Brain,
    },
    {
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
      Icon: BookOpenCheck,
    },
    {
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
      Icon: RectangleEllipsis,
    },
  ];

  return (
    <aside className="flex items-center justify-center px-12 relative bg-gradient-to-b from-blue-50 to-white backdrop-blur-[200px]">
      {/* Overlay */}
      <div className="absolute bg-blue-400 rounded-full opacity-30 w-96 h-96 right-4 top-28 blur-3xl" />
      <div className="absolute bottom-0 left-0 bg-blue-400 rounded-full opacity-30 w-96 h-96 blur-3xl" />

      {/* Main Content */}
      <div className="w-[28.625rem] relative">
        {/* Header */}
        <header className="flex items-center gap-2 mb-36">
          <FolderCode className="w-10 h-10 p-1 fill-blue-600 stroke-white" />
          {/* <Image src="/icons/folder-code.svg" alt="Folder Code" width={20} height={20} className="w-10 h-10 p-1" /> */}
          <span className="text-xl font-semibold text-blue-600">Exam App</span>
        </header>

        {/* Content */}
        <div>
          {/* Title */}
          <h2 className="text-3xl font-bold leading-snug text-gray-800 mb-14 font-inter">
            Empower your learning journey with our smart exam platform.
          </h2>

          {/* Features List */}
          <ul className="space-y-6">
            {FEATURES.map((item, index) => {
              const Icon = item.Icon;

              return (
                // item
                <li key={index} className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center p-1 border-2 border-blue-600  h-9 w-9">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Information */}
                  <div>
                    {/* title  */}
                    <h3 className="mb-2 text-xl font-semibold text-blue-700">
                      {item.title}
                    </h3>

                    {/* description */}
                    <p className="text-base leading-relaxed text-gray-700">
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
