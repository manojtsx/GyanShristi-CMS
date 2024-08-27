import SideMenuBarEditor from "@/components/editor-component/SideMenuBarEditor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideMenuBarEditor />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
