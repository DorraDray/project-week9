import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import AvatarProfile from "./AvatarProfile";
import { UserButton } from "@clerk/nextjs";
export default async function Header() {
  const { userId } = auth();
  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;

  return (
    <header className="bg-indigo-700 p-4 text-center">
      <h1 className="text-white text-4xl font-semibold mb-4">The Bakers</h1>
      <nav>
        <Link className="text-white mx-4 hover:text-gray-300" href="/">
          <AvatarProfile image={profileRes.rows[0].photo} />
        </Link>
        <Link className="text-white mx-4 hover:text-gray-300" href="/about">
          <UserButton afterSignOutUrl="/" />
        </Link>
        <Link className="text-white mx-4 hover:text-gray-300" href="/addrecipe">
          Add Recipes
        </Link>
        <Link
          className="text-white mx-4 hover:text-gray-300"
          href="/updateprofile"
        >
          Update your profile
        </Link>
        <Link
          className="text-white mx-4 hover:text-gray-300"
          href="/updateprofile"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
