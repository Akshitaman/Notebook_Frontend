"use client";

import React from 'react';
import { FilePlus, FolderPlus } from 'lucide-react';

interface SidebarHeadingProps {
    onAddFile?: () => void;
    onAddFolder?: () => void;
}

const SidebarHeading = ({ onAddFile, onAddFolder }: SidebarHeadingProps) => {
    return (
        <div className="flex items-center justify-between px-2 py-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Folders
            </h2>
            <div className="flex items-center gap-1">
                <button
                    onClick={onAddFile}
                    className="p-1 hover:bg-slate-800/50 rounded transition-colors group"
                    title="Add File"
                >
                    <FilePlus
                        size={16}
                        className="text-slate-500 group-hover:text-slate-200 transition-colors"
                    />
                </button>
                <button
                    onClick={onAddFolder}
                    className="p-1 hover:bg-slate-800/50 rounded transition-colors group"
                    title="Add Folder"
                >
                    <FolderPlus
                        size={16}
                        className="text-slate-500 group-hover:text-slate-200 transition-colors"
                    />
                </button>
            </div>
        </div>
    );
};

export default SidebarHeading;
