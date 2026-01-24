"use client";

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

const ProfileTile = () => {
    return (
        <div className="p-4 border-b border-border">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg transition-colors outline-none text-left">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        JD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium truncate">John's Workspace</div>
                        <div className="text-[10px] text-muted-foreground truncate">Personal Plan</div>
                    </div>
                    <ChevronDown size={14} className="text-muted-foreground" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-popover border border-border rounded-md shadow-lg p-1 z-50 mt-1">
                    <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="h-px bg-border my-1" />
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer outline-none">
                        <User size={14} /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer outline-none">
                        <Settings size={14} /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="h-px bg-border my-1" />
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-md cursor-pointer outline-none">
                        <LogOut size={14} /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProfileTile;
