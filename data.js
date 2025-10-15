// module 기능.
const studentAry = [
  { sno: 100, sname: "홍길동", score: 80 },
  { sno: 200, sname: "김민수", score: 57 },
  { sno: 300, sname: "박철민", score: 77 },
  { sno: 400, sname: "오영수", score: 92 },
];

function sum(a, b) {
  return a + b;
}
const PI = 3.14;

function getStudentInfo() {
  return ["홍길동", "김민식", "박충원", "홍영기"];
}

let jsonString = `[{"id":1,"first_name":"Urbano","last_name":"Steptoe","email":"usteptoe0@marketwatch.com","gender":"Genderqueer","salary":5418},
{"id":2,"first_name":"Sam","last_name":"Tallis","email":"stallis1@ezinearticles.com","gender":"Agender","salary":6663},
{"id":3,"first_name":"Hamilton","last_name":"Iffe","email":"hiffe2@wiley.com","gender":"Male","salary":3329},
{"id":4,"first_name":"Yettie","last_name":"Blees","email":"yblees3@abc.net.au","gender":"Female","salary":5853},
{"id":5,"first_name":"Kelvin","last_name":"Ambroz","email":"kambroz4@ow.ly","gender":"Genderqueer","salary":7730},
{"id":6,"first_name":"Freeman","last_name":"Hailes","email":"fhailes5@telegraph.co.uk","gender":"Male","salary":3003},
{"id":7,"first_name":"Elane","last_name":"Bewfield","email":"ebewfield6@gnu.org","gender":"Female","salary":6343},
{"id":8,"first_name":"Ali","last_name":"Schlag","email":"aschlag7@smugmug.com","gender":"Male","salary":5968},
{"id":9,"first_name":"Amalle","last_name":"Prew","email":"aprew8@elegantthemes.com","gender":"Female","salary":4877},
{"id":10,"first_name":"Gratia","last_name":"Dabnor","email":"gdabnor9@youtu.be","gender":"Female","salary":5066},
{"id":11,"first_name":"Florencia","last_name":"Yeulet","email":"fyeuleta@epa.gov","gender":"Female","salary":7136},
{"id":12,"first_name":"Deeann","last_name":"Luciano","email":"dlucianob@ucoz.com","gender":"Female","salary":9234},
{"id":13,"first_name":"Alexandro","last_name":"Farnell","email":"afarnellc@house.gov","gender":"Male","salary":3564},
{"id":14,"first_name":"Hort","last_name":"Arrighetti","email":"harrighettid@paypal.com","gender":"Agender","salary":6701},
{"id":15,"first_name":"Lydie","last_name":"Du Barry","email":"ldubarrye@oracle.com","gender":"Female","salary":5212}]`;

export { studentAry, sum, getStudentInfo, jsonString };
