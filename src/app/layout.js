import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Weather App",
  description: "Beautiful app to display weather",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="items-center justify-center bg-gray-100 dark:bg-gray-900 text-white" >
        <div className="grid h-screen w-full place-items-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">

          {children}

        </div>
      </body>
    </html>
  );
}
