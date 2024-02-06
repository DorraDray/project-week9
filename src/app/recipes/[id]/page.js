import { sql } from "@vercel/postgres";
import Link from "next/link";
import Recipe from "@/components/Recipe";
import ProfileName from "@/components/ProfileName";
// import { notFound } from "next/navigation";
export default async function SingleRecipePage({ params }) {
  console.log("Recipe ID:", params.id);

  const commentsResult = await sql`SELECT * FROM profile_recipe_comments
    WHERE profile_recipe_comments.profile_recipe_id = ${params.id} ORDER BY profile_recipe_comments.created_on`;

  //   if (!singleRecipe) {
  //     notFound();
  //   }
  return (
    <div>
      <Recipe recipeid={params.id} content={true} />

      <div>
        <Link href={`/recipes/${params.id}/addComment`}>Comment</Link>
        <Link href={`/recipes/${params.id}/editrecipe`}>Edit</Link>
        <Link href={`/recipes/${params.id}/deleteRecipe`}>Delete</Link>
      </div>
      {commentsResult.rows.map((comment) => (
        <div key={comment.id + comment.content}>
          <ProfileName profileid={comment.profile_id} />
          <p>{comment.content}</p>
          <Link href={`/recipes/${params.id}/${comment.id}`}>Edit</Link>
          {console.log(comment)}
        </div>
      ))}
    </div>
  );
}
