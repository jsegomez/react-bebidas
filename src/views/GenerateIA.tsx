import { useState, type FormEvent } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
  const recipeDetails = useAppStore((state) => state.recipe);
  const isGenerating = useAppStore((state) => state.isGenerating);
  const { setNotification, generateRecipeIA } = useAppStore();
  const [lastPrompt, setLastPrompt] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get('prompt')?.toString().trim();

    if (!prompt) return openNotification();
    setLastPrompt(prompt);
    generateRecipeIA(prompt);
    event.currentTarget.reset();
  }

  const openNotification = () => {
    setNotification({
      error: true,
      message: 'El prompt es requerido',
      show: true,
      duration: 3000
    });
  }

  return (
    <>
      <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={ handleSubmit }
          className='flex flex-col space-y-3 py-10'
        >
          <div className="relative">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
              autoComplete="off"
              disabled={ isGenerating }
            />
            <button
              type="submit"
              disabled={ isGenerating }
              aria-label="Enviar"
              className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${ isGenerating ? 'text-gray-400' : 'text-gray-800 hover:text-black' }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="whitespace-pre-wrap">
          <p>{ lastPrompt }:</p> 
        </div>

        <div className="py-10 whitespace-pre-wrap">
          <p>{ recipeDetails }</p> 
        </div>
      </div>

    </>
  )
}