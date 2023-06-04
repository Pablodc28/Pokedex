/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode } from 'react';

interface Pokemon {
  name: string;
  image: string;
  weight: number;
  abilities: string[];
  url : string;
}

interface PokemonContextProps {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const PokemonContext = createContext<PokemonContextProps>({
  pokemons: [],
  setPokemons: () => {},
});

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};
