import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EditCommentButton from "@/components/EditRecipeButton";

export default async function EditComment({ params }) {
  //get the recipe to delete to fill the form
  let commentResult =
    await sql`SELECT * FROM profile_recipe_comments WHERE profile_recipe_comments.id = ${params.commentId}`;
  let singleComment = commentResult.rows[0];

  async function handleEditComment(formData) {
    "use server";
    // get the recipe edited from our formData object
    const content = formData.get("content");

    // make our sql request edit the recipe into table recipes
    await sql`UPDATE profile_recipe_comments SET content = ${content} WHERE profile_recipe_comments.id = ${params.commentId}`;
    // revalidate the path so the new item shows
    revalidatePath(`/recipes/${params.id}`);
    // take me to the home pagen
    redirect(`/recipes/${params.id}`);
  }
  return (
    <div>
      <h2>Edit Recipe</h2>
      <form action={handleEditComment}>
        <div>
          <label htmlFor="recipe">Edit Comment</label>
          <input
            name="content"
            id="content"
            placeholder="content"
            defaultValue={singleComment.content}
            required
          />
        </div>

        <EditCommentButton />
      </form>
    </div>
  );
}
