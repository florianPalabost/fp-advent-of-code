/**
 * Advent of Code - Day 1
 * https://adventofcode.com/2023/day/1
 */

import { getInputData, printAnswer } from '../utils';

const dataSplitted = getInputData('01/input.txt');

const getSumNumberInLine = (data: string[]): number => {
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
        const splitLine = line.split('');
        const numbersInLine = splitLine
            .filter((char: string) => !isNaN(parseInt(char)))
            .map((char: string) => parseInt(char));
        firstNumber = numbersInLine[0];
        lastNumber = numbersInLine[numbersInLine.length - 1];
        // console.log(line);
        console.log(
            `line: ${line}, first: ${firstNumber}, last: ${lastNumber}, concat: `,
            parseInt(firstNumber.toString().concat(lastNumber.toString()))
        );
        result += parseInt(firstNumber.toString().concat(lastNumber.toString()));
        // console.log("end");
    });

    return result;
};

// will have the final answer
let result = 0;

dataSplitted.forEach((line: string) => {
    // skip empty line
    if (line.length === 0) {
        return;
    }

    let first = 0;
    let last = 0;

    const splitedLine = line.split('');
    // get first
    for (let i = 0; i < splitedLine.length; i++) {
        if (first !== 0) {
            break;
        }
        let char = splitedLine[i];

        if (first === 0 && !isNaN(parseInt(char))) {
            first = parseInt(char);
            break;
        }

        if (char === 'o' && line[i + 1] === 'n' && line[i + 2] === 'e') {
            first = 1;
            break;
        } else if (char === 't' && line[i + 1] === 'w' && line[i + 2] === 'o') {
            first = 2;
            break;
        } else if (
            char === 't' &&
            line[i + 1] === 'h' &&
            line[i + 2] === 'r' &&
            line[i + 3] === 'e' &&
            line[i + 4] === 'e'
        ) {
            first = 3;
            break;
        } else if (char === 'f' && line[i + 1] === 'o' && line[i + 2] === 'u' && line[i + 3] === 'r') {
            first = 4;
            break;
        } else if (char === 'f' && line[i + 1] === 'i' && line[i + 2] === 'v' && line[i + 3] === 'e') {
            first = 5;
            break;
        } else if (char === 's' && line[i + 1] === 'i' && line[i + 2] === 'x') {
            first = 6;
            break;
        } else if (
            char === 's' &&
            line[i + 1] === 'e' &&
            line[i + 2] === 'v' &&
            line[i + 3] === 'e' &&
            line[i + 4] === 'n'
        ) {
            first = 7;
            break;
        } else if (
            char === 'e' &&
            line[i + 1] === 'i' &&
            line[i + 2] === 'g' &&
            line[i + 3] === 'h' &&
            line[i + 4] === 't'
        ) {
            first = 8;
            break;
        } else if (char === 'n' && line[i + 1] === 'i' && line[i + 2] === 'n' && line[i + 3] === 'e') {
            first = 9;
            break;
        }
    }

    // get last
    for (let j = splitedLine.length - 1; j >= 0; j--) {
        if (last !== 0) {
            break;
        }
        let char = splitedLine[j];

        if (last === 0 && !isNaN(parseInt(char))) {
            last = parseInt(char);
            break;
        }

        if (char === 'o' && line[j + 1] === 'n' && line[j + 2] === 'e') {
            last = 1;
            break;
        } else if (char === 't' && line[j + 1] === 'w' && line[j + 2] === 'o') {
            last = 2;
            break;
        } else if (
            char === 't' &&
            line[j + 1] === 'h' &&
            line[j + 2] === 'r' &&
            line[j + 3] === 'e' &&
            line[j + 4] === 'e'
        ) {
            last = 3;
            break;
        } else if (char === 'f' && line[j + 1] === 'o' && line[j + 2] === 'u' && line[j + 3] === 'r') {
            last = 4;
            break;
        } else if (char === 'f' && line[j + 1] === 'i' && line[j + 2] === 'v' && line[j + 3] === 'e') {
            last = 5;
            break;
        } else if (char === 's' && line[j + 1] === 'i' && line[j + 2] === 'x') {
            last = 6;
            break;
        } else if (
            char === 's' &&
            line[j + 1] === 'e' &&
            line[j + 2] === 'v' &&
            line[j + 3] === 'e' &&
            line[j + 4] === 'n'
        ) {
            last = 7;
            break;
        } else if (
            char === 'e' &&
            line[j + 1] === 'i' &&
            line[j + 2] === 'g' &&
            line[j + 3] === 'h' &&
            line[j + 4] === 't'
        ) {
            last = 8;
            break;
        } else if (char === 'n' && line[j + 1] === 'i' && line[j + 2] === 'n' && line[j + 3] === 'e') {
            last = 9;
            break;
        }
    }

    result += parseInt(first.toString().concat(last.toString()));
});

printAnswer(result);
// onetwone
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen

// threeseven4five35eightwont
// eight5oneights

// last
// lvstjk3oneightfh
