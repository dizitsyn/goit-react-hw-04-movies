import React, {Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
// import MoviesPage from './pages/MoviesPage';
import routes from '../routes'
import AppBar from './AppBar/AppBar';

const HomePage = lazy(() => import('./pages/HomePage'    /* webpackChunkName: 'home-page' */));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage' /* webpackChunkName: 'movie-details-page' */));
const MoviesPage = lazy(() => import('./pages/MoviesPage' /* webpackChunkName: 'movies-page' */));




const App = () => {
    return (
        <>
            <AppBar />
            <Suspense fallback={ <h1>Loading...</h1>}>
            <Switch>
                <Route exact path={routes.home } component={HomePage} />
                <Route exact path={routes.movies } component={MoviesPage} />
                <Route path={routes.movieDetails} component={MovieDetailsPage }/>
                
                <Route component={HomePage}/>
                </Switch>
                </Suspense>
        </>
        
    );
}

export default App;