import { prismadb } from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { Separator } from "@/components/ui/separator";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();
  return (
    <main className="w-full h-full px-5 md:px-10">
      <div className="w-full flex flex-col gap-8 items-center ">
        <div className="w-full max-w-5xl">
          <h3 className={cn("font-bold text-xl mb-2", poppins.className)}>
            Create Compainion
          </h3>
          <Separator className="bg-foreground  mb-4" />
          <p className={cn("font-light", poppins.style)}>
            Fill the form below to create a new companion. All fields are
            required.
          </p>
        </div>
        <CompanionForm initialData={companion} categories={categories} />
      </div>
    </main>
  );
};

export default CompanionIdPage;
