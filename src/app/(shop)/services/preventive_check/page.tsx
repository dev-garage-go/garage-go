import { redirect } from "next/navigation";

export default function PreventiveCheckPage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")

  return (
    <div>
      <h1>Hello PreventiveCheck Page</h1>
    </div>
  );
}