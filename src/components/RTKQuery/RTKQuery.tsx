import React, { useState } from "react";
import { pokemonApi } from "../../services/pokemonApi";
import Select from "../ComponentLibrary/Select";
import Spinner from "../ComponentLibrary/Spinner";
import startCase from "lodash/startCase";
import { api } from "../../services/api";
import { Item } from "../../services/types";

const RTKQuery: React.FC = () => {
  const { data: helloWorld, isError: apiGatewayIsDown } = api.useIndexQuery({});
  const { data: itemsData } = api.useGetItemsQuery({});

  const [pokemonName, setPokemonName] = useState("bulbasaur");
  const { data: firstGenerationPokemon } = pokemonApi.useIndexPokemonQuery({
    limit: 151,
    offset: 0,
  });
  const { data: pokemon, isFetching } =
    pokemonApi.useGetPokemonByNameQuery(pokemonName);

  const items = (itemsData?.items || []) as Item[];

  if (!firstGenerationPokemon) return <Spinner />;

  return (
    <div>
      <h1 className="text-lg font-bold">RTKQuery</h1>
      {apiGatewayIsDown ? (
        <p>
          To start API Gateway run: <code>cd aws && yarn start-api</code>
        </p>
      ) : (
        <>
          <p>Response from API Gateway: {helloWorld?.message}</p>
          <p>
            Items from API Gateway: {items.map((item) => item.name).join(", ")}
          </p>
        </>
      )}
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
          <div>
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
          </div>
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
