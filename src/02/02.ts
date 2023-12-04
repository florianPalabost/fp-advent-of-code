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

type StateColorSeen = {
  [key: string]: boolean;
  red: boolean;
  green: boolean;
  blue: boolean;
};

const dataSplitted = getInputData("02/input.txt");
const QUESTION_SET: CubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

let result = 0;
const possibleGames: number[] = [];

dataSplitted.forEach((game: string) => {
  const [gameIdRaw, cubesRaw] = game.split(":");
  const gameId = parseInt(gameIdRaw.replace("Game ", ""));
  console.log(gameId);
  const cubesSet = cubesRaw.split(";");
  let match = true;

  cubesSet.forEach((cubeList: string) => {
    // if one subset don't match the game is not possible
    if (!match) {
      return;
    }

    const cubeListSplitted = cubeList.split(", ");
    let stateColorSeen: StateColorSeen = {
      red: false,
      green: false,
      blue: false,
    };

    cubeListSplitted.forEach((cube: string) => {
      if (!match) {
        return;
      }
      console.log("cube:", cube);
      const [cubeNumber, cubeColor] = cube.trim().split(" ");
      console.log("cubeNumber:", cubeNumber, "cubeColor:", cubeColor);
      // all colors already seen
      if (stateColorSeen.red && stateColorSeen.green && stateColorSeen.blue) {
        return;
      }

      // already seen current color
      if (cubeColor in stateColorSeen && stateColorSeen[cubeColor]) {
        return;
      }

      if (
        cubeColor in QUESTION_SET &&
        parseInt(cubeNumber) > QUESTION_SET[cubeColor]
      ) {
        console.log(
          `game id : ${gameId} cubeColor:${cubeColor}, cubeNumber:${cubeNumber} > ${QUESTION_SET[cubeColor]}`
        );
        match = false;
        return;
      }
      stateColorSeen[cubeColor] = true;
    });
  });

  if (match) {
    possibleGames.push(gameId);
    result += gameId;
  }
});

printAnswer(result);
console.log(possibleGames);
printAnswer(possibleGames.reduce((a, b) => a + b, 0));
