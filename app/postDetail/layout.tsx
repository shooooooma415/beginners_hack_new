import Header from "@/components/Header-notmap";
import SwipeableTemporaryDrawer from "@/components/negaburger";
import "../globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SwipeableTemporaryDrawer />
      <main className="flex flex-col items-center"> {/* ここに main を追加 */}
        {children}
      </main>
      <Header />
    </div>
  );
}
