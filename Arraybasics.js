// *** index lookup ***

const colors = ["Red", "Green", "Blue", "Yellow"];

console.log(colors[2]); // Blue
console.log(colors.length); // 4


// *** Array items modifying & updating ***
// we can also update the value of elements in the array using their position (index).

const number = [10, 20, 30];

number[1] = 99; // index 1 (2nd element) was changed.

console.log(number); // [10, 99, 30]

// *** Q.1 ***

const tool = ["hammer", "drill", "wrench"];

tool[0] = "pliers";

console.log(tool[0]); // pliers
console.log(tool[1]); // drill


// *** Adding & removing elements (push & pop) ***

/* in real-world scenarios, we need to add or remove items from the end of arrays. JS has two popular methods for this:
1. push() :-> adds a new value to the end of the array. 
2. pop() :-> removes (delete) the last value from the end of the array. */

const item = ["A", "B"];

item.push("C"); // "C" has been added at the end. -> ["A", "B", "C"]
item.pop(); // last element ("C") removed. -> ["A", "B"]

console.log(item); // ["A", "B"]


// *** Q.1 ***

const score = [50, 60];

score.push(70); // [50, 60, 70]
score.push(50); // [50, 60, 70, 50]
score.pop(); // last item drop (remove)

console.log(score); // [50, 60, 70]


// *** Add/Remove element in Beginning (unshift & shift). ***

/* just as push and pop operate on the end of the array, unshift and shift operate on the beginning (start) of the array: 
1. unshift() :-> Adds on element to the starting index 0 of the array.
2. shift() :-> Removes the element from the starting index 0 of the array. */

const queue = ["user2", "user3"];

queue.unshift("user1"); // initially added -> ["user1", "user2", "user3"]
queue.shift(); // the initial element "user1" was removed -> ["user2", "user3"]

console.log(queue); // ["user2", "user3"]


// *** Q.1 ***

const drons = ["DroneB", "DroneC"];

drons.unshift("DroneA"); // ["DroneA", "DroneB", "DroneC"]
drons.shift(); // ["DroneB", "DroneC"]

console.log(drons[0]); // DroneB


// *** Searching in an Array (indexOf & includes). ***

/* the two most important functions for checking where an item is in an array or whether it exits at all are:
1. indexOf(value) :-> Returns the index (position) of the element. if the item is not found in the array, it returns -1. 
2. includes(value) :-> Directly tells true or false. */

const signals = ["GSM", "LoRa", "NB-IoT"];

console.log(signals.indexOf("LoRa")); // 1
console.log(signals.indexOf("WiFi")); // -1
console.log(signals.includes("GSM")); // true


// *** Q.1 ***

const statusList = ["IDLE", "FLYING", "LANDED"];

const pos = statusList.indexOf("EMERGENCY");
const exits = statusList.includes("FLYING");

console.log(pos); // -1
console.log(exits); // true


// *** Array Slice vs Splice (the classic divider). ***

/*
1. slice(start, end) :-> copies a piece of the array and returns a new array. the original array remains unchanged (the end index is not included).
2. splice(start, deleteCount, item1, ...) :-> delete or add elements within the original array. the oroginal array is mutated (changed).
*/

// slice() method (safe/ mon-destructive)
const arr1 = ["A", "B", "C", "D"];
const sliced = arr1.slice(1, 3); // copy of index 1 and 2

console.log(sliced); // ["B", "C"]

// splice() method (modifies original)
const arr2 = ["A", "B", "C", "D"];
arr2.splice(1, 2); // delete 2 elements starting from index 1

console.log(arr2); // ["A", "D"] (original changed)


// *** Q.1 ***

const list = [10, 20, 30, 40];

const copy = list.slice(1, 3); // copy index 1 and 2 -> [20, 30]

console.log(copy.length); // 2
console.log(list.length); // 4

// *** Q.2 ***

const scores = [50, 60, 80, 90];

scores.splice(1, 2, 40);

console.log(scores); // [50, 40, 90]
console.log(scores.length); // 3


// *** Array Joining & Splitting (join & split). ***
/*
when creating web app dashboards or API parameters, we need to convert the array to a string, and the text string to an array:
1. join(separator) :-> joins all the elements of the array into a single string.
2. split(separator) :-> breaks the string and creates a new array of elements.
*/

// JOIN (Array -> string)
const tag = ["SOS", "DRONE", "GPS"];
const resultString = tag.join("-");
console.log(resultString); // "SOS-DRONE-GPS"

// SPLIT (string -> array)
const rawData = "Latitude, Longitude, Altitude";
const coordsArray = rawData.split(",");
console.log(coordsArray); // ["Latitude", "Longitude", "Altitude"]


// *** Q.1 ***

const coords = [28.7041, 77.1025];

const str = coords.join(",");
const backToArray = str.split(",");

console.log(backToArray.length); // 2
console.log(str); // "28.7041, 77.1025"


// *** Array Destructuring ***

/*
just like in object destructuring we extract values by { name }, in array destructuring we extract values by position (order) [first, second]:
*/

const locations = [28.7041, 77.1025];

// array destructuring by position:
const [lat, lng] = locations;

console.log(lat); // 28.7041
console.log(lng); // 77.1025

// *** Q.1 ***

const wayPoints = ["Base", "Waypoint-1", "Waypoint-2"];

const [start, next] = wayPoints;

console.log(next); // "Waypoint-1"


// *** Array Rest & Spread Operators (...) ***
/*
javascript's magical ... (three dots) operator works in two different ways:
1. Spread Operator :-> Unpacks an array and spreads its elements (to combine or duplicate the array).
2. Rest Operator :-> collects all the remaining elements and puts them into a new array (during destructuring).
*/

// SPREAD (unpacking)
const telemetry1 = ["GPS", "ALT"];
const fullTelemetry = [...telemetry1, "BATTERY"]
console.log(fullTelemetry); // ["GPS", "ALT", "BATTERY"]

// REST (gathering remaining elements)
const [primary, ...backup] = ["GSM", "LoRa", "NB-IoB"];

console.log(primary); // "GSM"
console.log(backup); // ["LoRa", "NB-IoB"]

// *** Q.1 ***

const signal = ["LoRa", "GSM", "Satellite"];

const [mainSignal, ...secondarySignal] = signal;

console.log(secondarySignal); // ["GSM", "Satellite"]
console.log(secondarySignal.length); // 2


// *** Array Concatenation vs. Mutability ***

/*
when working with arrays, it is critical to know which operations modify (mutate) the original array and which ones create a brand new one.
1. concat() :-> Combines two or more arrays and returns a new array. the original arrays remain untouched.
2. reverse() :-> Reverse the elements in place. it directly mutates (changes) the original array.
*/

// CONCAT (non-destructive)
const setA = [1, 2];
const setB = [2, 4];
const combine = setA.concat(setB);

console.log(combine); // [1, 2, 3, 4]
console.log(setA); // [1, 2] (original is safe)

// REVERSE (Destructive / Mutating)
const numbers = [10, 20, 30];
numbers.reverse();

console.log(numbers); // [30, 20, 10]

// *** Q.1 ***

const routeA = ["Base", "Point-1"];
const routeB = ["Point-2", "Target"];

const fullRoute = routeA.concat(routeB);

routeA.push("Point-X");

console.log(fullRoute.length); // 4
console.log(routeA.length); // 3
console.log(fullRoute); // ["Base", "Point-1, "Point-2", "Target"]
console.log(routeA); // ["Base", "Point-1", "Point-X"]