"use client";

import React from 'react';
import { useNotebookStore } from '@/store/useNotebookStore';
import { Search, Grip, Calendar, MoreVertical, FolderPlus } from 'lucide-react';
import FolderCard from './FolderCard';

const FoldersView = () => {
    const { workspaces, activeWorkspaceId, toggleFolder } = useNotebookStore();

    const activeWorkspace = workspaces.find(ws => ws.id === activeWorkspaceId);
    const folders = activeWorkspace?.folders || [];

    return (
        <div className="flex flex-col h-full bg-[#0c0c0e] text-zinc-100 p-8 relative">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-extrabold tracking-tight">Folders</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Grip size={20} />
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 text-xs font-bold text-cyan-400 tracking-wider">
                        DATE
                    </div>
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>


            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {folders.map(folder => (
                    <FolderCard
                        key={folder.id}
                        name={folder.name}
                        fileCount={folder.children?.length || 0}
                        onClick={() => toggleFolder(folder.id)}
                    />
                ))}

                {folders.length === 0 && (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center text-zinc-500 gap-4 opacity-50">
                        <FolderPlus size={48} strokeWidth={1} />
                        <p>No folders in this workspace</p>
                    </div>
                )}
            </div>

            {/* FAB */}
            <button
                onClick={() => {/* Implement folder creation logic if needed */ }}
                className="absolute bottom-8 right-8 w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all hover:scale-110 active:scale-95 z-50"
            >
                <FolderPlus size={28} className="text-[#0c0c0e]" strokeWidth={3} />
            </button>
        </div>
    );
};

export default FoldersView;
