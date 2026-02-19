"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FileText, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NoteFile } from '@/store/useFileStore';
import { motion } from 'framer-motion';

interface FileCardProps {
    file: NoteFile;
    onClick: () => void;
    onRename: (newName: string) => void;
    onDelete?: () => void;           // Immediate delete (legacy/unused now)
    onDeleteRequest?: () => void;    // Request confirmation
}

const FileCard = ({ file, onClick, onRename, onDelete, onDeleteRequest }: FileCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(file.title);
    const [showMenu, setShowMenu] = useState(false); // For mobile/touch maybe, or just hover like FolderCard
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleRenameSubmit = () => {
        if (tempTitle.trim()) {
            onRename(tempTitle.trim());
        } else {
            setTempTitle(file.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleRenameSubmit();
        if (e.key === 'Escape') {
            setTempTitle(file.title);
            setIsEditing(false);
        }
        e.stopPropagation();
    };

    return (
        <div
            onClick={!isEditing ? onClick : undefined}
            className="group flex flex-col gap-3 cursor-pointer relative"
        >
             {/* Action Buttons (Visible on Hover) */}
             <div className="absolute top-2 right-2 flex items-center gap-2 z-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                    className="p-1.5 rounded-full bg-black/40 text-zinc-400 hover:text-white hover:bg-black/60 transition-all"
                    title="Rename"
                >
                    <Edit2 size={14} />
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRequest?.();
                    }}
                    className="p-1.5 rounded-full bg-black/40 text-zinc-400 hover:text-red-400 hover:bg-black/60 transition-all"
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            {/* Thumbnail */}
            <div className="aspect-[3/4] bg-zinc-900/50 rounded-2xl border border-zinc-800 group-hover:border-zinc-700 transition-all flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-transparent to-transparent opacity-50" />
                <FileText size={48} className="text-zinc-700 group-hover:text-zinc-600 transition-colors opacity-50" />

                {/* Content Preview */}
                {file.content ? (
                    <div className="absolute inset-4 text-[6px] text-zinc-600 overflow-hidden leading-relaxed opacity-30 select-none pointer-events-none">
                        {file.content.slice(0, 500)}
                    </div>
                ) : (
                    <span className="absolute bottom-1/2 translate-y-8 text-[10px] text-zinc-600 italic">No content</span>
                )}
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1 px-1">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={handleRenameSubmit}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-zinc-900 border border-cyan-500/50 rounded px-2 py-0.5 text-sm font-bold text-white outline-none w-full"
                    />
                ) : (
                    <h3 className="font-bold text-zinc-200 truncate group-hover:text-cyan-400 transition-colors">{file.title}</h3>
                )}
                <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">
                    {new Date(file.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            </div>
        </div>
    );
};

export default FileCard;
