import { redirect } from "next/navigation";

export default function BatteryChangePage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")
  
  return (
    <div>
      <h1>Hello BatteryChange Page</h1>
    </div>
  );
}