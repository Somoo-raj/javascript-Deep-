// *** property add, modify and delete. ***

const car = {brand: "Tata"};

// Add (new property)
car.model = "Nexon";

// Modify (value change)
car.brand = "Mahindra";

// Delete (property remove)
delete car.model;

console.log(car); // {brand: "Mahindra"}

// *** Q.1. ***

const student = {
    name: "Rahul",
    marks: 85
};
// modify (value)
student.marks = 90;
// add (new property)
student.city = "Delhi";

console.log(student); // {name: "Rahul", marks: 90, city: "Delhi"}

// *** object method (function inside object). ***

const user1 = {
    name1: "Rohan",
    greet: function() {
        return "Hello " + this.name1; // hello Rohan
    }
};

console.log(user1.greet()); // Hello Rohan

           // *** or ***

const person = {
    firstName: "Rahul",
    lastName: "Kumar",
    getFullName: function() {
        return this.firstName + " " + this.lastName; // Rahul Kumar
    }
};

console.log(person.getFullName()); // Rahul Kumar

// *** key check and loop ( in Operator & for...in) ***

const item = {name: "pen", price: 10};
console.log("price" in item); // true
console.log("color" in item); // false

// *** for...in ***

const user = {a: 1, b:2};
for(let key in user) {
    console.log(key); // "a", "b"
};

// *** Q.1 ***

const laptop = {
    brand: "Dell",
    ram: "16GB"
};

console.log("ram" in laptop); // true
console.log("price" in laptop); // false

// *** Object.keys(), Object.values(), & Object.entries(). ***
/* when we need to create arrays from objects, JS provides us with 3 ready-made built-in methods. */

const mobile = {
    brand: "Sumsung",
    price: 20000
};

console.log(Object.keys(mobile)); // ["brand", "price"] only array of keys
console.log(Object.values(mobile)); // ["Sumsung", 20000] only array of values
console.log(Object.entries(mobile)); // [["brand", "Sumsung"], ["price", 20000]] pairs of array


// *** Q.1 *** 

const fruit = {
    name: "Apple",
    color: "red"
};

const result = Object.values(fruit);
console.log(result); // ["Apple", "red"]
console.log(result.length); // 2

// *** Bracket Notation with Variables. ***
/* when the property name is stored in a variable, dot(.) notation doesn't work-only bracket notation works there. */

const course = {
    title: "javascript",
    duration: "30 days"
};

const myKey = "title";

console.log(course.myKey); // undefined (because there is no property named 'myKey')
console.log(course[myKey]); // javascript (the value of the variable 'title' is evaluated)

// *** Q.1 ***

const player = {
    score: 100,
    level: 5
};

const key = "score";

console.log(player[key]); // 100


// *** Nested Objects ***
// in real life projects, objects are often nested (like in JSON data).

const user3 = {
    id: 101,
    details: {
        city: "varanasi",
        pincode: 222120
    }
};

console.log(user3.details.city); // varanasi

// *** object Destructuring ***
/* the most handy feature of ES6, used every second in react and node.js destructuring! this lets us extract object properties into direct variables */

const student1 = { name: "Aman", age: 20}

// normal way:
// const name = student1.name;
// const age = student1.age;

// destructuring way (short & clean):

const {name, age} = student1;

console.log(name); // Aman
console.log(age); // 20

// *** Q.1 ***

const laptop1 = {
    brand: "HP",
    price: 50000
};

const {brand} = laptop1;

console.log(brand); // HP

// *** Renaming variables in destructuring. ***
/* often we have to change the name of a variable while destructuring (e.g. if a variable with the same name already exits). */

const user4 = {
    id: 404,
    username: "alenx99"
};

// save the username in a new variable 'handle'

const { username: handle } = user4;

console.log(handle); // alenx99 

// *** Q.1 ***

const product = {
    id: 102,
    title: "Wireless Mouse"
};

// assign title value in productName new variable
const { title: productName} = product;

console.log(productName); // Wireless Mouse


// *** Default values in destructuring ***
/* if an object doesn't have a property, it returns undefined during normal destruction. but we can set a default value to avoid crashes */

const user5 = {
    Name: "karan",
    // missing age property
};

const { Name, Age = 18 } = user5;

console.log(Name); // karan
console.log(Age); // 18 (fallback default value)

// *** Q.1 *** 

const setting = {
    theme: "dark",

};

const { theme = "light", language = "English" } = setting;

console.log(theme); // dark (original value)
console.log(language); // English (fallback default value)

// *** property shorhand. ***
/* in JS, when the variable name and the object key name are the same, we don't need to write it twice: */

const name2 = "vikas";
const age1 = 25;

// odd way:
// const user6 = { name2: name, age1: age };

// ES6 shorthand way (clean and small):

const user6 = { name2, age1};

console.log(user6); // { name2: "vikas", age1: 25 }


// *** Q.1 ***

const city = "Delhi";
const pin = 110001;

const location1 = {city, pin};

console.log(location1.city); // "Delhi"
console.log(location1); // { city: "Delhi", pin: 110001 }