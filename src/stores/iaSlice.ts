import type { StateCreator } from "zustand"

import openRouterService from "../services/openRouterService";

export type IASlice = {
    recipe: string;
    generateRecipeIA: (prompt: string) => Promise<void>;
    isGenerating?: boolean;
}

export const createAISlice:StateCreator<IASlice> = (set) => ({
    recipe: '',
    generateRecipeIA: async (prompt: string) => {
        const stream = await openRouterService.generateRecipe(prompt);
        if (stream) {
            set({ isGenerating: true });
            set({ recipe: '' });
            let fullText = '';
            for await (const chunk of stream) {
                fullText += chunk;
                set({ recipe: fullText });
            }
            set({ isGenerating: false });
        }
    }
})