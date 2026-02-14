import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProfileData } from '@/data/mockProfileData';

interface UserProfileState {
    name: string;
    tagline: string;
    
    // Actions
    updateProfile: (data: { name: string; tagline: string }) => void;
}

export const useUserStore = create<UserProfileState>()(
    persist(
        (set) => ({
            name: mockProfileData.name,
            tagline: mockProfileData.tagline,

            updateProfile: (data) => set((state) => ({ ...state, ...data })),
        }),
        {
            name: 'user-profile-storage',
        }
    )
);
