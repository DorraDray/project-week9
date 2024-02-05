import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import AvatarProfile from "./AvatarProfile";
import { UserButton } from "@clerk/nextjs";
export default async function Header() {
  const { userId } = auth();
  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  const profilefollowers = await sql`SELECT * FROM profile_followers  WHERE 	
    Profile_id = ${profileRes.id}`;
  const profilefollowing = await sql`SELECT * FROM profile_followers  WHERE 	
    Follower_id = ${profileRes.id}`;
  return (
    <header>
      <nav>
        <Link href="/">
          <AvatarProfile image={profileRes.rows[0].photo} />
        </Link>
        <Link href="/">Home</Link>
        <Link href="/addrecipe">Add Recipes</Link>
        <Link href="/updateprofile">Update your profile</Link>
        <Link href="/followers">{profilefollowers.rows.length}Followers</Link>
        <Link href="/following">{profilefollowing.rows.length}Following</Link>
        <Link href="/updateprofile">Contact</Link>
        <Link href="/about">
          <UserButton afterSignOutUrl="/" />
        </Link>
      </nav>
    </header>
  );
}
