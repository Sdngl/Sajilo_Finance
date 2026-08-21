import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "NepalFi — Smarter money management for a digital Nepal",
  description: "A modern financial companion for Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}