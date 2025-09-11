import { FolderCode } from "lucide-react";
import Image from "next/image";
import logo from "./logo.svg";

export default function SideBarHeader() {
  return (
    <header>
      {/* Image */}
      <Image
        src={logo}
        alt="Elevate"
        width={190}
        height={35}
        className="w-48 h-9"
      />

      {/* Logo  */}
      <div className="flex items-center gap-2.5 mt-3">
        <FolderCode className="w-10 h-10 p-1 fill-blue-600 stroke-white" />
        {/* <Image src="/icons/folder-code.svg" alt="Folder Code" width={20} height={20} className="w-10 h-10 p-1" /> */}
        <span className="text-xl font-semibold text-blue-600">Exam App</span>
      </div>
    </header>
  );
}
