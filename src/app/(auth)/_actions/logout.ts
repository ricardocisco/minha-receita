"use server";

import { signOut } from "../../../../auth";

export default async function Logout() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }
}
