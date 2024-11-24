"use server";
import { auth } from "../../../../auth";
import Form from "./Form";
import ListItems from "./ListItems";

export default async function Container() {
  const session = await auth();

  const userId = session?.user?.id;

  return (
    <div className="lg:w-[1040px] w-full mx-auto">
      <Form userId={userId} />
      <ListItems />
    </div>
  );
}
