import { getCuruentUser } from "@/utils/action";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function POST(requset: Request) {
  try {
    const currentuser = await getCuruentUser();
    const body = await requset.json();
    const { name, image, bio } = body;
    if (!currentuser?.id || !currentuser?.email) {
      return new NextResponse("Unauthrized", { status: 401 });
    }
    const updatAccount = await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        name,
        image,
        bio,
      },
    });
    return NextResponse.json(updatAccount);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Servar Error", { status: 500 });
  }
}
