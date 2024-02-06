import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EditRecipeButton from "../../../../components/EditRecipeButton";
// import "./addcat.css";
export default async function EditRecipe({ params }) {
  //get the recipe to delete to fill the form
  let recipeResult =
    await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${params.id}`;
  let singleRecipe = recipeResult.rows[0];
  console.log(recipeResult.rows[0]);
  async function handleEditRecipe(formData) {
    "use server";
    // get the recipe edited from our formData object
    const name = formData.get("name");
    const content = formData.get("content");
    const photo = formData.get("photo");

    // make our sql request edit the recipe into table recipes
    await sql`UPDATE profile_recipes SET name = ${name}, content = ${content}, photo = ${photo} WHERE profile_recipes.id = ${params.id}`;
    // revalidate the path so the new item shows
    revalidatePath(`/`);
    // take me to the home pagen
    redirect(`/`);
  }
  return (
    <div>
      <h2>Edit Recipe</h2>
      <form action={handleEditRecipe}>
        <div>
          <label htmlFor="recipe">Edit Name</label>
          <input
            name="name"
            id="name"
            placeholder="name"
            defaultValue={singleRecipe.name}
            required
          />
        </div>

        <div>
          <label htmlFor="recipe">Edit Recipe</label>

          <input
            name="recipe"
            id="recipee"
            placeholder="recipe"
            defaultValue={singleRecipe.content}
            required
          />
        </div>

        <div>
          <label htmlFor="recipe">Edit Photo</label>

          <input
            name="photo"
            id="photo"
            placeholder="photo"
            defaultValue={singleRecipe.photo}
            required
          />
        </div>

        <EditRecipeButton />
      </form>
    </div>
  );
}
