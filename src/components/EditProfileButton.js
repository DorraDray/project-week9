"use client";
import { useFormStatus } from "react-dom";

export default function EditProfileButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Editing your Profile" : "Edit Profile"}
    </button>
  );
}
