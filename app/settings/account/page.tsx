import React from "react";

export default function AccountPage() {
    return (
        <div className="h-full w-full bg-background p-6 overflow-y-auto">
            <div className="max-w-3xl">
                <h1 className="text-2xl font-semibold mb-6">Account</h1>

                <div className="space-y-6">
                    {/* Privacy Section */}
                    <div>
                        <div className="mb-3">
                            <h3 className="font-medium">Privacy</h3>
                            <p className="text-sm text-muted-foreground italic">Managed on your phone</p>
                        </div>

                        <div className="bg-card border border-border rounded-lg divide-y divide-border">
                            <div className="p-4">
                                <div className="font-medium text-sm">Last seen and online</div>
                                <div className="text-sm text-muted-foreground">My contacts, Everyone</div>
                            </div>
                            <div className="p-4">
                                <div className="font-medium text-sm">Profile photo</div>
                                <div className="text-sm text-muted-foreground">Everyone</div>
                            </div>
                            <div className="p-4">
                                <div className="font-medium text-sm">About</div>
                                <div className="text-sm text-muted-foreground">My contacts</div>
                            </div>
                            <div className="p-4">
                                <div className="font-medium text-sm">Add to groups</div>
                                <div className="text-sm text-muted-foreground">Everyone</div>
                            </div>
                            <div className="p-4">
                                <div className="font-medium text-sm">Read receipts</div>
                                <div className="text-sm text-muted-foreground">On</div>
                            </div>
                        </div>
                    </div>

                    {/* Blocked Contacts Section */}
                    <div>
                        <div className="mb-3">
                            <h3 className="font-medium">Blocked contacts</h3>
                            <p className="text-sm text-muted-foreground italic">Managed on your phone</p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="text-sm text-muted-foreground">No blocked contacts</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
