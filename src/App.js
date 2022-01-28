import React, {useState, useEffect, useCallback} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import PokemonImage from './PokemonImage';
import './App.css';
import Searchbar from './Searchbar';
import PokemonType from './PokemonType';

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
const [searching, setSearching] = useState(false);
const [pokemon, setPokemon] = useState()
const [searchPokemon, setSearchPokemon] = useState("")
const [currentScreen, setCurrentScreen] = useState(1)
const [pokemonType, setPokemonType] = useState([])


  const search = useCallback(async () => {
    console.log("search useCallback");
    if (searching) {
      console.log("searching pokemon in search useCallback");
  try{
    const url = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;
    const res = await axios.get(url);

    setPokemon(new PokemonData(res.data.name, res.data.id, res.data.sprites.other["official-artwork"].front_default));
    const responseTypeData = res.data.types;
    const typeData = [];

    responseTypeData.forEach(data => {
      switch (data.type.name) {
        case "bug":
          typeData.push({name: data.type.name, colour: "#1c4c24", imagePath: "/images/bug.png"});
          break;
        case "dark":
          typeData.push({name: data.type.name, colour: "#040404", imagePath: "/images/dark.png"});
          break;
        case "dragon":
          typeData.push({name: data.type.name, colour: "#448c94", imagePath: "/images/dragon.png"});
          break;
        case "electric":
          typeData.push({name: data.type.name, colour: "#e3e32c", imagePath: "/images/electric.png"});
          break;
        case "fairy":
          typeData.push({name: data.type.name, colour: "#941c44", imagePath: "/images/fairy.png"});
          break;
        case "fighting":
          typeData.push({name: data.type.name, colour: "#9c3c24", imagePath: "/images/fighting.png"});
          break;
        case "fire":
          typeData.push({name: data.type.name, colour: "#ac1d24", imagePath: "/images/fire.png"});
          break;
        case "flying":
          typeData.push({name: data.type.name, colour: "#4c647c", imagePath: "/images/flying.png"});
          break;
        case "ghost":
          typeData.push({name: data.type.name, colour: "#34346c", imagePath: "/images/ghost.png"});
          break;
        case "grass":
          typeData.push({name: data.type.name, colour: "#147c3c", imagePath: "/images/grass.png"});
          break;
        case "ground":
          typeData.push({name: data.type.name, colour: "#ab732c", imagePath: "/images/ground.png"});
          break;
        case "ice":
          typeData.push({name: data.type.name, colour: "#84d4f4", imagePath: "/images/ice.png"});
          break;
        case "normal":
          typeData.push({name: data.type.name, colour: "##74545c", imagePath: "/images/normal.png"});
          break;
        case "poison":
          typeData.push({name: data.type.name, colour: "#5c2c8c", imagePath: "/images/poison.png"});
          break;
        case "psychic":
          typeData.push({name: data.type.name, colour: "#a42c6c", imagePath: "/images/psychic.png"});
          break;
        case "rock":
          typeData.push({name: data.type.name, colour: "#4b140c", imagePath: "/images/rock.png"});
          break;
        case "steel":
          typeData.push({name: data.type.name, colour: "#64746c", imagePath: "/images/steel.png"});
          break;
        case "water":
          typeData.push({name: data.type.name, colour: "#1454e3", imagePath: "/images/water.png"});
          break;    
        default:
          break;
      }
    });
    setPokemonType(typeData);
    
    // setPokemonType(res.data.types)
    console.log(res);
    setSearching(false);
  
  } catch (e)
  {

      }
    }
}, [searching, searchPokemon]);

const handleChange = (e) => {
  setSearchPokemon(e.target.value.toLowerCase())
}

const handleSubmit = (e) => {
  e.preventDefault();
  setSearching(true);
}

useEffect(() => {
    search();
}, [search]);

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

const pageUp = () => setCurrentScreen(1);
const pageDown = () => setCurrentScreen(2);

const baseImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const imageExtension = ".png";

const onViewPokemon = (selectedPokemon) => {
  console.log(selectedPokemon)
  
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
                {pokemon && (currentScreen === 1 ? <PokemonImage pokemonImage={pokemon.image} pokemonNum={pokemon.number} pokemonName={pokemon.name}/> : 
                  currentScreen === 2 ? <PokemonType pokemonType={pokemonType} pokemonNum={pokemon.number} pokemonName={pokemon.name} /> : "" )}
                

                
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
                <button className='dpad-top' onClick={pageUp}></button>
                <button className='dpad-bottom' onClick={pageDown}></button>
              </div>
            </div>
            
          </div>

        </div>
        
      </main>
      
    </>
  );
}

export default App;

