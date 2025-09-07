import { AppBreadcrumb, PageHeader } from "@/components/shared";
import { UserRound } from "lucide-react";
import AccountSidebar from "./_components/account-sidebar";

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0">
        {/* Breadcrumb */}
        <AppBreadcrumb paths={[{ name: "Account" }]} />

        {/* Header */}
        <PageHeader Icon={UserRound} title="Account Settings" back={true} />
      </div>
      {/* Main content */}
      <section className="px-6 flex gap-x-6 flex-1 relative">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Content */}
        <div className="flex-1 h-[3000px]">{children}</div>
      </section>
    </main>
  );
}
