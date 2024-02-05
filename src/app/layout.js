import { ClerkProvider, SignIn, auth, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";
import Header from "@/components/Header";
import Title from "@/components/Title";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Title />
          <SignIn />
          {profileRes.rowCount !== 0 && <Header />}

          {profileRes.rowCount !== 0 && children}

          {profileRes.rowCount === 0 && <CreateProfile />}
          {/* <Footer/> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
