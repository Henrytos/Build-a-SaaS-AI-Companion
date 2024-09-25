import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-4xl min-h-full p-4">{children}</div>
  );
}
