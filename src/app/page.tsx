"use client";

import Image from "next/image";
import WordGrid from "./WordGrid";
import { jaro } from "./fonts";
import pokeball from "./(assets)/pokeball.png";
import Banner from "./Banner";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Pokedex from "./Pokedex";

async function getRandomPokemon() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302`
  );
  const data = await response.json();

  const filteredNames = await data.results.filter(
    (result: any) => result.name.length > 3 && result.name.length < 7
  );

  const randomId = Math.floor(Math.random() * filteredNames.length);
  const randomPokemonResponse = await fetch(filteredNames[randomId].url);

  const randomPokemonData = await randomPokemonResponse.json();

  const types: string[] =
    (await randomPokemonData.types.map(
      (typeObject: any) => typeObject.type.name
    )) || [];
  // const bannerColor = getColorForThisType({ types: await types });
  return {
    randomPokemonData: await randomPokemonData,
    types: await types,
  };
}

export const PokemonContext = createContext<{
  pokedex: string[];
  registerToPokedex: (pokemonName: string) => void;
}>({ pokedex: [], registerToPokedex: () => {} });

export default function Home() {
  const [pokedex, setPokedex] = useState<string[]>([]);

  function registerToPokedex(pokemonName: string) {
    setPokedex((prev) => [...prev, pokemonName]);
  }

  const [randomPokemonData, setRandomPokemonData] = useState<any>();
  const [types, setTypes] = useState<string[]>([]);

  function fetchPokemon() {
    const fetchData = async () => {
      const data = await getRandomPokemon();
      console.log(data.randomPokemonData);
      setRandomPokemonData(data.randomPokemonData);
      setTypes(data.types);
    };

    fetchData();
  }

  useLayoutEffect(() => {
    fetchPokemon();
  }, []);

  if (!randomPokemonData) {
    return <div>Loading</div>;
  }

  return (
    <div className="">
      <PokemonContext.Provider
        value={{
          pokedex: pokedex,
          registerToPokedex: registerToPokedex,
        }}
      >
        <div className="flex justify-center">
          <h1 className={"text-7xl " + jaro.className}>Whos that Pokemon</h1>
          <Image
            className="object-contain w-20 h-20"
            alt={"pokeball"}
            src={pokeball}
            width={1000}
            height={1000}
          ></Image>
        </div>
        <Banner
          types={types}
          pokemonImageUri={randomPokemonData?.sprites.front_default}
          pokemonName={randomPokemonData?.name}
        />
        <WordGrid
          pokemonName={randomPokemonData?.name}
          registerToPokedex={registerToPokedex}
          fetchPokemon={fetchPokemon}
        />
        <Pokedex pokedex={pokedex} />
      </PokemonContext.Provider>
    </div>
  );
}
