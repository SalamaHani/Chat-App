import { getCuruentUser } from "@/utils/action";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function POST() {
    try {
        const currentUser = await getCuruentUser();

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get all conversations for the current user
        const userConversations = await prisma.conversations.findMany({
            where: {
                userIds: {
                    has: currentUser.id,
                },
            },
            select: {
                id: true,
            },
        });

        const conversationIds = userConversations.map((conv) => conv.id);

        // Delete all messages from user's conversations
        await prisma.message.deleteMany({
            where: {
                conversationId: {
                    in: conversationIds,
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "All messages cleared successfully",
        });
    } catch (error) {
        console.error("CLEAR_MESSAGES_ERROR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
