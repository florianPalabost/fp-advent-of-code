import { getInputData, printAnswer } from '../utils';

interface CardNode {
    id: string | number;
    label: string | number;
    children: CardNode[];
    parent?: CardNode | null;
}

const displayNodeTree = (node: CardNode, indent = 0) => {
    const indentation = ' '.repeat(indent * 2);

    console.log(`${indentation}|${node.label}|`);

    if (node.children.length > 0) {
        for (const child of node.children) {
            displayNodeTree(child, indent + 1);
        }
    }
};

const getNodeLength = (cardNode: CardNode): number => {
    let count = 1;

    if (cardNode.children.length > 0) {
        for (const child of cardNode.children) {
            count += getNodeLength(child);
        }
    }

    return count;
};
const getMatchedCards = (cardId: string, cardNumberWin: string, rawUserCardNumbers: string): number[] => {
    const cardNumberWinArr = cardNumberWin
        .trim()
        .split(' ')
        .filter((n) => n.trim().length > 0)
        .map((n) => parseInt(n.trim()));

    const userCardNumbersArr = rawUserCardNumbers
        .trim()
        .split(' ')
        .filter((n) => n.trim().length > 0)
        .map((n) => parseInt(n.trim()));

    // console.log(`id: ${cardId}, winCards: ${cardNumberWinArr}, userCards: ${userCardNumbersArr}`);

    // get matched cards
    const matchedCards = cardNumberWinArr
        .map((cardNumber) => {
            if (userCardNumbersArr.includes(cardNumber)) {
                return cardNumber;
            }
        })
        .filter((n) => n !== undefined) as number[];

    // console.log(`matchedCards: ${matchedCards}`);

    return matchedCards;
};

const dataSplitted = getInputData('04/input.txt');
const allCardTree: Record<string, CardNode> = {};

let result = 0;

const instanceCopies: Record<string, number> = {};

dataSplitted.forEach((line: string, cardIndex: number) => {
    // prepare data for compute
    const [rawCardWin, rawUserCardNumbers] = line.trim().split(' | ');
    const [rawCardId, cardNumberWin] = rawCardWin.trim().split(': ');
    const cardId = rawCardId.replace('Card ', '').trim();

    if (!instanceCopies.hasOwnProperty(cardId)) {
        instanceCopies[cardId] = 0;
    }

    let currentCardNode: CardNode = {
        id: cardId,
        label: 'c' + cardId,
        children: [],
        parent: null
    };

    const matchedCards = getMatchedCards(cardId, cardNumberWin, rawUserCardNumbers);

    matchedCards.forEach((c, childrenCardIndex) => {
        const currentChildId = cardIndex + 1 + childrenCardIndex + 1;

        const newChildCardNode: CardNode = {
            id: currentChildId,
            label: 'c' + currentChildId,
            children: [],
            parent: currentCardNode
        };

        currentCardNode.children.push(newChildCardNode);
    });

    // add children to all others instance of the current card => need to reloop on copy card tree
    if (currentCardNode.children.length > 0) {
        for (let copyCardId in allCardTree) {
            const copyCardNode = allCardTree[copyCardId];

            copyCardNode.children.forEach((copyChild: CardNode) => {
                if (copyChild.id === parseInt(cardId)) {
                    copyChild.children = currentCardNode.children;
                }
            });
        }
    }

    allCardTree[cardId] = currentCardNode;
});

for (let finalCardId in allCardTree) {
    const finalCardNode = allCardTree[finalCardId];

    displayNodeTree(finalCardNode);
    result += getNodeLength(finalCardNode);
}

printAnswer(result);
