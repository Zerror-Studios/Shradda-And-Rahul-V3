import "../styles/globals.css";
import "../styles/fonts.css";
import SiteLayout from "@/components/common/SiteLayout";
import { createRootMetadata } from "@/lib/seo";
import TopMenu from "@/components/common/TopMenu";
import { ViewTransitions } from "next-view-transitions";

export const experimental = {
  viewTransition: true,
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
    <html lang="en">
      <body suppressHydrationWarning>
        <TopMenu/>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
    </ViewTransitions>
  );
}

export const metadata = createRootMetadata();
