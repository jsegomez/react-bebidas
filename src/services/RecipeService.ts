import axios from "axios";
import { CategoriesAPIResponseSchema, SearchRecipeSchema, DrinksAPIResponseSchema } from "../schemas/recipes-schema";
import type { Categories, DrinkResponse, SearchRecipe } from "../types";

export async function getCategories():Promise<Categories> {
    try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const { data } = await axios.get(url);    
        const isValidResponse = CategoriesAPIResponseSchema.safeParse(data);
    
        if (!isValidResponse.success) throw new Error('Invalid response from API');
        return isValidResponse.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   

export async function getRecipes(filter: SearchRecipe):Promise<DrinkResponse[]> {
    const isValidData = SearchRecipeSchema.safeParse(filter);
    if(isValidData.error) throw new Error('Filtros invalidos');

    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}}`
        const { data } = await axios.get(url);

        const isValidResponse = DrinksAPIResponseSchema.safeParse(data);
        if(!isValidResponse.success) throw new Error('Invalid response from API');

        return isValidResponse.data.drinks
    } catch (error) {   
        console.log(error);
        throw error;
    }
}

//www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007