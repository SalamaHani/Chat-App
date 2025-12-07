import React from "react";
import { MessageSquareOff, Shield, Lock } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="h-full w-full bg-background p-6 overflow-y-auto">
            <div className="max-w-3xl">
                <h1 className="text-2xl font-semibold mb-6">Security</h1>

                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 className="font-medium mb-2">Your chats and calls are private</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            End-to-end encryption keeps your personal messages and calls between you and the
                            people you choose. No one outside of the chat, not even WhatsApp, can read, listen
                            to, or share them. This includes your:
                        </p>

                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm">
                                <MessageSquareOff className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Text and voice messages</div>
                                    <div className="text-muted-foreground">All your conversations are encrypted</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <Shield className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Audio and video calls</div>
                                    <div className="text-muted-foreground">Protected from end to end</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <Lock className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Photos, videos and documents</div>
                                    <div className="text-muted-foreground">Your media files are secure</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
