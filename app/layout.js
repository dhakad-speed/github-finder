import Navbar from "../component/Navbar";

import "./globals.css";

export const metadata = {
  title: "Home - Github Finder",
  description:
    "A modern React app to search and discover GitHub profiles. Built with Next.js and Material-UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-[#2a303c]">
        <Navbar />
        <div className="container mx-auto max-w-screen-xl min-h-[60vh] pt-15 flex justify-center text-center px-0 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
