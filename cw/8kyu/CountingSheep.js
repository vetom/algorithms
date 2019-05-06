// https://www.codewars.com/kata/54edbc7200b811e956000556

function countSheeps(arrayOfSheep) {
  return arrayOfSheep.reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
}
