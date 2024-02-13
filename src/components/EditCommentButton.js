"use client";
import { useFormStatus } from "react-dom";

export default function EditCommentButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Editing your Comment" : "Confirm Edit Comment"}
    </button>
  );
}
