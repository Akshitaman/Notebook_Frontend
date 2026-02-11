"use client";

import Sidebar from '@/components/layout/Sidebar';
import EditorCanvas from '@/components/editor/EditorCanvas';
import AIPanel from '@/components/ai/AIPanel';

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-[#0c0c0e] text-zinc-300 overflow-hidden relative">
      {/* Identity-First Sidebar */}
      <Sidebar />

      {/* The Core Editor Engine / Main View */}
      <EditorCanvas />

      {/* AI Assistant Panel */}
      <AIPanel />
    </div>
  );
}
