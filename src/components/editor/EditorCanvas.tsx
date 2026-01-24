"use client";

import React from 'react';
import Toolbar from '@/components/editor/Toolbar';

const EditorCanvas = () => {
    return (
        <div className="flex flex-col flex-1 h-screen overflow-hidden bg-background">
            {/* Breadcrumbs placeholder */}
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
                Notes / Untitled Note
            </div>

            <Toolbar />

            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto border border-border/50 rounded-lg shadow-sm min-h-full bg-card">
                    {/* SmartEditor will go here */}
                    <div className="p-4 text-muted-foreground italic">Editor Surface...</div>
                </div>
            </main>
        </div>
    );
};

export default EditorCanvas;
