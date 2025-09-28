import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Components
import GenerateAI from './views/GenerateIA'
import IndexPage from './views/IndexPage'
import Layout from './layouts/Layout'
import Loading from './components/Loading/Loading'

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