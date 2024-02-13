import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeleteRecipeButton from "../../../../components/DeleteRecipeButton";

export default async function DeleteRecipe({ params }) {
  let recipeResult =
    await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${params.id}`;
  let singleRecipe = recipeResult.rows[0];

  async function handleDeleteRecipe() {
    "use server";
    //delete the comments for this recepe
    await sql`DELETE FROM profile_recipe_comments WHERE profile_recipe_comments.profile_recipe_id = ${params.id}`;

    // make our sql request delete the recipe into table recipes
    await sql`DELETE FROM profile_recipes WHERE profile_recipes.id = ${params.id}`;
    // revalidate the path so the new item shows
    revalidatePath(`/`);
    // take me to the home pagen
    redirect(`/`);
  }
  return (
    <div className="deleterecipecontainer">
      <h2 className="confirmationMessage">
        Are you sure you want to delete {singleRecipe.name} Recipe
      </h2>
      <form action={handleDeleteRecipe}>
        <div>
          <button className="deleteButton">
            <DeleteRecipeButton />
          </button>
        </div>
      </form>
    </div>
  );
}
