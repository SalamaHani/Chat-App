import React from "react";

interface SettingsItemProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    onClick?: () => void;
    trailing?: React.ReactNode;
    destructive?: boolean;
}

function SettingsItem({
    icon,
    title,
    description,
    onClick,
    trailing,
    destructive = false,
}: SettingsItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left ${destructive ? "text-destructive" : ""
                }`}
        >
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="flex-1 min-w-0">
                <div className={`font-medium ${destructive ? "text-destructive" : ""}`}>
                    {title}
                </div>
                {description && (
                    <div className="text-sm text-muted-foreground mt-0.5">
                        {description}
                    </div>
                )}
            </div>
            {trailing && <div className="flex-shrink-0">{trailing}</div>}
        </button>
    );
}

export default SettingsItem;
