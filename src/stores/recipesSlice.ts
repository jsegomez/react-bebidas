import type { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipeDetails } from "../services/RecipeService";
import type { Categories, DrinkResponse, RecipeDetails, SearchRecipe } from "../types";

export type  RecipesSliceType = {
    categories: Categories,
    fetchCategories: () => Promise<void>;
    searchRecipes: (recipe: SearchRecipe) => Promise<void>,
    drinks: DrinkResponse[],
    selectRecipe: (idRecipe: string) => Promise<void>;
    recipeDetails: RecipeDetails | null;
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: { drinks: [] },
    drinks: [],
    recipeDetails: null,
    fetchCategories: async ():Promise<void> => {
        const categories = await getCategories();
        set({ categories });
    },
    searchRecipes: async(recipe: SearchRecipe):Promise<void> => {
        const drinks = await getRecipes(recipe);
        set({ drinks })
    },    
    selectRecipe: async(idRecipe: string):Promise<void> =>{
        set({ recipeDetails: null });
        const recipeDetails = await getRecipeDetails(idRecipe);
        set({ recipeDetails: recipeDetails[0] });
    }
});