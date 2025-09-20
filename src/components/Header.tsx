import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo( () => pathname === '/',[pathname]);
  const { fetchCategories } =useAppStore();

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
                 </nav>
            </div>

            {
              isHome && (
                <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
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
                    />
                  </div>


                  <div className="space-y-4">
                    <label
                      htmlFor="ingredient"
                      className="block text-white uppercase font-extrabold text-lg"
                    >Nombre o ingredientes</label>

                    <select                      
                      id="ingredient"
                      name="ingredient"
                      className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    >
                      <option>Seleccionar...</option>
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
