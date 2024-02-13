import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeleteCommentButton from "@/components/DeleteRecipeButton";

export default async function DeleteRecipe({ params }) {
  let commentResult =
    await sql`SELECT * FROM profile_recipe_comments WHERE profile_recipe_comments.id = ${params.commentId}`;
  let singleComment = commentResult.rows[0];

  async function handleDeleteComment() {
    "use server";
    //delete the comments for this recepe
    await sql`DELETE FROM profile_recipe_comments WHERE profile_recipe_comments.id = ${params.commentId}`;

    revalidatePath(`/recipes/${params.id}`);

    redirect(`/recipes/${params.id}`);
  }
  return (
    <div className="deleterecipecontainer">
      <h2 className="confirmationMessage">
        Are you sure you want to delete your comment
      </h2>
      <form action={handleDeleteComment}>
        <div>
          <button className="deleteButton">
            <DeleteCommentButton />
          </button>
        </div>
      </form>
    </div>
  );
}
