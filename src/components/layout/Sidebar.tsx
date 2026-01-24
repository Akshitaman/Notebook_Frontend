"use client";

import React from 'react';
import { useNotebookStore } from '@/store/useNotebookStore';
import ProfileTile from '@/components/layout/ProfileTile';
import { Folder, FileText, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const { items } = useNotebookStore();

    return (
        <aside className="w-64 h-screen border-r border-border bg-card flex flex-col">
            <ProfileTile />

            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace</span>
                    <button className="p-1 hover:bg-accent rounded-md">
                        <Plus size={14} />
                    </button>
                </div>

                {/* Recursive Tree rendering would go here */}
                <div className="px-2 space-y-0.5">
                    {items.length === 0 && (
                        <div className="px-4 py-2 text-xs text-muted-foreground italic">
                            No notes yet...
                        </div>
                    )}
                    {/* Example of 12px indentation rule */}
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer group">
                        <Folder size={16} className="text-primary" />
                        <span className="flex-1 truncate">Drafts</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer group pl-[24px]">
                        <FileText size={16} className="text-muted-foreground" />
                        <span className="flex-1 truncate">Ideas.md</span>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-border text-[10px] text-muted-foreground flex justify-between uppercase tracking-tighter">
                <span>v0.1.0-alpha</span>
                <span>Storage: 12%</span>
            </div>
        </aside>
    );
};

export default Sidebar;
