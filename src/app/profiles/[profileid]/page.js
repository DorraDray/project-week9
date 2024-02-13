import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import EditProfileButton from "../../components/EditProfileButton";

export default async function ProfilePage({ params }) {
  console.log("profileid:", params.profileid);
  const { userId } = auth();
  let profileResult =
    await sql`SELECT * FROM profiles WHERE profiles.id = ${params.profileid}`;
  let singleProfile = profileResult.rows[0];
  let profileUserId =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  let singleProfileUserId = profileUserId.rows[0];
  const followedRes =
    await sql`SELECT * FROM profile_followers WHERE Profile_id = ${params.profileid} AND Follower_id = ${singleProfileUserId.id}`;

  const followed = followedRes.rows.length > 0;

  async function handleFollowProfile() {
    "use server";
    const followedRes =
      await sql`SELECT * FROM profile_followers WHERE Profile_id = ${params.profileid} AND Follower_id = ${singleProfileUserId.id}`;
    const followed = followedRes.rows.length > 0;
    console.log("followed:", followed);

    followed
      ? await sql`DELETE FROM profile_followers WHERE Profile_id = ${params.profileid} AND Follower_id = ${singleProfileUserId.id}`
      : await sql`INSERT INTO profile_followers (Profile_id, Follower_id) VALUES (${params.profileid}, ${singleProfileUserId.id})`;
    revalidatePath(`/this/path`);
  }

  return (
    <div className="profileContainer">
      <div className="leftPanel">
        <h2>{singleProfile.username}</h2>
        <img src={singleProfile.photo} className="profileImage" />
      </div>
      <div className="rightPanel">
        <form action={handleFollowProfile}>
          <button className="followButton">
            {followed ? "Unfollow" : "Follow"}
          </button>
        </form>
        <p className="bio"> Bio: {singleProfile.bio}</p>
      </div>
    </div>
  );
}
