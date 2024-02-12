import { sql } from "@vercel/postgres";

// import { auth } from "@clerk/nextjs";
import Link from "next/link";
// import { notFound } from "next/navigation";
import Recipe from "@/components/Recipe";
import ProfileName from "@/components/ProfileName";
// this function takes 5 seconds to do display the recipes
async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}
export default async function RecipesLists({ recipes }) {
  console.log("recipes:", recipes);
  // const { userId } = auth();

  // if (!recipes) {
  //   notFound();
  // }
  await delay();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifycontent: "center",
        }}
      >
        {recipes.map((recipe) => {
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
    </div>
  );
}
