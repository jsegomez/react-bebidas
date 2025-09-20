import { create } from "zustand";
import { createRecipesSlice, type RecipesSliceType } from "./recipesSlice";

export const useAppStore = create<RecipesSliceType>((set, get, api) => ({
    ...createRecipesSlice(set, get, api),
}))