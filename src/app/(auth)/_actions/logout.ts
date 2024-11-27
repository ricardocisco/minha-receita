"use server";

import { signOut } from "../../../../auth";

export default async function Logout() {
  try {
    await signOut({
      redirectTo: "/login",
    });
  } catch (error) {
    throw error;
  }
}
