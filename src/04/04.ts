import { getInputData, printAnswer } from "../utils";

const dataSplitted = getInputData("04/input.txt");

let result = 0;

console.log("dataSplitted", dataSplitted);

const instanceCopies: Record<string, number> = {};

dataSplitted.forEach((line: string, cardIndex: number) => {
  // prepare data for compute
  const [rawCardWin, rawUserCardNumbers] = line.trim().split(" | ");
  const [rawCardId, cardNumberWin] = rawCardWin.trim().split(": ");
  const cardId = rawCardId.replace("Card ", "").trim();

  if (!instanceCopies.hasOwnProperty(cardId)) {
    instanceCopies[cardId] = 0;
  }

  const cardNumberWinArr = cardNumberWin
    .trim()
    .split(" ")
    .filter((n) => n.trim().length > 0)
    .map((n) => parseInt(n.trim()));

  const userCardNumbersArr = rawUserCardNumbers
    .trim()
    .split(" ")
    .filter((n) => n.trim().length > 0)
    .map((n) => parseInt(n.trim()));

  console.log(
    `id: ${cardId}, winCards: ${cardNumberWinArr}, userCards: ${userCardNumbersArr}`
  );

  // get matched cards
  const matchedCards = cardNumberWinArr
    .map((cardNumber) => {
      if (userCardNumbersArr.includes(cardNumber)) {
        return cardNumber;
      }
    })
    .filter((n) => n !== undefined);

  console.log(`matchedCards: ${matchedCards}`);

  // if match > 0  update counter of the caopies cards

  if (matchedCards.length > 0) {
    // Ex c1 avec 3 match : need copy of c2,c3, c4

    matchedCards.forEach((cardNumber, matchedIndex) => {
      const currentCopyId = parseInt(cardId) + (matchedIndex + 1);
      if (!instanceCopies.hasOwnProperty(currentCopyId)) {
        instanceCopies[currentCopyId] = 0;
      } else {
        instanceCopies[currentCopyId]++;
      }
    });
    console.log(`state of instanceCopies for ${cardId} : `, instanceCopies);
  }
});

for (let card in instanceCopies) {
  result += instanceCopies[card];
}

printAnswer(result);
