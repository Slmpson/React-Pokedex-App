import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import PokemonImage from './PokemonImage';
import './App.css';
import Searchbar from './Searchbar';

class PokemonData{
  name;
  number;
  image;


  constructor(name, number, image, test=null){
    this.name = name;
    this.number = number;
    this.image = image;
  }
}

function App() {

const [pokemonList, setPokemonList] = useState([])
const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [loading, setLoading] = useState(true)
const [pokemon, setPokemon] = useState()
const [searchPokemon, setSearchPokemon] = useState("")
const [currentScreen, setCurrentScreen] = useState(1)

const search = async () => {
  try{
    const url = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;
    const res = await axios.get(url);

    setPokemon(new PokemonData(res.data.name, res.data.id, res.data.sprites.other["official-artwork"].front_default));
    console.log(res);
  } catch (e)
{
  console.log(e);
}};

const handleChange = (e) => {
  setSearchPokemon(e.target.value.toLowerCase())
}

const handleSubmit = (e) => {
  e.preventDefault();
  search();
}

useEffect(() => {
  setLoading(true)
  let cancel;
  axios.get(currentPageUrl, {
    cancelToken: new axios.CancelToken( c => cancel = c )
  }).then(res => {
    setLoading(false)
    setNextPageUrl(res.data.next)
    setPrevPageUrl(res.data.previous)
    setPokemonList(res.data.results)
    console.log(res.data)
  })

  return () => { //clean up - cancel previous request and load new request
    cancel()
  }
}, [currentPageUrl])

const gotoNextPage = () => setCurrentPageUrl(nextPageUrl);
const gotoPrevPage = () => setCurrentPageUrl(prevPageUrl);

const baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const imageExtension = ".png";

const onViewPokemon = (selectedPokemon) => {
  
  const pokemonNumber = selectedPokemon.url.split("pokemon/")[1].replace("/", "");
  const pokemonImageUrl = `${baseImageUrl}${pokemonNumber}${imageExtension}`;
  const viewedPokemonName = selectedPokemon.name;

  setPokemon(new PokemonData(viewedPokemonName, pokemonNumber, pokemonImageUrl));

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
                {pokemon && (currentScreen === 0 ? "Show stats screen" : setCurrentScreen ? <PokemonImage pokemonImage={pokemon.image} pokemonNum={pokemon.number} pokemonName={pokemon.name}/> : "show summin")}
              </div>
              <div className="large-red-circle"></div>
              <div className="hamburger-icon-1"></div>
              <div className="hamburger-icon-2"></div>
              <div className="hamburger-icon-3"></div>
            </div>
            <div className="pokedex-right__bottom">
              <Searchbar handleChange={handleChange} handleSubmit={handleSubmit}/>
              <div className="fake-buttons-container">
                <div className="black-circle"></div>
                <div className="red-rectangle"></div>
                <div className="blue-rectangle"></div>
                <div className="dpad-center"></div>
                <button className='dpad-left'></button>
                <button className='dpad-right'></button>
                <button className='dpad-top'></button>
                <button className='dpad-bottom'></button>
              </div>
            </div>
            
          </div>

        </div>
        
      </main>
      
    </>
  );
}

export default App;

