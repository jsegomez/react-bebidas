import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createRecipesSlice, type RecipesSliceType } from "./recipesSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";


export type AppStoreType = RecipesSliceType & FavoritesSliceType;

export const useAppStore = create<AppStoreType>()(
    devtools(
        (
            (set, get, api) => ({
                ...createRecipesSlice(set, get, api),
                ...createFavoritesSlice(set, get, api)
            })
        ), { name: 'app-store' }
    )
)