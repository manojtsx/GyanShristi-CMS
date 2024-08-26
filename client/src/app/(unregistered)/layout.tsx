import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/mini-component/Copyright";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div>
          <Navbar />
          {children}
          {/* <LineChart /> */}
          <Footer/>
          <Copyright />
       </div>
  );
}
