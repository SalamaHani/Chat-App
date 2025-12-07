"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

const BACKGROUNDS = [
    { id: "default", name: "Default", value: "bg-[#efeae2] dark:bg-[#0b141a]" },
    { id: "light", name: "Light", value: "bg-white dark:bg-[#111b21]" },
    { id: "warm", name: "Warm", value: "bg-[#f5e6d3] dark:bg-[#1a1410]" },
    { id: "cool", name: "Cool", value: "bg-[#e3f2fd] dark:bg-[#0a1929]" },
    { id: "green", name: "Green", value: "bg-[#e8f5e9] dark:bg-[#0d1f12]" },
];

export function BackgroundSelector() {
    const [selected, setSelected] = useState("default");

    useEffect(() => {
        const saved = localStorage.getItem("chat-background");
        if (saved) setSelected(saved);
    }, []);

    const handleSelect = (id: string) => {
        setSelected(id);
        localStorage.setItem("chat-background", id);
        // Dispatch event for other components to listen
        window.dispatchEvent(new CustomEvent("chat-background-change", { detail: id }));
    };

    return (
        <div className="p-4 space-y-4">
            <h3 className="font-semibold">Select Chat Background</h3>
            <div className="grid grid-cols-2 gap-3">
                {BACKGROUNDS.map((bg) => (
                    <button
                        key={bg.id}
                        onClick={() => handleSelect(bg.id)}
                        className={`relative h-24 rounded-lg border-2 transition-all ${selected === bg.id
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            } ${bg.value}`}
                    >
                        {selected === bg.id && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-4 w-4" />
                            </div>
                        )}
                        <div className="absolute bottom-2 left-2 right-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-sm font-medium">
                            {bg.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
