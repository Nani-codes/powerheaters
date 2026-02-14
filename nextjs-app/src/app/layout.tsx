import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUDO - Global Hot Runner System Leader",
  description: "YUDO is a global leader in hot runner systems, serving mobility, home, industrial, and everyday product sectors worldwide.",
  icons: {
    icon: "/static/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
