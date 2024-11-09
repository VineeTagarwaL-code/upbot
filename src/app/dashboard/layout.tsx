import { SectionWrapper } from "@/components/Section-wrapper";
import RootLayout from "../layout";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SectionWrapper>
      {children}
      <Toaster />
    </SectionWrapper>
  );
}
