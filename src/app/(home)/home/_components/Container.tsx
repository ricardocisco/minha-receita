"use server";
import { auth } from "../../../../../auth";
import Form from "./Form";

export default async function Container() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div className="lg:w-[1040px] w-full mx-auto pt-20">
      <Form userId={userId} />
    </div>
  );
}
