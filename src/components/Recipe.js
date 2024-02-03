import { sql } from "@vercel/postgres";
import AspectRatioDemo from "./AspectRatioDemo ";

export default async function Recipe({ recipeid }) {
  // console.log("id:", recipeid);
  const profileResult = await sql`SELECT profiles.username  FROM profiles
    JOIN profile_recipes ON profiles.id = profile_recipes.profile_id
    WHERE profile_recipes.id = ${recipeid}`;
  const userProfile = profileResult.rows[0];

  const recipeResult =
    await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${recipeid}`;
  const recipe = recipeResult.rows[0];
  return (
    <div className="recipe-card">
      <h2>{userProfile.username}</h2>
      <h3>{recipe.name}</h3>
      <AspectRatioDemo image={recipe.photo} />
      <h3>{recipe.content}</h3>
    </div>
  );
}
