import type { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService";
import type { Categories, SearchRecipe } from "../types";

export type  RecipesSliceType = {
    categories: Categories,
    fetchCategories: () => Promise<void>;
    searchRecipes: (recipe: SearchRecipe) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: { drinks: [] },
    fetchCategories: async ():Promise<void> => {
        const categories = await getCategories();
        set({ categories });
    },
    searchRecipes: async(recipe: SearchRecipe):Promise<void> => {
        console.log(recipe);
    }
})