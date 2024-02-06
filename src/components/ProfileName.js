import { sql } from "@vercel/postgres";

export default async function ProfileName({ profileid }) {
  // console.log("id:", recipeid);
  const profileResult = await sql`SELECT * FROM profiles
    WHERE profiles.id = ${profileid}`;
  const userProfile = profileResult.rows[0];

  return (
    <div>
      <p className="ProfileName">{userProfile.username}</p>
    </div>
  );
}
