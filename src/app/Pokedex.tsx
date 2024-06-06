function Pokedex({ pokedex }: { pokedex: string[] }) {
  return (
    <div>
      Pokedex
      <pre>{JSON.stringify(pokedex, null, 4)}</pre>
    </div>
  );
}

export default Pokedex;
