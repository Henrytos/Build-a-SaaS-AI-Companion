import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface BotAvatarProps {
  src: string;
  fallback: string;
}

export const BotAvatar = ({ src, fallback }: BotAvatarProps) => {
  return (
    <Avatar className="mt-2">
      <AvatarImage src={src} className=" object-cover" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
