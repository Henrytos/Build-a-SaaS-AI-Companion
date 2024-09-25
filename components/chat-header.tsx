"use client";
import { Companion, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  EllipsisVertical,
  MessageSquare,
  PenBox,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./bot-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);

      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "error",
      });
    }
  };

  return (
    <div className="flex justify-between items-center pb-4 border-b border-primary/10 ">
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-primary" />
        </Button>
        <div className="flex gap-x-2 items-center">
          <BotAvatar src={companion.src} fallback={companion.name} />
          <div className="flex flex-col gap-y-.5 justify-center">
            <div className="flex items-center gap-x-3">
              <h3 className="text-xl font-semibold">{companion.name}</h3>
              <span className="flex items-center gap-x-px text-sm font-light text-primary/60">
                <MessageSquare className="w-3 h-3" />
                {companion._count.messages}
              </span>
            </div>
            <p className="text-sm font-light text-primary/60">
              created by {companion.userName}
            </p>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/company/${companion.id}`);
            }}
          >
            <PenBox className="w-5 h-5 mr-1" />
            edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="w-5 h-5 mr-1" />
            delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
