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

const symbolRegex = new RegExp(/[*]/, "i");
const invalidRegex = new RegExp(/[-!$%^&*()@#_+|~=`{}\[\]:";'<>?,.\/]/, "i");

board.forEach((line: string[], rowIndex: number) => {
  line.forEach((char: string, colIndex: number) => {
    if (char === IGNORED_CHAR) {
      return;
    }

    // check if char is a *
    if (!symbolRegex.test(char)) {
      return;
    }
    let countValid: number = 0;
    let adjacentValid: number[] = [];

    console.log("--current--", char);

    // TOP
    let top = 0;
    if (
      board.hasOwnProperty(rowIndex - 1) &&
      board[rowIndex - 1].hasOwnProperty(colIndex) &&
      (board[rowIndex - 1][colIndex] !== IGNORED_CHAR ||
        !invalidRegex.test(board[rowIndex - 1][colIndex]))
    ) {
      // TL? + TM + TR?
      top = getParsedNumberInLine(board, rowIndex - 1, colIndex);
      console.log("top:", top);
      if (top > 0) {
        countValid++;
        adjacentValid.push(top);
      }
    } else {
      const topLeft = getParsedNumberInLine(board, rowIndex - 1, colIndex - 1);
      const topRight = getParsedNumberInLine(board, rowIndex - 1, colIndex + 1);
      console.log("topLeft:", topLeft, "topRight:", topRight);
      if (topLeft > 0) {
        countValid++;
        adjacentValid.push(topLeft);
      }

      if (topRight > 0) {
        countValid++;
        adjacentValid.push(topRight);
      }
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

    const mL = middleLeft !== "" ? parseInt(middleLeft) : 0;
    const mR = middleRight !== "" ? parseInt(middleRight) : 0;
    console.log("middleLeft:", mL, "middleRight:", mR);

    if (mL > 0) {
      countValid++;
      adjacentValid.push(mL);
    }

    if (mR > 0) {
      countValid++;
      adjacentValid.push(mR);
    }

    // BOTTOM
    let bottom = 0;
    if (
      board.hasOwnProperty(rowIndex + 1) &&
      board[rowIndex + 1].hasOwnProperty(colIndex) &&
      (board[rowIndex + 1][colIndex] !== IGNORED_CHAR ||
        !invalidRegex.test(board[rowIndex + 1][colIndex]))
    ) {
      bottom = getParsedNumberInLine(board, rowIndex + 1, colIndex); // BL? + BM + BR?
      console.log("bottom:", bottom);
      if (bottom > 0) {
        countValid++;
        adjacentValid.push(bottom);
      }
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
        // bottom = bottomLeft + bottomRight;
        console.log("bottomLeft:", bottomLeft, "bottomRight:", bottomRight);
        if (bottomLeft > 0) {
          countValid++;
          adjacentValid.push(bottomLeft);
        }

        if (bottomRight > 0) {
          countValid++;
          adjacentValid.push(bottomRight);
        }
      }
    }

    // console.log("bottom:", bottom);

    console.log("countValid:", countValid);
    console.log("adjacentValid:", adjacentValid);
    // 2 : gear is valid (2 is the number of adjacent)
    if (countValid === 2) {
      const multiply = adjacentValid.reduce((a, b) => a * b);
      console.log(`current : "${char}" is VALID and multiply=${multiply} `);
      result += multiply;
    }
  });
});

printAnswer(result);
