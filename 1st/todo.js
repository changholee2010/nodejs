// todo.js
import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);

console.table(jsonObj);
// reduce 출력: Female =>id, fullName, email, salary => resultAry
// 1, 'Urbano Steptoe', 'usteptoe0@marketwatch.com', 5418
// 3, 'Urbano Steptoe', 'usteptoe0@marketwatch.com', 5418
// 5, 'Urbano Steptoe', 'usteptoe0@marketwatch.com', 5418

console.clear();
let resultAry = jsonObj.reduce(
  (acc, { id, first_name, last_name, email, gender, salary }) => {
    if (gender === "Female") {
      acc.push({ id, fullName: first_name + " " + last_name, email, salary });
    }
    return acc;
  },
  []
);
console.table(resultAry);
// jsonObj의 gender별 인원.
// Male: ['Hamilton','Freeman', ...]
// Female: ['Yettie', 'Elane', ...]
// Genderqueer: ['Urbano', 'Kelvin']
// Agender: ['Sam','Hort']

resultAry = jsonObj.reduce((acc, elem) => {
  const key = elem["gender"]; // 'Male', 'Female', 'Genderqueer', 'Agender'
  if (!acc[key]) {
    acc[key] = []; // {Male: [], Female: [], Genderqueer: []}
  }
  acc[key].push(elem.first_name);
  return acc;
}, {});
console.table(resultAry);
