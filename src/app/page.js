import { sql } from "@vercel/postgres";
// import { auth } from "@clerk/nextjs";
import Link from "next/link";
// import { notFound } from "next/navigation";
import Recipe from "@/components/Recipe";
export default async function Home() {
  // const { userId } = auth();
  const recipes = await sql`SELECT * FROM profile_recipes `;

  // if (!recipes) {
  //   notFound();
  // }
  return (
    <div>
      <h2>All Recipes</h2>

      {recipes.rows.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>
              <Recipe recipeid={recipe.id} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
