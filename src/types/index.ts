import type z from "zod";
import type { CategoriesAPIResponseSchema, SearchRecipeSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchRecipe = z.infer<typeof SearchRecipeSchema>;