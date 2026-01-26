"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

interface FolderCardProps {
    name: string;
    fileCount: number;
    onClick?: () => void;
}

const FolderCard = ({ name, fileCount, onClick }: FolderCardProps) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover="hover"
            initial="initial"
            className="group flex flex-col gap-4 cursor-pointer relative"
        >
            {/* Options Button */}
            <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-zinc-400 hover:text-white hover:bg-black/60 transition-all z-20 opacity-0 group-hover:opacity-100">
                <MoreVertical size={14} />
            </button>

            {/* Folder Icon Container */}
            <div className="aspect-4/3 relative flex items-center justify-center pt-8">
                {/* Back of the folder */}
                <div className="absolute inset-0 top-6 bg-[#0e7490] rounded-xl shadow-lg" />

                {/* Folder Tab */}
                <div className="absolute top-2 left-3 w-14 h-8 bg-[#0e7490] rounded-t-xl" />

                {/* The "Document" that pops out */}
                <motion.div
                    variants={{
                        initial: { y: 20, opacity: 0.8 },
                        hover: { y: -12, opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute top-4 w-[85%] h-[80%] bg-[#f1f5f9] rounded-lg shadow-md flex flex-col p-4 gap-2 z-0"
                >
                    <div className="w-full h-1.5 bg-zinc-200 rounded-full" />
                    <div className="w-[85%] h-1.5 bg-zinc-200 rounded-full" />
                    <div className="w-[60%] h-1.5 bg-zinc-200 rounded-full" />
                </motion.div>

                {/* Front of the folder (Trapezoid shape) */}
                <div
                    className="absolute inset-x-0 bottom-0 top-10 bg-[#22d3ee] rounded-xl shadow-2xl flex items-center justify-center z-10"
                    style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 96.5% 100%, 3.5% 100%)'
                    }}
                >
                    {/* Folder Line Detail */}
                    <div className="w-[40%] h-0.5 bg-cyan-800/20 rounded-full" />
                </div>
            </div>

            {/* Folder Meta */}
            <div className="flex flex-col items-center gap-0.5 px-1">
                <h3 className="font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">{name}</h3>
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                    {fileCount} {fileCount === 1 ? 'FILE' : 'FILES'}
                </span>
            </div>
        </motion.div>
    );
};

export default FolderCard;
