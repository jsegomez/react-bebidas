import type z from "zod";
import type { CategoriesAPIResponseSchema, SearchRecipeSchema, DrinkAPIResponseSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchRecipe = z.infer<typeof SearchRecipeSchema>;
export type DrinkResponse = z.infer<typeof DrinkAPIResponseSchema>;