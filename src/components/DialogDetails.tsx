import { DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { Fragment, type Dispatch, type SetStateAction } from 'react'
import { useAppStore } from '../stores/useAppStore';
import Loading from './Loading/Loading';

type DialogDetailsProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}


export default function DialogDetails({ setIsOpen }: DialogDetailsProps) {
    const { recipeDetails } = useAppStore();
    const { addOrRemoveFavorite, favorites } = useAppStore();

    const isFavorite = favorites.some(favorite => favorite.idDrink === recipeDetails?.idDrink);

    const renderIngredients = () => {        
        if(!recipeDetails) return null;
        const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6 } = recipeDetails;
        const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6 } = recipeDetails;
        
        const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6];
        const measures = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6];

        return ingredients.map((ingredient, index) => {
            if(!ingredient) return null;
            return (
                <li key={index} className='text-lg font-normal'>
                    {ingredient} { measures[index] ? `- ${measures[index]}` : ''}
                </li>
            )
        });
    };

    return (
        <>
            <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-70" />
            </TransitionChild>


            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            {
                                !recipeDetails ? (<Loading />) : (
                                    <>
                                        <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                            {recipeDetails.strDrink}
                                        </DialogTitle>

                                        <img
                                            src={recipeDetails.strDrinkThumb}
                                            alt={recipeDetails.strDrink}
                                            className='mx-auto w-80'
                                        />

                                        <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                            Ingredientes y Cantidades
                                        </DialogTitle>

                                        <ul className="list-disc list-inside">
                                            { renderIngredients() }
                                        </ul>

                                        <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                            Instrucciones
                                        </DialogTitle>

                                        <p className='text-lg'>{recipeDetails.strInstructions}</p>

                                        <div className='mt-5 flex justify-between gap-4'>
                                            <button
                                                type='button'
                                                className='w-full rounded bg-orange-600 p-3 font-bold text-white shadow-lg hover:bg-orange-700 cursor-pointer'
                                                onClick={() => addOrRemoveFavorite(recipeDetails, isFavorite) }
                                            > { isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos' }</button>

                                            <button
                                                type='button'
                                                className='w-full rounded bg-gray-600 p-3 font-bold text-white shadow-lg hover:bg-grey-700 cursor-pointer'
                                                onClick={() => setIsOpen(false)}
                                            >Cerrar</button>
                                        </div>
                                    </>
                                )
                            }
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </>

    )
}
