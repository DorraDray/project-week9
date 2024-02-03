import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EditProfileButton from "../../components/EditProfileButton";

export default async function EditProfile() {
  const { userId } = auth();
  let profileResult =
    await sql`SELECT * FROM profiles WHERE profiles.clerk_user_id = ${userId}`;
  let singleProfile = profileResult.rows[0];

  async function handleEditProfile(formData) {
    "use server";
    // get the profile edited from our formData object
    const username = formData.get("username");
    const bio = formData.get("bio");
    const photo = formData.get("photoURL");
    const email = formData.get("email");

    // make our sql request edit the profile into table profiles
    await sql`UPDATE profiles SET username = ${username}, bio = ${bio}, photo = ${photo}, email = ${email} WHERE profiles.clerk_user_id = ${userId}`;
    // revalidate the path so the new item shows
    revalidatePath(`/`);
    // take me to the home pagen
    redirect(`/`);
  }
  return (
    <div>
      <h2>Edit Profile</h2>
      <form action={handleEditProfile}>
        <div>
          <label htmlFor="profile">Edit User Name</label>
          <input
            name="username"
            id="username"
            placeholder="username"
            defaultValue={singleProfile.username}
            required
          />
        </div>

        <div>
          <label htmlFor="recipe">Edit Bio</label>

          <input
            name="bio"
            id="bio"
            placeholder="bio"
            defaultValue={singleProfile.bio}
            required
          />
        </div>

        <div>
          <label htmlFor="recipe">Edit Photo</label>

          <input
            name="photoURL"
            id="photoURL"
            placeholder="photoURL"
            defaultValue={singleProfile.photo}
            required
          />
        </div>
        <div>
          <label htmlFor="recipe">Edit Email</label>

          <input
            name="email"
            id="email"
            placeholder="email"
            defaultValue={singleProfile.email}
            required
          />
        </div>
        <EditProfileButton />
      </form>
    </div>
  );
}
