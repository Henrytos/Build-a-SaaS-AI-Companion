import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { companionId } }: { params: { companionId: string } }
) {
  if (!companionId) {
    return new NextResponse("Missing companionId", { status: 400 });
  }
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

    const companion = await prismadb.companion.update({
      where: { id: companionId },
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
