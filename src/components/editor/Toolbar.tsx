"use client";

import React from 'react';
import { Bold, Italic, List, Code, Type } from 'lucide-react';

const Toolbar = () => {
    return (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors" title="Bold">
                <Bold size={16} />
            </button>
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors" title="Italic">
                <Italic size={16} />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors" title="List">
                <List size={16} />
            </button>
            <button className="p-1.5 hover:bg-accent rounded-md transition-colors" title="Code Block">
                <Code size={16} />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <div className="flex items-center gap-2 ml-auto">
                <Type size={14} className="text-muted-foreground" />
                <select className="bg-transparent text-xs border-none focus:ring-0 cursor-pointer">
                    <option>Monospace</option>
                    <option>Sans Serif</option>
                    <option>Serif</option>
                </select>
            </div>
        </div>
    );
};

export default Toolbar;
