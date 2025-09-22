import type { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService";
import type { Categories, DrinkResponse, SearchRecipe } from "../types";

export type  RecipesSliceType = {
    categories: Categories,
    fetchCategories: () => Promise<void>;
    searchRecipes: (recipe: SearchRecipe) => Promise<void>,
    drinks: DrinkResponse[]
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: { drinks: [] },
    fetchCategories: async ():Promise<void> => {
        const categories = await getCategories();
        set({ categories });
    },
    searchRecipes: async(recipe: SearchRecipe):Promise<void> => {
        const drinks = await getRecipes(recipe);
        set({ drinks })
    },
    drinks: []
});