"use client";

import React from 'react';
import SmartEditor from '@/components/editor/SmartEditor';
import { useNotebookStore } from '@/store/useNotebookStore';
import { useFileStore } from '@/store/useFileStore';
import RecentFilesView from '@/components/files/RecentFilesView';
import FileEditorView from '@/components/files/FileEditorView';
import HomeView from '@/components/layout/HomeView';
import FoldersView from '@/components/files/FoldersView';
import SearchView from '@/components/files/SearchView';

const EditorCanvas = () => {
    const { activeNoteId, updateShadowContent } = useNotebookStore();
    const { isOverviewOpen, isFoldersOpen, activeFileId, searchQuery } = useFileStore();

    if (searchQuery) {
        return (
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-brand-dark">
                <SearchView />
            </div>
        );
    }

    if (isOverviewOpen) {
        if (activeFileId) {
            return (
                <div className="flex flex-col flex-1 h-screen overflow-hidden bg-brand-dark">
                    <FileEditorView />
                </div>
            );
        }
        return (
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-brand-dark">
                <RecentFilesView />
            </div>
        );
    }

    if (isFoldersOpen) {
        return (
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-brand-dark">
                <FoldersView />
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 h-screen overflow-hidden bg-brand-dark">


            <main className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">
                <div className="max-w-5xl mx-auto min-h-full">
                    {activeNoteId ? (
                        <SmartEditor
                            onSync={(content) => updateShadowContent(activeNoteId, content)}
                        />
                    ) : (
                        <HomeView />
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditorCanvas;
