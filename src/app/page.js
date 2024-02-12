import { sql } from "@vercel/postgres";
import { Suspense } from "react";
import RecipesLists from "@/components/RecipesLists";
import ProgressDemo from "@/components/ProgressDemo";
export default async function Home() {
  // const { userId } = auth();
  const recipesres =
    await sql`SELECT * FROM profile_recipes ORDER BY created_on`;
  const recipes = recipesres.rows;
  // if (!recipes) {
  //   notFound();
  // }
  return (
    <div>
      <Suspense fallback={<ProgressDemo />}>
        <RecipesLists recipes={recipes} />
      </Suspense>
    </div>
  );
}
