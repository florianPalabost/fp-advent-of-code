/**
 * Advent of Code - Day 1
 * https://adventofcode.com/2023/day/1
 */

import { getInputData } from "./utils";

const dataSplitted = getInputData("input.txt");

const getSumNumberInLine = (data: string[]) => {
  let result = 0;
  data.forEach((line: string) => {
    // skip empty line
    if (line.length === 0) {
      return;
    }
    // -1 : default value to see if a number has been found
    let firstNumber = 0;
    let lastNumber = 0;
    // explode the line to check each character
    const splitLine = line.split("");
    const numbersInLine = splitLine
      .filter((char: string) => !isNaN(parseInt(char)))
      .map((char: string) => parseInt(char));
    firstNumber = numbersInLine[0];
    lastNumber = numbersInLine[numbersInLine.length - 1];
    console.log(line);
    // console.log(parseInt(firstNumber.toString().concat(lastNumber.toString())));
    result += parseInt(firstNumber.toString().concat(lastNumber.toString()));
    // console.log("end");
  });
  console.log("Answer: ", result);
};

const mappingNumberLetterAndDigit = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// will have the final answer
let result = 0;

// need to clean data before to reuse the algo in part 1
const cleanData: string[] = dataSplitted.map((line: string) => {
  // skip empty line
  if (line.length === 0) {
    return;
  }

  // transform letter to number in current line
  const regex = new RegExp(
    Object.keys(mappingNumberLetterAndDigit).join("|"),
    "gi"
  );

  return line.replace(regex, (matched) =>
    mappingNumberLetterAndDigit[
      matched as keyof typeof mappingNumberLetterAndDigit
    ].toString()
  );
}) as string[];

// console.log(cleanData);

getSumNumberInLine(cleanData);
