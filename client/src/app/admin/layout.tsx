import SideMenuBarAdmin from "@/components/admin-component/SideMenuBarAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative">
      <SideMenuBarAdmin />
<<<<<<< HEAD
      <div className="flex-1 overflow-y-auto">{children}</div>
=======
      <div className="w-screen h-full overflow-hidden">{children}</div>
>>>>>>> 4ea3429be3503a8d902fa21cb18badb4875f5ae7
    </div>
  );
}
