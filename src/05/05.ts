/**
 * Advent of Code - Day 5
 * https://adventofcode.com/2023/day/5
 */

import { getInputData, printAnswer } from '../utils';

interface MappingSeed {
    startSource: number;
    startTarget: number;
    rangeLength: number;
}

interface ConvertedSeed {
    seed: number;
    location: number;
}

interface RangeSeed {
    rangeSeedStart: number;
    rangeSeedLength: number;
}

const getSeedsAndMappingConverters = function (dataSplitted: string[]): [RangeSeed[], Record<string, MappingSeed[]>] {
    let seedToPlanted: number[] = [];
    const rangesSeeds: RangeSeed[] = [];

    const mapRegex = new RegExp(/map:/);

    let mappings: Record<string, MappingSeed[]> = {};

    let i = 0;

    // parse seed & mapping converters
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
            for (let i = 0; i < seedToPlanted.length; i++) {
                if (i % 2 === 0) {
                    const newSeedRange: RangeSeed = {
                        rangeSeedStart: seedToPlanted[i],
                        rangeSeedLength: seedToPlanted[i + 1]
                    };
                    rangesSeeds.push(newSeedRange);
                }
            }

            // console.log('seedToPlanted', seedToPlanted);
            // console.log('rangesSeeds', rangesSeeds);
        }

        // get name of the mapping if line contains map
        if (mapRegex.test(line)) {
            const [from, to] = line.trim().replace(' map:', '').split('-to-');

            // get range number of current mapping
            let j = i + 1;
            let nextLine = dataSplitted[j];
            const currentMappingKey = `${from}-to-${to}`;
            mappings[currentMappingKey] = [];

            while (nextLine && nextLine !== '') {
                const [targetRangeStart, sourceRangeStart, rangeLength] = nextLine
                    .trim()
                    .split(' ')
                    .map((n) => parseInt(n))
                    .filter((n) => !isNaN(n));

                mappings[currentMappingKey].push({
                    startTarget: targetRangeStart,
                    startSource: sourceRangeStart,
                    rangeLength
                });

                ++j;
                nextLine = dataSplitted[j];
            }

            i = i !== j ? j - 1 : i;
        }

        i++;
    }

    return [rangesSeeds, mappings];
};

let result = 0;
const dataSplitted = getInputData('05/input.txt');
// console.log('dataSplitted', dataSplitted);

const [rangesSeeds, mappings] = getSeedsAndMappingConverters(dataSplitted);

// console.log('seedsToPlanted', seedsToPlanted);
// console.log('mappings', mappings);

//  foreach seed apply each mapping top / bottom (for in) until location (push to locationArr)
// should be used to push location & get the minimum
// const locationArr: ConvertedSeed[] = [];
let minLoc = 999_999_999_999;

for (let rangeSeed of rangesSeeds) {
    for (let seed = rangeSeed.rangeSeedStart; seed < rangeSeed.rangeSeedStart + rangeSeed.rangeSeedLength; seed++) {
        // console.log(`--- current seed: ${seed} ---`);
        let convertedSeedToNextStep = seed;

        for (let mappingKey in mappings) {
            const ranges = mappings[mappingKey];
            // console.log(`apply mapping : ${mappingKey}`);

            // check if current seed is in range
            let alreadyConverted = false;
            // loop on the different ranges to determine if seed in range

            for (let range of ranges) {
                if (alreadyConverted) {
                    continue;
                }

                if (
                    convertedSeedToNextStep >= range.startSource &&
                    convertedSeedToNextStep < range.startSource + range.rangeLength
                ) {
                    convertedSeedToNextStep = range.startTarget + convertedSeedToNextStep - range.startSource;
                    alreadyConverted = true;
                    // console.log(`convertedSeedToNextStep: ${convertedSeedToNextStep}`);
                }
                // console.log('convertedSeedToNextStep', convertedSeedToNextStep);
            }
            // ranges.forEach((range: MappingSeed) => {

            // });
        }

        if (convertedSeedToNextStep < minLoc) {
            minLoc = convertedSeedToNextStep;
        }

        // locationArr.push({
        //     seed: seed,
        //     location: convertedSeedToNextStep
        // });
    }
}

// console.log('locationArr', locationArr);

// get mini location
// locationArr.sort((a, b) => a.location - b.location);
// result = locationArr[0].location;

printAnswer(minLoc);
// --max-old-space-size=8192 --optimize_for_size // if node with arr heap out of memory
