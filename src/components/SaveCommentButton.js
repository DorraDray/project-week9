"use client";
import { useFormStatus } from "react-dom";

export default function SaveCommentButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your comment" : "Save Comment"}
    </button>
  );
}
