/**
 * Advent of Code - Day 3
 * https://adventofcode.com/2023/day/3
 */

import { getInputData, printAnswer } from "../utils";

const IGNORED_CHAR = ".";

const getAroundNumber = (
  line: string[],
  startIndex: number,
  resultat: string,
  order = "left"
): string => {
  console.log(`get Around:  ${line}, startIndex: ${startIndex} => ${resultat}`);
  if (startIndex < 0) {
    return resultat;
  }

  if (!line.hasOwnProperty(startIndex)) {
    return resultat;
  }

  if (line[startIndex] !== IGNORED_CHAR) {
    const currentCharParsed = parseInt(line[startIndex]);

    if (!isNaN(currentCharParsed)) {
      resultat = resultat.concat(currentCharParsed + "");
    }

    return order === "left"
      ? getAroundNumber(line, startIndex - 1, resultat)
      : getAroundNumber(line, startIndex + 1, resultat);
  }

  return resultat;
};

const getParsedNumberInLine = (
  board: string[][],
  rowIndex: number,
  colIndex: number
) => {
  if (
    !board.hasOwnProperty(rowIndex) ||
    !board[rowIndex].hasOwnProperty(colIndex)
  ) {
    return 0;
  }

  if (rowIndex || colIndex < 0) {
    return 0;
  }

  let currentCharParsed = parseInt(board[rowIndex][colIndex]);

  if (!isNaN(currentCharParsed)) {
    let resLeft = "";

    // Left part: because of the order of reading, need to reverse the string
    const testLeft = getAroundNumber(
      board[rowIndex],
      colIndex - 1,
      resLeft,
      "left"
    )
      .split("")
      .reverse()
      .join("");
    console.log(`left : ${testLeft}`);

    let resRight = "";
    const right = getAroundNumber(
      board[rowIndex],
      colIndex + 1,
      resRight,
      "right"
    );
    console.log(`right : ${right}`);

    const finalNumber = testLeft.concat(board[rowIndex][colIndex], right);
    console.log("mergeNumber", finalNumber);
    currentCharParsed = parseInt(finalNumber);
  }

  return !isNaN(currentCharParsed) ? currentCharParsed : 0;
};

const dataSplitted = getInputData("03/input.txt");
let result = 0;

// console.log(dataSplitted);

let board: string[][] = [];

dataSplitted.forEach((line: string) => {
  board.push(line.split(""));
});

const symbolRegex = new RegExp(/[!@#$%^&*()-=_+{};':"\\|,<>/~]/, "i");

board.forEach((line: string[], rowIndex: number) => {
  line.forEach((char: string, colIndex: number) => {
    if (char === IGNORED_CHAR) {
      return;
    }

    // check if char is a symbol
    if (!symbolRegex.test(char)) {
      return;
    }

    // current char is a symbol TODO: border effect
    const currentSumAdj =
      getParsedNumberInLine(board, rowIndex - 1, colIndex - 1) + // TL
      getParsedNumberInLine(board, rowIndex - 1, colIndex) + // TM
      getParsedNumberInLine(board, rowIndex - 1, colIndex + 1) + // TR
      getParsedNumberInLine(board, rowIndex, colIndex - 1) + // ML
      getParsedNumberInLine(board, rowIndex, colIndex + 1) + // MR
      getParsedNumberInLine(board, rowIndex + 1, colIndex - 1) + // BL
      getParsedNumberInLine(board, rowIndex + 1, colIndex) + // BM
      getParsedNumberInLine(board, rowIndex + 1, colIndex + 1); // BR

    // console.log(
    //   `rowIndex: ${rowIndex - 1}, colIndex: ${
    //     colIndex - 1
    //   }, value: ${getParsedNumberInLine(board, rowIndex - 1, colIndex - 1)}`
    // );

    result += currentSumAdj;
  });
});

printAnswer(result);
