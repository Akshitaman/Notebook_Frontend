"use client";

import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { HTML_CLEANER_PATTERN } from '@/lib/regex';
import debounce from 'lodash.debounce';
import { Plus, Image as ImageIcon, Code, Minus, Table as TableIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartEditorProps {
    initialContent?: string;
    onSync?: (content: string) => void;
    autoFocus?: boolean;
}

const SmartEditor = ({ initialContent = "", onSync, autoFocus = false }: SmartEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Hover & Menu State
    const [isHovering, setIsHovering] = useState(false);
    const [hoverTop, setHoverTop] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Anti-Hallucination Guardrail: Strip spans before re-render or sync
    const cleanHTML = (html: string) => {
        return html.replace(HTML_CLEANER_PATTERN, '');
    };

    // Initialize content only once when component mounts or key changes
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = initialContent;
            if (autoFocus) {
                editorRef.current.focus();
                // Move cursor to end
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(editorRef.current);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
    }, [autoFocus]);

    const handleInput = debounce(() => {
        if (!editorRef.current) return;

        const rawHTML = editorRef.current.innerHTML;
        const cleanedText = editorRef.current.innerText; // Shadow text - raw plain text

        // Sync with external state (Zustand)
        if (onSync) onSync(cleanedText);

        console.log("Syncing shadow content:", cleanedText);
    }, 300);

    // --- Hover Logic ---
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (menuOpen) return; // Don't move the button if the menu is actively open
        if (!editorRef.current || !containerRef.current) return;

        // Ensure we are hovering over something within the editor's content area
        const elementsInfo = document.elementsFromPoint(e.clientX, e.clientY);
        const editorIndex = elementsInfo.findIndex(el => el === editorRef.current);
        const containerIndex = elementsInfo.findIndex(el => el === containerRef.current);

        // Find the specific node we are hovering over inside the editor
        // We look for direct children of the editorRef (like paragraphs, divs, etc)
        // or just use the approximate Y coordinate if it's plain text.
        // For contentEditable plain text without block tags, we might just track the mouse Y roughly, 
        // but let's try to align to the specific elements if they exist.

        let targetNode: Element | null = null;

        // Check elements under cursor
        for (const el of elementsInfo) {
            if (el.parentElement === editorRef.current || el === editorRef.current) {
                if (el !== editorRef.current) {
                    targetNode = el;
                }
                break;
            }
        }

        const editorRect = editorRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Let's implement a simpler approach: align the button to the vertical cursor position, 
        // snapped to a rough "line height" or just perfectly aligned with the mouse Y for simplicity if no block nodes exist.
        // Or better: align it with the exact node if found.

        let calculatedTop = e.clientY - containerRect.top;

        if (targetNode) {
            const nodeRect = targetNode.getBoundingClientRect();
            // Center it vertically relative to the node
            calculatedTop = nodeRect.top - containerRect.top + (nodeRect.height / 2) - 12; // 12 is half the button height (24px)
        } else {
            // Fallback: just use cursor Y, centered to our a rough 24px line height
            calculatedTop = e.clientY - containerRect.top - 12;
        }

        // Bound the top so it doesn't go above the editor
        if (calculatedTop < 0) calculatedTop = 0;

        setHoverTop(calculatedTop);
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        // Only hide if the menu isn't open
        if (!menuOpen) {
            setIsHovering(false);
        }
    };

    // --- Menu Close Logic ---
    useEffect(() => {
        const handleClickOutside = (e: globalThis.MouseEvent) => {
            if (menuOpen && popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
                setIsHovering(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (menuOpen && e.key === 'Escape') {
                setMenuOpen(false);
                setIsHovering(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    const handlePlusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* The '+' Button */}
            {(isHovering || menuOpen) && hoverTop !== null && (
                <button
                    onClick={handlePlusClick}
                    style={{ top: hoverTop }}
                    className={cn(
                        "absolute -left-10 w-6 h-6 flex items-center justify-center rounded-md text-zinc-500 hover:text-cyan-400 hover:bg-zinc-800/50 cursor-pointer text-lg outline-none z-10 transition-colors",
                        menuOpen ? "text-cyan-400 bg-zinc-800" : ""
                    )}
                    aria-label="Add element"
                >
                    <Plus size={16} />
                </button>
            )}

            {/* The Popup Menu */}
            {menuOpen && hoverTop !== null && (
                <div
                    ref={popupRef}
                    style={{ top: hoverTop + 28 }}
                    className="absolute -left-10 z-50 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl shadow-black/50 overflow-hidden text-sm animate-in fade-in slide-in-from-top-2 duration-150"
                >
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left">
                        <ImageIcon size={14} className="text-zinc-500" />
                        <span>Add Image</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left">
                        <Code size={14} className="text-blue-500" />
                        <span>Add Code Cell</span>
                    </button>
                    <div className="h-px w-full bg-zinc-800/50 my-1"></div>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left">
                        <Minus size={14} className="text-zinc-500" />
                        <span>Add Divider</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left">
                        <TableIcon size={14} className="text-zinc-500" />
                        <span>Add Table</span>
                    </button>
                </div>
            )}

            {/* The Editor Canvas */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="outline-none min-h-[500px] font-mono text-sm leading-relaxed text-zinc-300 relative before:content-[attr(data-placeholder)] before:absolute before:text-zinc-500 before:pointer-events-none before:italic empty:before:block before:hidden cursor-text"
                spellCheck={false}
                data-placeholder="Start writing or type / for commands..."
            />
        </div>
    );
};

export default SmartEditor;
