export function generateRandomOrder(length: number): number[] {
  const order = new Array(length).fill(undefined);

  const indexes = order.map((_item, index) => index);

  return order.map(() => {
    const index = Math.floor(Math.random() * indexes.length);

    return indexes.splice(index, 1)[0];
  });
}

export function calcNextRandomIndex(length: number, playedIndexes: number[]): number {
  const availableIndexes = new Array(length)
    .fill(undefined)
    .map((_item, index) => index)
    .filter((index) => !playedIndexes.includes(index));

  const randomIndex = Math.floor(Math.random() * availableIndexes.length);

  return availableIndexes[randomIndex];
}
