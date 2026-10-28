
import Navbar from "./Components/Navbar";
import "./globals.css";



export const metadata = {
  title: "Prajwal Neupane | Full-Stack Developer & AI Engineer",
  description:
    "I'm Prajwal Neupane, a developer passionate about building modern web applications, exploring AI, and solving real-world problems through technology.",

  keywords: [
    "Prajwal Neupane",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    "AI Engineer",
    "Web Developer Nepal",
  ],

  authors: [{ name: "Prajwal Neupane" }],
  creator: "Prajwal Neupane",

  openGraph: {
    title: "Prajwal Neupane | Developer Portfolio",
    description:
      "Explore my projects, technical skills, and journey in web development and artificial intelligence.",
    url: "https://prajwalneupane.vercel.app",
    siteName: "Prajwal Neupane Portfolio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prajwal Neupane | Developer Portfolio",
    description:
      "Building modern web applications and exploring the future of AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={'h-full'}
    >
      <body>

        <Navbar />

        <main className="pt-18">
          {children}
        </main>
      </body>
    </html>
  );
}
