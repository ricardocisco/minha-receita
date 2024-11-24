import { signOut } from "../../../../auth";

export default async function Logout() {
  try {
    await signOut({ redirect: true });
  } catch (error) {
    console.log(error);
  }
}
