import SideMenuBarAdmin from "@/components/admin-component/SideMenuBarAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideMenuBarAdmin />
      <div className="w-screen h-full overflow-hidden">{children}</div>
    </div>
  );
}
