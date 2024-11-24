import { Saira } from 'next/font/google'
import "./globals.css";

const saira = Saira({ subsets: ['latin'] })

export const metadata = {
  title: "Time Spark",
  description: "Autp Generate ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${saira.className}`}>
        {children}
      </body>
    </html>
  );
}
