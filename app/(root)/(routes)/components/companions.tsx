import { Card, CardFooter } from "@/components/ui/card";
import { Companion } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanionsProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionsProps) => {
  if (data.length == 0) {
    return (
      <div className=" flex justify-center">
        <div className="w-64 h-64">
          <Image
            fill
            alt="No companions found"
            className="object-cover"
            src="/images/not-found-companion.png"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
      {data.map((item) => (
        <Card
          key={item.id}
          className="w-full min-h-64 h-auto p-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <Link href={`/chat/${item.id}`}>
            <div className="flex flex-col gap-2  items-center ">
              <div className=" w-full max-w-56  h-52">
                <Image
                  alt={`photo ${item.name}`}
                  className="object-cover w-full h-full rounded-xl"
                  width={208}
                  height={208}
                  src={item.src}
                />
              </div>
              <div>
                <p>{item.name}</p>
              </div>
              <CardFooter className="flex w-full  justify-between items-center pb-0 font-light text-sm">
                <h3 className=" font-light text-sm lowercase">
                  @{item.userName}
                </h3>

                <div className="flex  items-center text-sm">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {item._count.messages}
                </div>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
