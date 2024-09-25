import { prismadb } from "@/lib/prismadb";
import { ChatClient } from "./componens/client";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId, redirectToSignIn } = auth();

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: true,
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!userId) {
    return redirectToSignIn();
  }

  if (!companion) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ChatClient companion={companion} />
    </div>
  );
}
