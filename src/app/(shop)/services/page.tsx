import { redirect } from "next/navigation";

export default function ServicesPage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")

  return (
    <div>
      <h1>Hello Services Page</h1>
    </div>
  );
}