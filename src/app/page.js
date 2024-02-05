import { sql } from "@vercel/postgres";
// import { auth } from "@clerk/nextjs";
import Link from "next/link";
// import { notFound } from "next/navigation";
import Recipe from "@/components/Recipe";
import ProfileName from "@/components/ProfileName";
export default async function Home() {
  // const { userId } = auth();
  const recipes = await sql`SELECT * FROM profile_recipes `;

  // if (!recipes) {
  //   notFound();
  // }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifycontent: "center",
      }}
    >
      {recipes.rows.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link href={`/profiles/${recipe.profile_id}`}>
              <ProfileName profileid={recipe.profile_id} />
            </Link>
            <Link href={`/recipes/${recipe.id}`}>
              <Recipe recipeid={recipe.id} content={false} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
