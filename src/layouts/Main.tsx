import Head from "next/head";
import { useRouter } from "next/router";

import Header from "@/components/header";
import { LayoutType } from "@/types";

const MainLayout = ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default MainLayout;
