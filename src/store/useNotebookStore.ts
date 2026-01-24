import { create } from 'zustand';

export interface NotebookItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    parentId: string | null;
    children?: NotebookItem[];
    content?: string; // This is the 'Shadow Content' (raw text)
}

interface NotebookState {
    items: NotebookItem[];
    activeNoteId: string | null;

    // Actions
    setActiveNoteId: (id: string | null) => void;
    updateShadowContent: (id: string, content: string) => void;
    addItem: (item: NotebookItem) => void;
    deleteItem: (id: string) => void;
    // TODO: Add recursive tree manipulation helpers
}

export const useNotebookStore = create<NotebookState>((set) => ({
    items: [],
    activeNoteId: null,

    setActiveNoteId: (id) => set({ activeNoteId: id }),

    updateShadowContent: (id, content) => set((state) => {
        // Helper to update content recursively in the tree
        const updateRecursive = (items: NotebookItem[]): NotebookItem[] => {
            return items.map((item) => {
                if (item.id === id) {
                    return { ...item, content };
                }
                if (item.children) {
                    return { ...item, children: updateRecursive(item.children) };
                }
                return item;
            });
        };

        return { items: updateRecursive(state.items) };
    }),

    addItem: (item) => set((state) => ({
        items: [...state.items, item] // Simplified, assumes top-level for now
    })),

    deleteItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id) // Simplified
    })),
}));
