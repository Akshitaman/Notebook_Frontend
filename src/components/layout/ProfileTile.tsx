"use client";

import React from 'react';
import Link from 'next/link';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings, ChevronDown, HelpCircle, Languages, Moon, Info } from 'lucide-react';
import { useNotebookStore } from '@/store/useNotebookStore';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileTile = ({ isCollapsed }: { isCollapsed?: boolean }) => {
    const { workspaces, activeWorkspaceId } = useNotebookStore();
    const activeWorkspace = workspaces.find(ws => ws.id === activeWorkspaceId);

    const { name } = useUserStore();

    const getInitials = (fullName: string) => {
        const parts = fullName.split(' ').filter(p => p.length > 0);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return (fullName || 'U').slice(0, 1).toUpperCase();
    };

    const initials = getInitials(name || 'User');

    const MenuItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
        <DropdownMenu.Item
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2 text-[13px] text-zinc-200 hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors group"
        >
            <Icon size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="font-medium">{label}</span>
        </DropdownMenu.Item>
    );

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={cn(
                    "flex flex-row items-center w-full hover:bg-zinc-800/80 rounded-xl transition-all duration-300 outline-none text-left border border-transparent hover:border-white/5 group relative h-14",
                )}>
                    <div className="w-[56px] shrink-0 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/10 shrink-0 border-2 border-zinc-900 text-sm">
                            {initials}
                        </div>
                    </div>

                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 overflow-hidden flex flex-col justify-center"
                        >
                            <div className="text-sm font-bold text-white tracking-tight truncate leading-none mb-1.5">
                                {name}
                            </div>
                            <div className="text-[10px] font-bold text-zinc-500 truncate leading-none uppercase tracking-widest opacity-80">
                                {activeWorkspace?.name || "Personal"}
                            </div>
                        </motion.div>
                    )}

                    {!isCollapsed && (
                        <div className="pr-3">
                            <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                        </div>
                    )}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    side="top"
                    align={isCollapsed ? "center" : "start"}
                    sideOffset={12}
                    className="z-100 outline-none"
                    asChild
                >
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-56 bg-[#1e1e1e] border border-white/8 rounded-[12px] shadow-2xl p-1.5 focus:outline-none"
                    >
                        <div className="space-y-0.5">
                            <MenuItem icon={HelpCircle} label="FAQ" />
                            <MenuItem icon={Languages} label="Language" />
                            <MenuItem icon={Moon} label="Toggle Theme" />
                            <MenuItem icon={Settings} label="Settings" />
                            <MenuItem icon={Info} label="Learn More" />

                            <div className="h-px bg-white/8 my-1.5 mx-1" />

                            <MenuItem icon={LogOut} label="Logout" />
                        </div>
                    </motion.div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ProfileTile;
