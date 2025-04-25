import { FooterJoined, Header } from "@/components";

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Header />
      {children}
      <FooterJoined />
    </div>
  );
}