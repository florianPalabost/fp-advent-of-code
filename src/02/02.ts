/**
 * Advent of Code - Day 2
 * https://adventofcode.com/2023/day/2
 */

import { getInputData, printAnswer } from "../utils";

interface CubeSet {
  [key: string]: number; // Add an index signature that allows string indexing
  red: number;
  green: number;
  blue: number;
}

const dataSplitted = getInputData("02/input.txt");
const QUESTION_SET: CubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

let result = 0;

dataSplitted.forEach((game: string) => {
  const [gameIdRaw, cubesRaw] = game.split(":");
  const gameId = parseInt(gameIdRaw.replace("Game ", ""));

  const cubesSet = cubesRaw.split(";");
  let match = true;

  cubesSet.forEach((cubeList: string) => {
    if (!match) {
      return;
    }

    const cubeListSplitted = cubeList.split(", ");

    cubeListSplitted.forEach((cube: string) => {
      const [cubeNumber, cubeColor] = cube.split(" ");

      if (
        cubeColor in QUESTION_SET &&
        parseInt(cubeNumber) > QUESTION_SET[cubeColor]
      ) {
        console.log(
          `game id : ${gameId} cubeColor:${cubeColor}, cubeNumber:${cubeNumber} > ${QUESTION_SET[cubeColor]}`
        );
        match = false;
      }
    });
  });

  if (match) {
    result += gameId;
  }
});

printAnswer(result);
