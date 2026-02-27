"use client";

import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ProfileTile = ({ isCollapsed }: { isCollapsed?: boolean }) => {
    const { name } = useUserStore();

    const getInitials = (fullName: string) => {
        const parts = fullName.split(' ').filter((p) => p.length > 0);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return (fullName || 'U').slice(0, 1).toUpperCase();
    };

    const initials = getInitials(name || 'User');
    const firstName = name ? name.split(' ')[0] : 'User';

    return (
        <div
            className={cn(
                "flex flex-row items-center w-full rounded-xl h-12 cursor-default",
                isCollapsed ? "justify-center" : ""
            )}
        >
            <div className={cn("shrink-0 flex items-center justify-center", isCollapsed ? "w-[56px]" : "w-10")}>
                <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-[13px] shrink-0">
                    {initials}
                </div>
            </div>

            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 overflow-hidden flex flex-col justify-center ml-2 text-left"
                >
                    <div className="text-[14px] font-bold text-[#e1e1e1] tracking-tight truncate leading-none">
                        Hi, {firstName}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ProfileTile;
