/**
 * Advent of Code - Day 1
 * https://adventofcode.com/2023/day/1
 */

import { readFileSync } from "fs";
import path from "path";

const data = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const dataSplitted = data.split("\n");

// will have the final answer
let result = 0;

dataSplitted.forEach((line: string) => {
  // skip empty line
  if (line.length === 0) {
    return;
  }

  // -1 : default value to see if a number has been found
  let firstNumber = -1;
  let lastNumber = -1;
  // explode the line to check each character
  const splitLine = line.split("");

  const numbersInLine = splitLine
    .filter((char: string) => {
      if (isNaN(parseInt(char))) {
        return false;
      }

      return true;
    })
    .map((char: string) => parseInt(char));

  firstNumber = numbersInLine[0];
  lastNumber = numbersInLine[numbersInLine.length - 1];

  result += parseInt(firstNumber.toString().concat(lastNumber.toString()));
});

console.log("Answer : ", result);
