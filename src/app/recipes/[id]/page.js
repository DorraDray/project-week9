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
        <h3 className="recipeInfoname">{recipe.name}</h3>
        <img src={recipe.photo} className="recipe-image" />
      </div>
      <div>
        <p className="recipeInfoptag">{recipe.content}</p>
        <div className="actions">
          {profileUserId.id === recipeResult.profile_id && (
            <>
              <Link href={`/recipes/${params.id}/editrecipe`}>Edit</Link>
              <Link href={`/recipes/${params.id}/deleterecipe`}>Delete</Link>
            </>
          )}
          <Link href={`/recipes/${params.id}/addComment`}>Comment</Link>
        </div>
      </div>
      <div className="comments-container">
        {commentsResult.rows.map((comment) => (
          <div key={comment.id + comment.content} className="comment">
            <ProfileName
              profileid={comment.profile_id}
              className="commentprofile"
            />
            <p>{comment.content}</p>
            {profileUserId.id === commentsResult.profile_id && (
              <div className="actionComment">
                <Link
                  href={`/recipes/${params.id}/comments/${comment.id}/edit`}
                >
                  Edit
                </Link>
                <Link
                  href={`/recipes/${params.id}/comments/${comment.id}/delete`}
                >
                  Delete
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
