import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createRecipesSlice, type RecipesSliceType } from "./recipesSlice";

export const useAppStore = create<RecipesSliceType>()(
    devtools(
        (
            (set, get, api) => ({...createRecipesSlice(set, get, api),})
        )
    )
)