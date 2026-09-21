// Array of objects reference trap

const originalCart = [
    {id : 1, name: "Laptop", price: 32000 },
    {id : 2, name: "Phone", price: 12000 }
]
// shallow copy of the array using spread
const updateCart = [...originalCart];

// Action A
updateCart.push({id : 3, name: "Watch", price: 5000 });

// Action B
updateCart[0].price = 34000;

console.log(originalCart.length); // 2
console.log(originalCart[0].price); // 34000
console.log(updateCart.length); // 3
console.log(updateCart[2].price); // 5000

// deleting properties & references

let player1 = {name: "virat", role: "Batsman"};
let player2 = player1;

delete player2.role; // delete string value and return undefined.

player2 = {name: "Rohit", role: "Captain"}; // the pointer for player2 shifted to the new memory address.

console.log(player1.role); // undefined
console.log(player1.name); // virat
console.log(player2); // {name: "Rohit", role: "Captain"}
console.log(player1); // {name: "virat"}
