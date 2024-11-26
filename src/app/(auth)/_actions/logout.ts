"use server";

import { redirect } from "next/navigation";
import { signOut } from "../../../../auth";

export default async function Logout() {
  try {
    await signOut();
    redirect("/");
  } catch (error) {
    console.log(error);
  }
}
