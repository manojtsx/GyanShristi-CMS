import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/mini-component/Copyright";
import About from "@/app/(unregistered)/about/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
          <Navbar />
          {children}
          {/* <LineChart /> */}
          <Footer/>
          <Copyright />
        </body>
    </html>
  );
}
