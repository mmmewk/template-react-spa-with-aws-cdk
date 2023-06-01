import React, { useState } from "react";
import { pokemonApi } from "../../services/pokemonApi";
import Select from "../ComponentLibrary/Select";
import Spinner from "../ComponentLibrary/Spinner";

const RTKQuery: React.FC = () => {
  const [pokemonName, setPokemonName] = useState("bulbasaur");
  const { data: firstGenerationPokemon } = pokemonApi.useIndexPokemonQuery({
    limit: 151,
    offset: 0,
  });
  const { data: pokemon, isFetching } =
    pokemonApi.useGetPokemonByNameQuery(pokemonName);

  if (!firstGenerationPokemon) return <Spinner />;

  return (
    <div>
      <h1 className="text-lg font-bold">RTKQuery</h1>
      <Select
        label="Select a Pokemon"
        value={{ name: pokemonName }}
        setValue={(pokemon) => setPokemonName(pokemon.name)}
        options={firstGenerationPokemon.results}
        optionLabel={(option) => option.name}
      />

      <p>Data from pokemon API:</p>
      {pokemon && !isFetching ? (
        <>
          <p>Name: {pokemon.name}</p>
          <p>height: {pokemon.height}</p>
          <p>weight: {pokemon.weight}</p>
        </>
      ) : (
        <Spinner />
      )}
      <p>
        Read More about Redux Toolkit Query{" "}
        <a
          href="https://redux-toolkit.js.org/tutorials/rtk-query"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </p>
    </div>
  );
};
export default RTKQuery;
