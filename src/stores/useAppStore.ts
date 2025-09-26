import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createRecipesSlice, type RecipesSliceType } from "./recipesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";


export type AppStoreType = RecipesSliceType & FavoritesSliceType & NotificationSliceType;

export const useAppStore = create<AppStoreType>()(
    devtools(
        (
            (set, get, api) => ({
                ...createRecipesSlice(set, get, api),
                ...createFavoritesSlice(set, get, api),
                ...createNotificationSlice(set, get, api)
            })
        ), { name: 'app-store' }
    )
)