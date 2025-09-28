import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import IndexPage from './views/IndexPage'
import Layout from './layouts/Layout'
import { lazy, Suspense } from 'react'
import Loading from './components/Loading/Loading'
import GenerateAI from './views/GenerateIA'

const FavoritePageLazy = lazy(() => import('./views/FavoritePage'))

export const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <Layout/> }>
                    <Route path='/' element={ <IndexPage /> } />
                    <Route path='/ia-generate' element={ <GenerateAI /> } />
                    <Route path='/favoritos' element={ 
                        <Suspense fallback={ <Loading /> }>
                            <FavoritePageLazy />
                        </Suspense>
                     } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}