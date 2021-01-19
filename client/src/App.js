import './App.css';
import { ApolloProvider } from "@apollo/client"


import MainPage from "./pages/mainPage"
import MoviePage from "./pages/moviePage"
import SeriesPage from "./pages/seriesPage"
import AddMovie from "./pages/addMovie"
import Detail from "./pages/detail"
import EditPage from "./pages/editForm"
import Favorites from "./pages/favorite"


import Navbar from "./components/navbar"
import  client  from "./config/graphql"
import { BrowserRouter, Switch,Route } from "react-router-dom";


function App() {
  return (
    <ApolloProvider client = {client}>
      <BrowserRouter>
        <Navbar></Navbar>

        <Switch>
          <Route exact path="/">
            <div className="App">
                <MainPage></MainPage>
            </div>
          </Route>

          <Route exact path="/movie">
              <MoviePage></MoviePage>
          </Route>

          <Route exact path="/movie/:movieId">
              <Detail></Detail>
          </Route>

          <Route exact path="/movie/edit/:movieId">
              <EditPage></EditPage>
          </Route>
          <Route exact path="/series">
              <SeriesPage></SeriesPage>
          </Route> 

          <Route exact path="/addMOvie">
              <AddMovie></AddMovie>
          </Route> 

          <Route exact path="/favorite">
              <Favorites></Favorites>
          </Route> 
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
