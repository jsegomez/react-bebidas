import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import type { SearchRecipe } from "../types";

export default function Header() {
  const { pathname } = useLocation();  
  const [searchFilter, setSearchFilter] = useState<SearchRecipe>({
    ingredient: '',
    category: ''
  });
  const { fetchCategories, categories, searchRecipes, setNotification } =useAppStore();

  const isHome = useMemo(() => pathname === '/',[pathname]);

  const updateFormValues = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>):void => {
    setSearchFilter({
      ...searchFilter!,
      [event.target.id]: event.target.value
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>):void =>{
    event.preventDefault();

    if(!searchFilter || Object.values(searchFilter).includes('')) {
      setNotification({
        message: 'Todos los campos son obligatorios',
        error: true,
        show: true,
      });

      return;
    }

    searchRecipes(searchFilter);
  }

  useEffect( () => {
    fetchCategories();
  }, [fetchCategories]);  

  return (
    <header className={ `${isHome ? 'bg-[url(/bg.jpg)]' : 'bg-slate-800'} bg-cover bg-center bg-no-repeat` }>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                 <div>
                    <img className="w-32 " src="/logo.svg" alt="logo" />
                 </div>

                 <nav className="flex gap-4">
                    <NavLink
                      to='/'
                      className={({isActive})=> isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                      Home
                    </NavLink>

                    <NavLink
                      to='/favoritos'
                      className={({isActive})=> isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                      Ir a favoritos
                    </NavLink>

                    <NavLink
                      to='/ia-generate'
                      className={({isActive})=> isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                      Generación IA
                    </NavLink>
                 </nav>
            </div>

            {
              isHome && (
                <form
                  className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                  onSubmit={ handleSubmit }
                >
                  <div className="space-y-4">
                    <label
                      htmlFor="ingredient"
                      className="block text-white uppercase font-extrabold text-lg"
                    >Nombre o ingredientes</label>

                    <input
                      type="text"
                      id="ingredient"
                      name="ingredient"
                      className="p-3 w-full rounded-lg focus:outline-none bg-white"
                      placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"   
                      value={searchFilter.ingredient}                                            
                      onChange={ updateFormValues }                   
                    />
                  </div>


                  <div className="space-y-4">
                    <label
                      htmlFor="category"
                      className="block text-white uppercase font-extrabold text-lg"
                    >Nombre o ingredientes</label>

                    <select                      
                      id="category"
                      name="category"
                      className="p-3 w-full rounded-lg focus:outline-none bg-white"
                      onChange={ updateFormValues }
                    >
                      <option>Seleccionar...</option>
                      {
                        categories.drinks.map((category) => (
                          <option
                            value={category.strCategory}
                            key={category.strCategory}
                          >{ category.strCategory }</option>
                        ))
                      }
                    </select>

                    <input
                      type="submit"
                      value="Buscar recetas"
                      className="w-full bg-orange-800 py-2 rounded-lg cursor-pointer hover:bg-orange-900 font-bold text-white"
                    />
                  </div>
                </form>

              )
            }
        </div>
    </header>
  )
}
