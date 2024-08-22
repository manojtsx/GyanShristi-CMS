import SideMenuBarAdmin from "@/components/SideMenuBarAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideMenuBarAdmin />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
