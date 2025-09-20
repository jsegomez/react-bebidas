import axios from "axios";
import { CategoriesAPIResponseSchema } from "../schemas/recipes-schema";
import type { Categories } from "../types";

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