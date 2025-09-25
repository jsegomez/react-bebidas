import { useAppStore } from "../stores/useAppStore";
import type { DrinkResponse } from "../types"
import { Dialog, Transition } from '@headlessui/react'
import DialogDetails from "./DialogDetails";
import { Fragment, useState } from "react";

type DrinkCardProps = {
    drink: DrinkResponse
}

export default function DrinkCard({ drink } : DrinkCardProps) {     
  const { selectRecipe } = useAppStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const requestRecipeDetailsAndOpenDialog = ():void =>{
    setIsOpen(true);    
    selectRecipe(drink.idDrink);
  }

  return (
    <div className="border-gray-600 shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:scale-125 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{ drink.strDrink }</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 p-3 text-white font-bold text-lg w-full cursor-pointer"
          onClick={ requestRecipeDetailsAndOpenDialog  }
        >Ver receta</button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <DialogDetails />
        </Dialog>
      </Transition>
    </div>
  )
}
