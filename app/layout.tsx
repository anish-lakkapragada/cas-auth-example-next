

import type { Metadata } from "next";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { Providers } from "./providers/providers";


export const metadata: Metadata = {
  title: "Yale CAS SWE Next.js 2025 Example",
  description: "Yale CAS Example App for Software Engineering class made with Next.js 2025. Developed by Anish Lakkapragada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
        > 
           <Providers> 
              <MantineProvider> {children} </MantineProvider>
          </Providers> 
        </body>
      </html>
  );
}
