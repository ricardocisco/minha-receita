"use server";

import { signOut } from "../../../../auth";

export default async function Logout() {
  await signOut({
    redirect: true,
    redirectTo: "/login"
  });
}
