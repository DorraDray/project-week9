import SaveRecipeButton from "@/components/SaveRecipeButton";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function AddRecipe() {
  const { userId } = auth();
  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  console.log("id:", profileRes.rows[0].id);
  async function handleAddRecipe(formData) {
    "use server";
    // get the comment from our formData object
    const name = formData.get("name");
    const content = formData.get("content");
    const photo = formData.get("photo");

    // make our sql request insert the recepe into table recepe
    console.log(
      `INSERT INTO profile_recipes (name, content, photo, profile_id) VALUES (${name}, ${content}, ${photo}, ${profileRes.rows[0].id})`
    );
    // await sql`INSERT INTO profile_recipes (name, content, photo, profile_id) VALUES (${name}, '${content}', ${photo}, ${profileRes.rows[0].id})`;
    await sql.query(
      `INSERT INTO profile_recipes (name, content, photo, profile_id) VALUES ($1, $2, $3, $4)`,
      [name, content, photo, profileRes.rows[0].id]
    );

    // revalidate the path so the new item shows
    revalidatePath(`/`);

    // take me to the home pagen
    redirect(`/`);
  }

  return (
    <div>
      <h2>Add Recipe</h2>
      <form action={handleAddRecipe} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" placeholder="name" required />
        </div>
        <div className="mb-4">
          <label htmlFor="name">Recipe Content</label>
          <input
            type="longtext"
            name="content"
            id="content"
            placeholder="content"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">Add Photo</label>
          <input name="photo" id="photo" placeholder="photo" required />
        </div>
        <SaveRecipeButton />
      </form>
    </div>
  );
}
