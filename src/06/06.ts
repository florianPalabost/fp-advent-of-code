import { getInputData, printAnswer } from '../utils';

interface Race {
    time: number;
    distance: number;
}

const INIT_SPEED = 0;

const formatInput = (dataSplitted: string[]): Race[] => {
    const races: Race[] = [];

    for (let i = 0; i < dataSplitted.length; i++) {
        const line = dataSplitted[i];
        // console.log('line', line);
        const splitLine = line.trim().split(':');

        if (i === 0) {
            // it's time
            const times = splitLine[1]
                .trim()
                .split(' ')
                .map((n) => parseInt(n.trim()))
                .filter((n) => !isNaN(n));
            const joinTime =  parseInt(times.join(''));
            races.push({ time: joinTime , distance: 0 });
        } else {
            // it's distance
            const distances = splitLine[1]
                .trim()
                .split(' ')
                .map((n) => parseInt(n.trim()))
                .filter((n) => !isNaN(n));

            // console.log('distances', distances);
            const joinDistance =  parseInt(distances.join(''));
           races[0].distance = joinDistance;
            // distances.forEach((distance: number, di: number) => {
            //     races[0].distance = distance;
            // });
        }
    }

    return races;
};

let result = 0;
const dataSplitted = getInputData('06/input.txt');

const races = formatInput(dataSplitted);
// console.log('races', races);
const winningTimes: number[] = [];

for (let raceIndex = 0; raceIndex < races.length; raceIndex++) {
    const race = races[raceIndex];

    // console.log('---current race index', raceIndex);

    let speed = INIT_SPEED;
    let holdingTime = 0;
    let distance = 0;
    winningTimes[raceIndex] = 0;

    while (holdingTime < race.time) {
        let distance = (race.time - holdingTime) * speed;

        if (distance > race.distance) {
            // console.log('winning ! holdingTime: ', holdingTime);
            winningTimes[raceIndex]++;
        }
        // console.log(`holdingTime: ${holdingTime} s, speed: ${speed} mm/s => distance: ${distance} mm`);
        holdingTime += 1;
        speed += 1;
    }

    // console.log(`|||->winningTimes for race ${raceIndex}: ${winningTimes[raceIndex]}`);
}
console.log('all winningTimes', winningTimes);
result = winningTimes.reduce((a, b) => a * b, 1);

printAnswer(result);
