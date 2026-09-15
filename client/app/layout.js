import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "3D Portfolio",
  description: "Full-Stack 3D Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <header className="border-b border-zinc-800 p-4">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-lg hover:text-cyan-400">
              Portfolio.3D
            </Link>
            <ul className="flex gap-6 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400">About</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400">Projects</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="max-w-6xl mx-auto flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
