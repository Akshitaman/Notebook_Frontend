import { create } from 'zustand';

interface AIState {
    isAIOpen: boolean;
    activeTab: 'quiz' | 'summary' | 'chat';
    toggleAI: () => void;
    setTab: (tab: 'quiz' | 'summary' | 'chat') => void;
}

export const useAIStore = create<AIState>((set) => ({
    isAIOpen: false,
    activeTab: 'chat',
    toggleAI: () => set((state) => ({ isAIOpen: !state.isAIOpen })),
    setTab: (tab) => set({ activeTab: tab }),
}));
