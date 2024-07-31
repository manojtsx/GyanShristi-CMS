import SideMenuBarAuthor from "@/components/SideMenuBarAuthor";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex gap-1">
    <SideMenuBarAuthor/>
    <div className="w-screen">
    {children}
    </div>
   </div>
  );
}
