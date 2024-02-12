import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import ProfileName from "@/components/ProfileName";

export default async function SingleRecipePage({ params }) {
  console.log("Recipe ID:", params.id);
  const { userId } = auth();
  let profileUserId =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  const commentsResult = await sql`SELECT * FROM profile_recipe_comments
    WHERE profile_recipe_comments.profile_recipe_id = ${params.id} ORDER BY profile_recipe_comments.created_on`;
  const recipeResult =
    await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${params.id}`;
  const recipe = recipeResult.rows[0];
  console.log("recipe:", recipe);

  return (
    <div className="container">
      <div className="recipeInfo">
        <h3>{recipe.name}</h3>
        <img src={recipe.photo} className="recipe-image" />
      </div>
      <div>
        <p>{recipe.content}</p>
        <div className="actions">
          {profileUserId.id === recipeResult.profile_id && (
            <>
              <Link href={`/recipes/${params.id}/editrecipe`}>Edit</Link>
              <Link href={`/recipes/${params.id}/deleteRecipe`}>Delete</Link>
            </>
          )}
          <Link href={`/recipes/${params.id}/addComment`}>Comment</Link>
        </div>
      </div>

      {commentsResult.rows.map((comment) => (
        <div key={comment.id + comment.content} className="comment">
          <ProfileName profileid={comment.profile_id} />
          <p>{comment.content}</p>
          {profileUserId.id === commentsResult.profile_id && (
            <Link href={`/recipes/${params.id}/${comment.id}`}>Edit</Link>
          )}
        </div>
      ))}
    </div>
  );
}
