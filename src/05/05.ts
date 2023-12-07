/**
 * Advent of Code - Day 5
 * https://adventofcode.com/2023/day/5
 */

import { getInputData, printAnswer } from '../utils';

interface MappingSeed {
    startSource: number;
    startTarget: number;
    length: number;
}

let result = 0;
const dataSplitted = getInputData('05/input.txt');
console.log('dataSplitted', dataSplitted);

let seedToPlanted: number[] = [];
const mapRegex = new RegExp(/map:/);

dataSplitted.forEach((line: string, index: number) => {
    if (!line || line === '') {
        return;
    }

    // get seed to plant in the first line
    if (index === 0) {
        seedToPlanted = line
            .trim()
            .split(' ')
            .map((n) => parseInt(n))
            .filter((n) => !isNaN(n));
    }
});

console.log('seedsToPlanted', seedToPlanted);

printAnswer(result);
