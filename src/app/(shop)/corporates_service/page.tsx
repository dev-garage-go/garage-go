import { redirect } from "next/navigation";

export default function CorporateServicePage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")

  return (
    <div>
      <h1>Hello CorporateService Page</h1>
    </div>
  );
}