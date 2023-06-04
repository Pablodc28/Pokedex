import {    useContext, useEffect, useState  } from 'react';
import axios from 'axios';
import { PokemonContext } from '../../contexts/PokemonContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const PokemonGallery = () => {
                      const { pokemons, setPokemons } = useContext(PokemonContext);
                      const [searchQuery, setSearchQuery] = useState('');
                      const [detallePokemons, setdetallePokemons] = useState<Pokemon[]>([]);

                      useEffect(() => {
                      const fetchData = async () => {
                                 try {
                                            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
                                            const pokemonData = response.data.results;
                                              
                                            setPokemons(pokemonData);

                                 } catch (error) {
                                            console.error('Error fetching Pokémon data:', error);
                                 }
                      };
                      fetchData();
           }, [setPokemons]);
                      
           
           useEffect(() => {
            const fetchDetails = async () => {
              const updatedPokemons = [];
        
              for (const pokemon of pokemons) {
                try {
                  const response = await axios.get(pokemon.url);
                  const pokemonDetail = response.data;
        
                  updatedPokemons.push(pokemonDetail);
                } catch (error) {
                  console.error('Error fetching Pokémon details:', error);
                }
              }
                // console.log(updatedPokemons)
              setdetallePokemons(updatedPokemons);
            };
        
            fetchDetails();
          }, [pokemons]);

                     return (
                      
                                 <div className="container">
                                 <input
                                            type="text"                                            
                                            className='form-control text-center'
                                            placeholder="Buscar Pokémon"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            />

                        <h2>Galeria de Pokemones </h2>
                        <div className="row">
                        {detallePokemons
                                 .filter((pokemon) =>
                                 pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                                 )
                                 .map((pokemon) => {                                                                                                                                                                               
                                              const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
                                                                                                                                 

                                              return (
                                                <div key={pokemon.name} className="col-sm-6 col-md-4 ">
                                                  <div className="card my-1">
                                                    <img
                                                      src={pokemonImageUrl}
                                                      className="card-img-top"
                                                      alt={pokemon.name}
                                                    />
                                                    <div className="card-body">
                                                      <h4 className="card-title">{pokemon.name}</h4>
                                                      <p className="card-text"><span className="badge bg-info">Weight: {pokemon.weight} </span> </p>
                                                      <p className="card-text">
                                                        Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
                                                      </p>                                                      
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                            </div>
                                          </div>
                                        );
                                      };
                                      
                                      export default PokemonGallery;
                                      
                                      interface Pokemon {
                                        name: string;
                                        id: number;
                                        weight: number;
                                        abilities: { ability: { name: string } }[];
                                      }
                                      