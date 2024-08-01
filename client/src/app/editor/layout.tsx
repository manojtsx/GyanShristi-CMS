import SideMenuBarEditor from "@/components/SideMenuBarEditor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideMenuBarEditor />
      {children}
    </div>
  );
}
