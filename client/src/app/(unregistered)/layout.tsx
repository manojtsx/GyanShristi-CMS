import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/mini-component/Copyright";
import About from "@/components/AboutPage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
          <Navbar />
          <About />
          {children}
          {/* <LineChart /> */}
          <Footer/>
          <Copyright />
        </body>
    </html>
  );
}
