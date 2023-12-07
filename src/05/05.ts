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

const mappings: MappingSeed[] = [];

let i = 0;

while (i < dataSplitted.length) {
    const line = dataSplitted[i];

    if (!line || line === '') {
        i++;
        continue;
    }

    // get seed to plant in the first line
    if (i === 0) {
        seedToPlanted = line
            .trim()
            .split(' ')
            .map((n) => parseInt(n))
            .filter((n) => !isNaN(n));
    }

    // get name of the mapping if line contains map
    if (mapRegex.test(line)) {
        const [from, to] = line.trim().replace(' map:', '').split('-to-');

        // TODO: get the range
        console.log('from', from, 'to', to);

        // get range number of current mapping
        let nextLine = dataSplitted[i + 1];
        let j = i;
        while (nextLine !== '') {
            const [targetRangeStart, sourceRangeStart, length] = nextLine
                .trim()
                .split(' ')
                .map((n) => parseInt(n))
                .filter((n) => !isNaN(n));

            j++;
            nextLine = dataSplitted[j];
        }
    }

    i++;
}

console.log('seedsToPlanted', seedToPlanted);

printAnswer(result);
