import PageWrapper from "@/app/(dashboard)/_components/_layout/page-wrapper";
import { UserRound } from "lucide-react";
import AccountSidebar from "./_components/account-sidebar";

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper
      paths={[{ name: "Account" }]}
      headerOptions={{ Icon: UserRound, title: "Account Settings", back: true }}
    >
      <div className="flex flex-col md:flex-row items-start  justify-center md:min-h-full w-full gap-4">
        {/* sidebar */}
        <AccountSidebar />

        {/* Content */}
        <section className="flex-1 bg-white w-full">{children}</section>
      </div>
    </PageWrapper>
  );
}
