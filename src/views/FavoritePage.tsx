import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritePage() {
  const { favorites } = useAppStore();

  return (
    <div className="w-2/3 m-auto">
      <h1 className="text-6xl font-extrabold">FavoritePage { favorites.length }</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 my-5 gap-5">
        {
          favorites.map( (recipe) => (
            <DrinkCard key={recipe.idDrink} drink={recipe} />
          ))
        }
      </div>
    </div>
    
  )
}
