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
  // console.log(`get Around:  ${line}, startIndex: ${startIndex} => ${resultat}`);
  if (startIndex < 0 || startIndex >= line.length) {
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
      : getAroundNumber(line, startIndex + 1, resultat, "right");
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

  if (rowIndex < 0 || colIndex < 0) {
    return 0;
  }

  let currentCharParsed = parseInt(board[rowIndex][colIndex]);
  // console.log("currentCharParsed", currentCharParsed);

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
    // console.log(`get Around left : ${testLeft}`);

    let resRight = "";
    const right = getAroundNumber(
      board[rowIndex],
      colIndex + 1,
      resRight,
      "right"
    );
    // console.log(`right : ${right}`);

    const finalNumber = testLeft.concat(board[rowIndex][colIndex], right);
    // console.log("mergeNumber", finalNumber);
    currentCharParsed = parseInt(finalNumber);
  }

  return !isNaN(currentCharParsed) ? currentCharParsed : 0;
};

const dataSplitted = getInputData("03/input.txt");
let result = 0;

let board: string[][] = [];

dataSplitted.forEach((line: string) => {
  board.push(line.split(""));
});

const symbolRegex = new RegExp(/[-!$%^&*()@#_+|~=`{}\[\]:";'<>?,.\/]/, "i");

board.forEach((line: string[], rowIndex: number) => {
  line.forEach((char: string, colIndex: number) => {
    if (char === IGNORED_CHAR) {
      return;
    }

    // check if char is a symbol
    if (!symbolRegex.test(char)) {
      return;
    }

    // console.log("--current--", char);

    // TOP
    let top = 0;
    if (
      board.hasOwnProperty(rowIndex - 1) &&
      board[rowIndex - 1].hasOwnProperty(colIndex) &&
      (board[rowIndex - 1][colIndex] !== IGNORED_CHAR ||
        !symbolRegex.test(board[rowIndex - 1][colIndex]))
    ) {
      // TL? + TM + TR?
      top = getParsedNumberInLine(board, rowIndex - 1, colIndex);
    } else {
      const topLeft = getParsedNumberInLine(board, rowIndex - 1, colIndex - 1);
      const topRight = getParsedNumberInLine(board, rowIndex - 1, colIndex + 1);
      top = topLeft + topRight;
    }
    // console.log("top:", top);

    // MIDDLE
    let middle = 0;
    const middleLeft = getAroundNumber(
      board[rowIndex],
      colIndex - 1,
      "",
      "left"
    )
      .split("")
      .reverse()
      .join("");
    const middleRight = getAroundNumber(
      board[rowIndex],
      colIndex + 1,
      "",
      "right"
    );

    middle =
      (middleLeft !== "" ? parseInt(middleLeft) : 0) +
      (middleRight !== "" ? parseInt(middleRight) : 0);
    // console.log("middle:", middle);

    // BOTTOM
    let bottom = 0;
    if (
      board.hasOwnProperty(rowIndex + 1) &&
      board[rowIndex + 1].hasOwnProperty(colIndex) &&
      (board[rowIndex + 1][colIndex] !== IGNORED_CHAR ||
        !symbolRegex.test(board[rowIndex + 1][colIndex]))
    ) {
      bottom = getParsedNumberInLine(board, rowIndex + 1, colIndex); // BL? + BM + BR?
    } else {
      if (board.hasOwnProperty(rowIndex + 1) == false) {
        bottom = 0;
      } else {
        const bottomLeft = getParsedNumberInLine(
          board,
          rowIndex + 1,
          colIndex - 1
        );
        const bottomRight = getParsedNumberInLine(
          board,
          rowIndex + 1,
          colIndex + 1
        );
        bottom = bottomLeft + bottomRight;
      }
    }

    // console.log("bottom:", bottom);

    const currentSumAdj = top + middle + bottom;
    // console.log("currentSumAdj:", currentSumAdj);

    result += currentSumAdj;
  });
});

printAnswer(result);
