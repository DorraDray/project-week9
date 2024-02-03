import SaveCommentButton from "@/components/SaveCommentButton";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import "./addcat.css";

export default function AddComment({ params }) {
  async function handleAddComment(formData) {
    "use server";
    const { userId } = auth();
    const profileRes =
      await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
    const profileRecepeid =
      await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${params.id}`;
    // get the comment from our formData object
    const content = formData.get("content");

    // make our sql request insert the comment into table comment and returning id

    await sql`INSERT INTO profile_recipe_comments (content, profile_recipe_id, profile_id) VALUES (${content}, ${params.id}, ${profileRecepeid.rows[0].profile_id})`;

    // revalidate the path so the new item shows
    revalidatePath(`/recipes/${params.id}`);

    // take me to the home pagen
    redirect(`/recipes/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Add Comment</h2>
      <form action={handleAddComment} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add Comment
          </label>
          <input
            name="content"
            id="content"
            placeholder="content"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <SaveCommentButton />
      </form>
    </div>
  );
}
