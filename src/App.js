import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import PokemonImage from './PokemonImage';
import './App.css';
import Searchbar from './Searchbar';

function App() {

const [pokemon, setPokemon] = useState([])
const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [loading, setLoading] = useState(true)

const [pokemonImage, setPokemonImage] = useState()

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

useEffect(() => {
  setLoading(true)
  let cancel;
  axios.get(currentPageUrl, {
    cancelToken: new axios.CancelToken( c => cancel = c )
  }).then(res => {
    setLoading(false)
    setNextPageUrl(res.data.next)
    setPrevPageUrl(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))
    console.log(res.data)
  })

  return () => { //clean up - cancel previous request and load new request
    cancel()
  }
}, [currentPageUrl])

function gotoNextPage() {
  setCurrentPageUrl(nextPageUrl)
}

function gotoPrevPage() {
  setCurrentPageUrl(prevPageUrl)
}


if(loading) return "Loading..."

  return (
    <>
      <main>
        <div className="pokedex">
            
          <div className="pokedex-left">
            <div className="pokedex-left__top">
              <div className="blue-circle"></div>
              <div className="red-circle"></div>
              <div className="yellow-circle"></div>
              <div className="green-circle"></div>
            </div>

            <div className="pokedex-left__middle">
              <PokemonList pokemon={pokemon} />
              
            </div>

              <div className="pokedex-left__bottom">
                <div className="pagination-container">
                  <Pagination 
                  gotoNextPage={nextPageUrl ? gotoNextPage : null}
                  gotoPrevPage={prevPageUrl ? gotoPrevPage : null}       
                  />
                </div>
              </div> 

          </div>

          <div className="pokedex-right">
            <div className="pokedex-right__top"></div>
            <div className="pokedex-right__middle">
              <div className="small-red-circle-1"></div>
              <div className="small-red-circle-2"></div>
              <div className="picture-container">
                <PokemonImage />
              </div>
              <div className="large-red-circle"></div>
              <div className="hamburger-icon-1"></div>
              <div className="hamburger-icon-2"></div>
              <div className="hamburger-icon-3"></div>
            </div>
            <div className="pokedex-right__bottom">
              <Searchbar />
              <div className="fake-buttons-container">
                <div className="black-circle"></div>
                <div className="red-rectangle"></div>
                <div className="blue-rectangle"></div>
                <div className="dpad">
                </div>
              </div>
            </div>
            
          </div>

        </div>
        
      </main>
      
    </>
  );
}

export default App;

