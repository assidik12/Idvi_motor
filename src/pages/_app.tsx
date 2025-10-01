import "../styles/globals.css";
import NavbarView from "@/components/fragments/Navbar";
import Toaster from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const disableNavbar = ["auth", "admin", "member"];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);
  return (
    <SessionProvider session={session}>
      {!disableNavbar.includes(pathname.split("/")[1]) && <NavbarView />}
      <Component {...pageProps} setToaster={setToaster} />
      {Object.keys(toaster).length > 0 && <Toaster message={toaster.message} varian={toaster.varian} setToaster={setToaster} />}
    </SessionProvider>
  );
}
