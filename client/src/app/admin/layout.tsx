import SideMenuBarAdmin from "@/components/admin-component/SideMenuBarAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative">
      <SideMenuBarAdmin />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
