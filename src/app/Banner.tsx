"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { getColorForThisType } from "./(color-helper)/colorHelper";
import Image from "next/image";

function Banner({
  types,
  pokemonImageUri,
  pokemonName,
}: {
  types: string[];
  pokemonName: string;
  pokemonImageUri: string;
}) {
  const bannerColor = getColorForThisType({ types: types });

  const [toggle, setToggle] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setToggle(true);
  //   }, 200);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <div className="relative flex justify-center">
      <div
        className={
          bannerColor +
          ` h-[20vh] w-[100vw] absolute top-0  ${
            toggle ? "-left-0" : "-left-[100vw]"
          } duration-200 transition-all `
        }
      ></div>
      <Image
        className="object-contain w-44 h-44 contrast-0 brightness-0"
        alt={pokemonName}
        src={pokemonImageUri}
        width={1000}
        height={1000}
      ></Image>
    </div>
  );
}

export default Banner;
