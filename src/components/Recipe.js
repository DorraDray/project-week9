import { sql } from "@vercel/postgres";
import AspectRatioDemo from "./AspectRatioDemo ";
import AspectRatioDemoContent from "./AspectRatioDemoContent";
import Link from "next/link";

export default async function Recipe({ recipeid, content }) {
  console.log("CONTENT:", content);

  const recipeResult =
    await sql`SELECT * FROM profile_recipes WHERE profile_recipes.id = ${recipeid}`;
  const recipe = recipeResult.rows[0];
  const shouldDisplayContent = !!content;
  const containerStyles = {
    display: "flex",
    flexDirection: shouldDisplayContent ? "row" : "column",
    alignItems: shouldDisplayContent ? "center" : "flex-start",
    margin: "10px",
  };

  const imageStyles = {
    flex: "0 0 30%", // Adjust the width as needed
  };

  return (
    <div style={containerStyles}>
      <div style={imageStyles}>
        {shouldDisplayContent ? (
          <AspectRatioDemo image={recipe.photo} />
        ) : (
          <div>
            <AspectRatioDemoContent image={recipe.photo} />
            <p>HELLO</p>
          </div>
        )}
      </div>
      <div>
        <h3>{recipe.name}</h3>
        {shouldDisplayContent && <p>{recipe.content}</p>}
      </div>
    </div>
  );
}
