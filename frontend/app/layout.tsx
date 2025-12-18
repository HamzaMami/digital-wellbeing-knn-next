import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Well-Being Assessment",
  description: "AI-powered digital well-being assessment using machine learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link href="/" className="navbar-logo">
              Digital Well-Being
            </Link>
            <div className="navbar-links">
              <Link href="/" className="navbar-link">Home</Link>
              <Link href="/assessment" className="navbar-link">Assessment</Link>
              <Link href="/history" className="navbar-link">History</Link>
              <Link href="/about" className="navbar-link">About</Link>
            </div>
          </div>
        </nav>
        
        {children}
        
        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">
              © 2025 Digital Well-Being Assessment | Educational ML Project
            </p>
            <p className="footer-subtext">
              Built with Next.js, FastAPI, and scikit-learn
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
