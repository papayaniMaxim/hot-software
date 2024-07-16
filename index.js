const readline = require('readline');

const gcd = (a, b)  => {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

const canReach = (a, b, c) => {

  if (a + b > c) return "NO"
  if (c % gcd(a, b) != 0) return "NO"
  
  let visited = new Set();
  let queue = [[a, b]];

  while (queue.length > 0) {
    // что бы не блокировать поток
    // await new Promise(resolve => setImmediate(resolve));
    
    let [currentA, currentB] = queue.shift();
    
    if (currentA === c || currentB === c) {
      return "YES";
    }

    visited.add(`${currentA},${currentB}`);

    let newPair1 = [currentA + currentB, currentB];
    let newPair2 = [currentA, currentA + currentB];

    if (!visited.has(`${newPair1[0]},${newPair1[1]}`) && newPair1[0] <= c && newPair1[1] <= c) {
      queue.push(newPair1);
    }

    if (!visited.has(`${newPair2[0]},${newPair2[1]}`) && newPair2[0] <= c && newPair2[1] <= c) {
      queue.push(newPair2);
    }
  }

  return "NO";
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let a, b, c;

rl.question('Введите a: ', (answer) => {
  a = parseInt(answer);
  rl.question('Введите b: ', (answer) => {
      b = parseInt(answer);
      rl.question('Введите c: ', (answer) => {
          c = parseInt(answer);
          console.log(canReach(a, b, c));
          rl.close();
      });
  });
});
