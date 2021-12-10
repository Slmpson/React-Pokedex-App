import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import PokemonImage from './PokemonImage';
import './App.css';
import Searchbar from './Searchbar';


function App() {

const [pokemonList, setPokemon] = useState([])
const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [loading, setLoading] = useState(true)
const [pokemonImage, setPokemonImage] = useState("")

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
    setPokemon(res.data.results)
    // setPokemonImage()
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

// function selectPokemon() {
  // setPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${res.data.results.url.split('').slice(34, -1).join('')}.svg`)
// }

// "https://pokeapi.co/api/v2/pokemon/1/"
// "https://pokeapi.co/api/v2/pokemon/" "1/"
  
const baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
const imageExtension = ".svg";
const onViewPokemon = (selectedPokemon) => {
  // let pokemonUrl = "";

  // pokemonUrl = selectedPokemon.url;
  // const numberFromUrl = pokemonUrl.split("pokemon/")[1];
  // const pokemonNumber = numberFromUrl.replace("/", "");

  const pokemonNumber = selectedPokemon.url.split("pokemon/")[1].replace("/", "");

  // TODO: Handle pokemonNumber > 700 here
  const pokemonImageUrl = `${baseImageUrl}${pokemonNumber}${imageExtension}`;

  setPokemonImage(pokemonImageUrl);
}


if(loading) return "Loading..."

  return (
    <>
      <main>
        <div className="pokedex">
          
            
          <div className="pokedex-left">
            <div className="background-clip-cover"></div>
            <div className="pokedex-left__top">
              
              <div className="blue-circle"></div>
              <div className="red-circle"></div>
              <div className="yellow-circle"></div>
              <div className="green-circle"></div>
            </div>

            <div className="pokedex-left__middle">
              <PokemonList pokemonList={pokemonList} onViewPokemon={onViewPokemon} />
              
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
                <PokemonImage pokemonImage={pokemonImage}/>
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

