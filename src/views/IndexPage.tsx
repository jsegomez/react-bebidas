import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {
  const { drinks } = useAppStore();
  const hasDrinks:boolean = useMemo( ()=> drinks.length > 0, [drinks])
  console.log(hasDrinks)

  return (
    <div className="w-2/3 m-auto">
      <h1 className="text-6xl font-extrabold text-center">Recetas</h1>

      {
        hasDrinks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-5 gap-5">
            {
              drinks.map( drink => (
                <DrinkCard
                  key={drink.idDrink}
                  drink={drink}
                />
              ) )
            }
          </div>
        ) : (
          <p className="my-10 text-center text-2xl">No hay resultados aún, utiliza el formulario pra buscar recetas...</p>
        )
      }
    </div>
  )
}
