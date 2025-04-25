import { redirect } from "next/navigation";

export default function TireChangePage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")

  return (
    <div>
      <h1>Hello TireChange Page</h1>
    </div>
  );
}