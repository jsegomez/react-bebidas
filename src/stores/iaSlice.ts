import type { StateCreator } from "zustand"

export type IASlice = {
    recipe: string;
    generateRecipeIA: (prompt: string) => Promise<void>;
}

export const createAISlice:StateCreator<IASlice> = () => ({
    recipe: '',
    generateRecipeIA: async (prompt: string) => {        
        return new Promise(() => {
            console.log('estamos conectados a la ia' + prompt);
        });
    }
})