"use client";
import { useFormStatus } from "react-dom";

export default function DeleteCommentButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Deleting your Comment" : "Confirm Delete Comment"}
    </button>
  );
}
