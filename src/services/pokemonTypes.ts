export type Stat = {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  stats: Stat[];
};
