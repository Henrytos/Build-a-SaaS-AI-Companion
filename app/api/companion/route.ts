import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { src, name, categoryId, description, instructions, seed } = body;

    if (
      !src ||
      !name ||
      !categoryId ||
      !description ||
      !instructions ||
      !seed
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismadb.companion.create({
      data: {
        userName: user.firstName,
        userId: user.id,
        categoryId,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return new NextResponse(JSON.stringify(companion), {
      status: 201,
    });
  } catch (error) {
    console.log("[POST] /api/companion", error);
  }
}
