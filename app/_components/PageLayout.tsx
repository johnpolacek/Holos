import type { ReactNode } from "react";
import ChatLauncher from "./ChatLauncher";
import Footer from "./Footer";
import Header from "./Header";
import PageTransition from "./PageTransition";
import Sidebar from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="xl:grid grid-cols-[1fr_5fr] justify-stretch w-full max-w-[1280px] overflow-hidden mx-auto h-screen relative">
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      <Sidebar />
      <ChatLauncher />
      <div className="grow h-full overflow-auto">
        <Header />
        <PageTransition>
          <main className="pt-12 pb-24 px-4 xl:px-0">{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </div>
  );
}
