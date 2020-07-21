// take a function and join two list by applying the function between corrensponding elements.
const zipWith = (fn) => (listA) => (listB) => {
  if (listA.length === 0 || listB.length === 0) {
    return [];
  }
  return [
    fn(listA[0], listB[0]),
    ...zipWith(fn)(listA.slice(1))(listB.slice(1)),
  ];
};

export default zipWith;
