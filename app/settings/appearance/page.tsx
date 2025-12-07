"use client";

import React from "react";
import { Palette } from "lucide-react";
import SettingsItem from "@/components/settings/SettingsItem";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

export default function AppearancePage() {
    return (
        <div className="h-full w-full bg-background p-6 overflow-y-auto">
            <div className="max-w-3xl">
                <h1 className="text-2xl font-semibold mb-6">Appearance</h1>

                <div className="bg-card border border-border rounded-lg divide-y divide-border">
                    <SettingsItem
                        icon={<Palette className="h-5 w-5" />}
                        title="Theme"
                        description="Choose your preferred theme"
                        trailing={<ThemeToggle />}
                    />
                </div>
            </div>
        </div>
    );
}
