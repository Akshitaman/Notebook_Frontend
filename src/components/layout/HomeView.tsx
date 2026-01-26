"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Plus, History, Sparkles } from 'lucide-react';
import { useNotebookStore } from '@/store/useNotebookStore';
import { useFileStore } from '@/store/useFileStore';

const HomeView = () => {
    const { addItem } = useNotebookStore();
    const { openOverview } = useFileStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Decorative background glow */}
                <div className="absolute -inset-10 bg-brand-accent/10 blur-[100px] rounded-full" />

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 relative">
                    <span className="bg-clip-text text-transparent bg-linear-to-br from-white via-zinc-200 to-zinc-500">
                        Code
                    </span>
                    <span className="text-brand-accent drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] ml-4">
                        Logs
                    </span>
                </h1>

                <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                    A high-precision syntax editor for developers.
                    Organize your thoughts, document your code, and build your digital garden with
                    <span className="text-zinc-300"> seamless Markdown integration</span> and AI-powered insights.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => addItem(null, 'file', 'Untitled Log.md')}
                        className="px-8 py-3 bg-brand-accent text-brand-dark font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-brand-accent/20"
                    >
                        <Plus size={20} />
                        New Log
                    </button>

                    <button
                        onClick={openOverview}
                        className="px-8 py-3 bg-zinc-900 text-zinc-300 font-bold rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all duration-400 flex items-center gap-2"
                    >
                        <Book size={18} />
                        Library
                    </button>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm group hover:border-brand-accent/30 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-zinc-100 font-bold mb-2">Smart Highlighting</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Precision regex-based highlighting that understands word boundaries and context.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm group hover:border-brand-accent/30 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                            <Plus size={20} />
                        </div>
                        <h3 className="text-zinc-100 font-bold mb-2">Cell-Based Flow</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Hybrid document structure mixing standard text with executable-style code blocks.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm group hover:border-brand-accent/30 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                            <History size={20} />
                        </div>
                        <h3 className="text-zinc-100 font-bold mb-2">Version History</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Auto-save and persistent storage ensures your logs are never lost.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomeView;
