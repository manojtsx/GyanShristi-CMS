import SideMenuBarAuthor from "@/components/SideMenuBarAuthor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideMenuBarAuthor />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
