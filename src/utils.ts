/**
 * Export functions that will be reused in others exercises
 */

import { readFileSync } from 'fs';
import path from 'path';

/**
 * Reads the content of a file at the specified input path and returns an array of strings,
 * where each element represents a line in the file.
 *
 * @param {string} filename - The filename of the input file.
 * @return {string[]} An array of strings, where each element represents a line in the file.
 */
export function getInputData(filename: string): string[] {
    const data = readFileSync(path.join(__dirname, filename), 'utf-8');

    return data.split('\n');
}

/**
 * Prints the answer to the console.
 *
 * @param {number} answer - The number to print.
 * @return {void} This function does not return a value.
 */
export function printAnswer(answer: number): void {
    console.log('--> Answer: ', answer);
}
