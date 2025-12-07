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
                userIds: true,
            },
        });

        for (const conversation of userConversations) {
            // If it's a one-on-one chat or user is the only one left, delete the conversation
            // Otherwise, just remove the user from the conversation
            if (conversation.userIds.length <= 2) {
                // Delete the entire conversation (messages will cascade delete)
                await prisma.conversations.delete({
                    where: {
                        id: conversation.id,
                    },
                });
            } else {
                // Remove user from group conversation
                const updatedUserIds = conversation.userIds.filter(
                    (id) => id !== currentUser.id
                );
                await prisma.conversations.update({
                    where: {
                        id: conversation.id,
                    },
                    data: {
                        userIds: updatedUserIds,
                    },
                });
            }
        }

        // Clear user's seenMessageIds
        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                seenMessageIds: [],
                conversationIds: [],
            },
        });

        return NextResponse.json({
            success: true,
            message: "All chats deleted successfully",
        });
    } catch (error) {
        console.error("DELETE_CHATS_ERROR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
