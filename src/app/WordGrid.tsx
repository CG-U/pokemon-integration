"use client";

import { useEffect, useLayoutEffect, useState } from "react";

function WordGrid({
  pokemonName,
  registerToPokedex,
  fetchPokemon,
}: {
  pokemonName: string;
  registerToPokedex: (pokemonName: string) => void;
  fetchPokemon: () => void;
}) {
  const wordLength = pokemonName?.length;
  let blankAnswerArray = new Array(wordLength).fill("");

  const [guessArray, setGuessArray] = useState<string[]>(blankAnswerArray);
  const [recordedAnswers, setRecordedAnswers] = useState<string[][]>();

  const guessCorrectModal = document.getElementById(
    "guessCorrectModal"
  ) as HTMLDialogElement;

  async function recordAnswer(answer: string[]) {
    if (guessArray.join("") === pokemonName) {
      guessCorrectModal.showModal();
      registerToPokedex(pokemonName);
    } else
      await setRecordedAnswers((prev) => {
        if (prev) return [...prev, answer];
        else return [answer];
      });
    clearGuessAnswer();
  }

  function clearRecordedAnswers() {
    setRecordedAnswers([]);
  }

  function clearGuessAnswer() {
    setGuessArray(blankAnswerArray);
  }

  // When refetching new pokemon name
  useLayoutEffect(() => {
    clearRecordedAnswers();
    setGuessArray(blankAnswerArray);
  }, [pokemonName, wordLength]);

  function focusOnNextGrid(index: number) {
    const grid: HTMLInputElement = document.getElementById(
      `letter-number-${index + 1}`
    ) as HTMLInputElement;
    grid?.focus();
  }

  function focusOnPreviousGrid(index: number) {
    const grid: HTMLInputElement = document.getElementById(
      `letter-number-${index - 1}`
    ) as HTMLInputElement;
    grid?.focus();
  }

  function handleGuessChange(indexToChange: number, inputValue: string) {
    // Create a copy of guessArray
    let tempArray = [...guessArray];
    // Update the copy
    tempArray[indexToChange] = inputValue;
    // Set the state with the updated copy
    setGuessArray((prev) => tempArray);

    if (indexToChange + 1 !== wordLength && inputValue !== "") {
      focusOnNextGrid(indexToChange);
    }
    if (indexToChange !== 0 && inputValue === "") {
      focusOnPreviousGrid(indexToChange);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-10 ">
      <dialog id="guessCorrectModal" className="modal">
        <div className="modal-box ">
          <section className="text-center">
            <h1 className="text-3xl font-black">You answer is Correct!</h1>
            <p className="text-xl">
              this pokemon is{" "}
              <span className="text-primary">
                {pokemonName.toLocaleUpperCase()}
              </span>
            </p>
          </section>

          <button
            className="btn"
            onClick={() => {
              fetchPokemon();
              guessCorrectModal.close();
              clearRecordedAnswers();
            }}
          >
            Try another pokemon!
          </button>
        </div>
      </dialog>

      {recordedAnswers?.map((answer, index) => {
        return (
          <div key={index} className="flex w-full justify-center space-x-4">
            {answer.map((letter, index) => {
              return (
                <div
                  key={index}
                  className={`text-center border-2 border-black w-11 h-11 flex items-center justify-center ${
                    letter === pokemonName.charAt(index)
                      ? "bg-green-400 text-primary-content"
                      : pokemonName.includes(letter)
                      ? "bg-yellow-400 text-primary-content"
                      : "bg-red-400 text-primary-content"
                  }`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="flex justify-center w-full space-x-4">
        {guessArray.map((boxContent: string, index: number) => {
          return (
            <div key={index}>
              <input
                id={`letter-number-${index}`}
                type="text"
                className="text-center border-2 border-black w-11 h-11 focus:border-4 focus:outline-none "
                maxLength={1}
                value={guessArray[index]}
                autoComplete="off"
                onInput={(e) => {
                  handleGuessChange(index, e.currentTarget.value);
                }}
                onFocus={(e) => {
                  e.target.setSelectionRange(0, 1);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" && index > 0) {
                    e.preventDefault(); // Prevent default arrow key behavior
                    focusOnPreviousGrid(index);
                  }
                  if (e.key === "ArrowRight" && index < wordLength - 1) {
                    e.preventDefault(); // Prevent default arrow key behavior
                    focusOnNextGrid(index);
                  }
                  if (
                    e.key === "Enter" &&
                    guessArray.join("").length === wordLength
                  ) {
                    recordAnswer(guessArray);
                  }
                }}
              ></input>
            </div>
          );
        })}
      </div>

      <div className="space-x-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!guessArray.some((letter) => letter === ""))
              recordAnswer(guessArray);
          }}
          className="btn hover:text-accent hover:border-accent"
        >
          CHECK ANSWER
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchPokemon();
          }}
          className="btn hover:text-accent hover:border-accent"
        >
          SKIP
        </button>
      </div>
    </div>
  );
}

export default WordGrid;
