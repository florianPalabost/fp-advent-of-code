import { getInputData, printAnswer } from "../utils";

const dataSplitted = getInputData("04/input.txt");

let result = 0;

console.log("dataSplitted", dataSplitted);

dataSplitted.forEach((line: string) => {
  // prepare data for compute
  const [rawCardWin, rawUserCardNumbers] = line.trim().split(" | ");
  const [cardId, cardNumberWin] = rawCardWin.trim().split(": ");

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

  let currentWin = 0;

  if (matchedCards.length > 0) {
    matchedCards.forEach((cardNumber, index) => {
      currentWin = Math.pow(2, index);
    });
    console.log("currentWin", currentWin);
    result += currentWin;
  }
});

printAnswer(result);
