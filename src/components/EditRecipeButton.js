"use client";
import { useFormStatus } from "react-dom";

export default function DeleteRecipeButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Editing your Recipe" : "Confirm Edit Recipe"}
    </button>
  );
}
