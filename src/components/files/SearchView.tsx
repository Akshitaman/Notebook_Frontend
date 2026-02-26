"use client";

import React from 'react';
import { useFileStore } from '@/store/useFileStore';
import { useFolderStore } from '@/store/useFolderStore';
import { FileText, Folder, Search } from 'lucide-react';
import FolderCard from './FolderCard';
import { cn } from '@/lib/utils';

const SearchView = () => {
    const { searchQuery, selectFile } = useFileStore();
    const { folders, openFolder, renameFolder, deleteFolder } = useFolderStore();

    const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);
    const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);

    if (!searchQuery) return null;

    const regex = new RegExp(searchQuery, 'i');

    const folderResults = folders.filter(f => regex.test(f.name));
    const fileResults = folders.flatMap(f =>
        f.files.filter(file => regex.test(file.title)).map(file => ({
            ...file,
            folderName: f.name,
            folderId: f.id
        }))
    );

    const hasResults = folderResults.length > 0 || fileResults.length > 0;

    return (
        <div className="flex flex-col h-full bg-[#0c0c0e] text-zinc-100 p-4 md:p-8 relative gap-12 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <header className="flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-3">
                    <Search className="text-cyan-500" size={24} />
                    <h1 className="text-3xl font-extrabold tracking-tight">Search Results</h1>
                </div>
                <p className="text-zinc-500 text-sm">
                    Showing results for <span className="text-cyan-400 font-mono">"{searchQuery}"</span>
                </p>
            </header>

            {!hasResults ? (
                <div className="flex flex-col items-center justify-center h-64 text-zinc-600 gap-4 opacity-50">
                    <Search size={48} strokeWidth={1} />
                    <p>No matches found for your search</p>
                </div>
            ) : (
                <div className="space-y-12 pb-20">
                    {/* Folders Section */}
                    {folderResults.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Folders ({folderResults.length})</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                                {folderResults.map(folder => (
                                    <FolderCard
                                        key={folder.id}
                                        name={folder.name}
                                        fileCount={folder.files?.length || 0}
                                        onClick={() => openFolder(folder.id)}
                                        onRename={(newName: string) => renameFolder(folder.id, newName)}
                                        onDelete={() => {
                                            deleteFolder(folder.id);
                                            setIsDeletingId(null);
                                        }}
                                        onDeleteRequest={() => setDeleteTargetId(folder.id)}
                                        isDeleting={isDeletingId === folder.id}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Files Section ... (rest of search view) */}
                    {fileResults.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Files ({fileResults.length})</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                                {fileResults.map(file => (
                                    <div
                                        key={file.id}
                                        onClick={() => selectFile(file.id)}
                                        className="group flex flex-col gap-3 cursor-pointer"
                                    >
                                        <div className="aspect-3/4 bg-zinc-900/50 rounded-2xl border border-zinc-800 group-hover:border-cyan-500/50 transition-all flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-linear-to-tr from-zinc-900 via-transparent to-transparent opacity-50" />
                                            <FileText size={48} className="text-zinc-700 group-hover:text-cyan-500/50 transition-colors" opacity={0.5} />

                                            {file.content && (
                                                <div className="absolute inset-4 text-[6px] text-zinc-600 overflow-hidden leading-relaxed opacity-30 select-none pointer-events-none">
                                                    {file.content.slice(0, 500)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1 px-1">
                                            <h3 className="font-bold text-zinc-200 truncate group-hover:text-cyan-400 transition-colors">{file.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">
                                                    {new Date(file.updatedAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-[10px] text-zinc-600 italic truncate">
                                                    in {file.folderName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTargetId && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-zinc-100 mb-2">Delete Folder?</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            Are you sure you want to permanently delete this folder? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTargetId(null)}
                                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsDeletingId(deleteTargetId);
                                    setDeleteTargetId(null);
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-medium border border-red-500/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchView;
