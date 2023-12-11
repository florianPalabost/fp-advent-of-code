/**
 * Advent of Code - Day 7
 * https://adventofcode.com/2023/day/7
 */

import { getInputData, printAnswer } from '../utils';

type HandType = 'five' | 'four' | 'full house' | 'three' | 'two pair' | 'one pair' | 'distinct';
type CardType = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
interface PlayerHand {
    rawHand: string;
    bid: number;
    hand: (number | string)[];
    handType: HandType | null;
    valueHandType: number | string;
    rank: number;
}

const guessHandType = (hand: (number | string)[]): { handType: HandType | null; val: string | number } => {
    // if (hand.length === 0) {
    //     return null;
    // }

    const countCardType = {
        A: 0,
        K: 0,
        Q: 0,
        J: 0,
        T: 0,
        9: 0,
        8: 0,
        7: 0,
        6: 0,
        5: 0,
        4: 0,
        3: 0,
        2: 0
    };

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i] as CardType;

        if (countCardType.hasOwnProperty(card)) {
            countCardType[card]++;
        }
    }

    if (Math.max(...Object.values(countCardType)) === 5) {
        // const valIndex = Object.values(countCardType).indexOf(5);
        const key = Object.entries(hand).find(([key, val]) => val === 5);

        return { handType: 'five', val: key };
    } else if (Math.max(...Object.values(countCardType)) === 4) {
        return { handType: 'four', val: Object.values(countCardType).indexOf(4) }; //'four';
    } else if (Math.max(...Object.values(countCardType)) === 3 && Object.values(countCardType).indexOf(2) !== -1) {
        return { handType: 'full house', val: Object.values(countCardType).indexOf(3) }; //'full house';
    } else if (Math.max(...Object.values(countCardType)) === 3) {
        return { handType: 'three', val: Object.values(countCardType).indexOf(3) }; //'three';
    } else if (
        Math.max(...Object.values(countCardType)) === 2 &&
        Object.values(countCardType).filter((value) => value === 2).length === 2
    ) {
        // TODO this return the first index of two pair need to retrieve the best of the 2
        return { handType: 'two pair', val: Object.values(countCardType).indexOf(2) }; //'two pair';
    } else if (Math.max(...Object.values(countCardType)) === 2) {
        return { handType: 'one pair', val: Object.values(countCardType).indexOf(2) }; //'one pair';
    } else {
        const val = hand.sort((a, b) => {
            const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

            if (typeof a === 'number' && typeof b === 'number') {
                return b - a;
            } else {
                const aIndex = order.indexOf(a as string);
                const bIndex = order.indexOf(b as string);
                return bIndex - aIndex;
            }
        })[0] as string | number;
        console.log(`hand ${hand}, val ${val}`);
        return { handType: 'distinct', val };
    }
};

const computeRanks = (playersHands: PlayerHand[]) => {
    playersHands.forEach((playerHand: PlayerHand) => {
        if (playerHand.handType === 'five') {
            playerHand.rank = playersHands.length - 1;
        } else if (playerHand.handType === 'four') {
            playerHand.rank = playersHands.length - 2;
        } else if (playerHand.handType === 'full house') {
            playerHand.rank = playersHands.length - 3;
        } else if (playerHand.handType === 'three') {
            playerHand.rank = playersHands.length - 4;
        } else if (playerHand.handType === 'two pair') {
            playerHand.rank = 2;
        } else if (playerHand.handType === 'one pair') {
            playerHand.rank = 1;
        } else if (playerHand.handType === 'distinct') {
            playerHand.rank = 1;
        }
    });

    return playersHands;
};

const formatInput = (dataSplitted: string[]): PlayerHand[] => {
    const playersHands: PlayerHand[] = [];

    dataSplitted.forEach((line: string) => {
        const [rawHand, bid] = line.trim().split(' ');
        const hand = rawHand.split('');
        const { handType, val } = guessHandType(hand);

        playersHands.push({
            rawHand,
            bid: parseInt(bid),
            hand,
            handType,
            valueHandType: val,
            rank: -1
        });
    });

    return playersHands;
};

let result = 0;
const dataSplitted = getInputData('07/input.txt');
console.log('dataSplitted', dataSplitted);

let playersHands = formatInput(dataSplitted);
console.log('playersHands', playersHands);

playersHands = computeRanks(playersHands);

printAnswer(result);
