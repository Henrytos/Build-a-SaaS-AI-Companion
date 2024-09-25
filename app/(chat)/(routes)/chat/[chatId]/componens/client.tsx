import { ChatHeader } from "@/components/chat-header";
import { Companion, Message } from "@prisma/client";

interface ChatClientProsps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ companion }: ChatClientProsps) => {
  return (
    <>
      <main>
        <ChatHeader companion={companion} />
      </main>
    </>
  );
};
