/**
 * Advent of Code - Day 8
 * https://adventofcode.com/2023/day/8
 */

import { getInputData, printAnswer } from '../utils';

let result = 0;
const FROM = 'AAA';
const TO = 'ZZZ';

const dataSplitted = getInputData('08/input.txt');

console.log('dataSplitted', dataSplitted);

let steps = dataSplitted[0].trim().split('');

const roadRecord: { [key: string]: any } = {};

const instructionLength = dataSplitted.length - 2;

if (steps.length !== instructionLength) {
    steps = steps.join('').repeat(instructionLength).split('');
}

for (let i = 2; i < dataSplitted.length; i++) {
    const rawLine = dataSplitted[i];

    let [currentFrom, rawDestTos] = rawLine.trim().split(' = ');

    const [left, right] = rawDestTos.replace('(', '').replace(')', ' ').split(', ');

    roadRecord[currentFrom] = {
        L: left.trim(),
        R: right.trim()
    };
}

console.log(roadRecord);

let current = FROM;
while (current !== TO) {
    const direction: 'L' | 'R' = steps.shift() as 'L' | 'R';

    // if (!direction) {
    //     break;
    // }

    current = roadRecord[current][direction];
    console.log(`${current} > ${direction}`);
    result++;
}

printAnswer(result);
