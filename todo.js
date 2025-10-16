// todo.js
// sample.txt 단어 갯수=> ?개, 'e'문자가 포함된 => ?개
const fs = require("fs");

fs.readFile("./sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const strAry = data.split(" ");
  const search = "ing"; // 찾을문자열.
  const result = strAry.reduce((acc, elem, idx) => {
    // 최초 속성을 생성하면서 값에 [] 할당.
    if (idx == 0) {
      acc.total = [];
      acc.get = [];
    } // {total:[], get:[]}
    acc.total.push(elem);
    if (elem.indexOf(search) != -1) {
      acc.get.push(elem);
    }
    return acc;
  }, {});

  console.dir(
    `전체=> ${result.total.length}, '${search}' => ${result.get.length}, [${result.get}]`
  );
});
