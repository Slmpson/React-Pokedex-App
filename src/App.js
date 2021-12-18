import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import PokemonImage from './PokemonImage';
import './App.css';
// import Searchbar from './Searchbar';


function App() {

const [pokemonList, setPokemonList] = useState([])
const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [loading, setLoading] = useState(true)
const [pokemonImage, setPokemonImage] = useState("")
const [searchPokemon, setSearchPokemon] = useState("")
const [pokemonNum, setPokemonNum] = useState("")
const [pokemonName, setPokemonName] = useState("")


const search = async () => {
  try{
    const url = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;
    const res = await axios.get(url);
    setPokemonNum(res.data.id);
    setPokemonName(res.data.name);
    setPokemonImage(res.data.sprites.other.dream_world.front_default);
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

const baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
const imageExtension = ".svg";

const onViewPokemon = (selectedPokemon) => {
  
  const pokemonNumber = selectedPokemon.url.split("pokemon/")[1].replace("/", "");
  const pokemonImageUrl = `${baseImageUrl}${pokemonNumber}${imageExtension}`;

  setPokemonName()
  setPokemonNum(pokemonNumber);
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
                <PokemonImage pokemonImage={pokemonImage} pokemonNum={pokemonNum} pokemonName={pokemonName}/>
              </div>
              <div className="large-red-circle"></div>
              <div className="hamburger-icon-1"></div>
              <div className="hamburger-icon-2"></div>
              <div className="hamburger-icon-3"></div>
            </div>
            <div className="pokedex-right__bottom">
              <div className="searchbar">
                  <form onSubmit={handleSubmit}>
                      <label>
                        <input type="text" onChange={handleChange} placeholder="Search a pokemon" /> 
                      </label>
                  </form>
              </div>
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

