import Header from "@/components/Header";
import SwipeableTemporaryDrawer from "@/components/TopDrawer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background text-foreground min-h-screen w-screen">
        <div className="flex flex-col">
        <div style={{ width: '60px', height: '60px', marginBottom: '-60px' }}>
            <SwipeableTemporaryDrawer />
          </div>
          <div>
            <main className="flex flex-col items-center">
              {children}
            </main>
          </div>
          <div><Header/></div>
        </div>
      
        
      </body>
    </html>
  );
}