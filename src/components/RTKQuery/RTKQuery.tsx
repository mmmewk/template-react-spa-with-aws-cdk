import React, { useState } from "react";
import { pokemonApi } from "../../services/pokemonApi";
import Select from "../ComponentLibrary/Select";
import Spinner from "../ComponentLibrary/Spinner";
import startCase from "lodash/startCase";

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
        optionLabel={(option) => startCase(option.name)}
      />

      <p>Data from pokemon API:</p>
      {pokemon && !isFetching ? (
        <>
          <p>
            <b>Pokedex Number:</b> {pokemon.id}
          </p>
          <p>
            <b>Name:</b> {startCase(pokemon.name)}
          </p>
          <p>
            <b>height:</b> {pokemon.height}
          </p>
          <p>
            <b>weight:</b> {pokemon.weight}
          </p>
          <p>
            <b>stats:</b>
            <ul>
              {pokemon.stats.map((stat) => {
                return (
                  <li key={stat.stat.name} className="ml-2">
                    {stat.stat.name}: {stat.baseStat}
                  </li>
                );
              })}
            </ul>
          </p>
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
