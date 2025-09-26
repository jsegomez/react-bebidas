import type { StateCreator } from "zustand"
import type { RecipeDetails } from "../types"

export type FavoritesSliceType = {
    favorites: RecipeDetails[],
    addOrRemoveFavorite: (favorite: RecipeDetails, isFavorite: boolean) => void
}

const getFavoritesFromLocalStorage = (): RecipeDetails[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: getFavoritesFromLocalStorage(),
    addOrRemoveFavorite: (favorite: RecipeDetails, isFavorite: boolean) => {
        const { favorites } = get();

        if(isFavorite) {
            const newFavorites = favorites.filter(f => f.idDrink !== favorite.idDrink);
            set({ favorites: newFavorites });           
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            const newFavorites = [...favorites, favorite];
            set({ favorites: newFavorites });
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }        
    }
})  