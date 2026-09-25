// *** map() vs filter() vs reduce() ***
/*
1. map() :-> Transforms each element of the array and returns a new array of the same length.
2. filter() :-> Filters the elements according to the condition and return a new array (length can be geater or equel).
3. reduce() :-> Processes the entire array and aggregates it into a single value (Object, Number, Array).
*/

const telemetry = [
    {droneId: "D1", battery: 80, active: true},
    {droneId: "D2", battery: 15, active: false},
    {droneId: "D3", battery: 45, active: true}
];

// MAP: just remove ID and make a new list.
const droneIds = telemetry.map(d => d.droneId);
console.log(droneIds); // ["D1", "D2", "D3"]

//FILTER: just remove active drones.
const activeDrones = telemetry.filter(d => d.active === true);
console.log(activeDrones); // [{droneId: "D1", battery: 80, active: true},{droneId: "D3", battery: 45, active: true}]


// *** map() Transformation ***

const altitudesInMeters = [100, 200, 350];

// convert meters to feet (approx: meters * 3.28).
const altitudesInFeet = altitudesInMeters.map(alt => alt * 3.28);

console.log(altitudesInFeet); // [328, 656, 1148]
console.log(altitudesInFeet.length); // 3
console.log(altitudesInMeters[0]); // 100


// *** Array Shifting ***
/*
filter() expects true or false from the callback functions.
1. if the callback returns true, the item is included in the new array.
2. if it returns false, it is skipped.
*/

const batteryLevels = [85, 12, 45, 9, 90];

// Battery less then 15% needs emergency return-to-base (RTB)
const criticalDrones = batteryLevels.filter(level => level < 15);
console.log(criticalDrones); // [12, 9]


// *** Q.1 ***

const distanceToGeofence = [120, 45, 300, 15, 80];

// Danger zone: distance <= 50 meters.
const dangerAlert = distanceToGeofence.filter(dist => dist <= 50);
console.log(dangerAlert.length); // 2
console.log(dangerAlert[0]); // 45


// *** find() vs findIndex() ***
/*
find() and findIndex() are efficient when need only the first matching element instead of filtering the entire array. they stop the search as soon as a matching element is found (short-circuit).

1. find() :-> Return the first matching element (undefined if none is found).
2. findIndex() :-> Return the index of the first matching element (-1 if none is found).
*/

const drone = [
    { id: "D1", status: "IDLE"},
    { id: "D2", status: "EMERGENCY"},
    { id: "D3", status: "EMERGENCY"}
];

const alertDrone = drone.find(d => d.status === "EMERGENCY");
console.log(alertDrone.id); // D2 (got the first match, did not reach D3)

const alertIndex = drone.findIndex ( d => d.status === "EMERGENCY");
console.log(alertIndex); //

// *** Q.1 ***

const targets = [
    { code: "T1", priority: "LOW"},
    { code: "T2", priority: "HIGH"},
    { code: "T3", priority: "HIGH"}
];

const targetObj = targets.find( t => t.priority === "CRITICAL");
const targetIdx = targets.findIndex( t => t.priority === "HIGH" );

console.log(targetObj); // undefined
console.log(targetIdx); // 1


// *** some() vs every() (Boolean check) ***
/*
when we just need a quick true and false decision ofter checking the entire array (like sefty checks/pre-flight verification).

1. some() :-> Returns true if at least one element in the array satisfies the condition.
2. every() :-> Returns true if all elements in the array satisfy the condition.
*/

const dorneBattery = [90, 85, 40, 15];

// any drones on low battery ?
const hasLowBattery = dorneBattery.some( d => d < 20);
console.log(hasLowBattery); // true (15 is < 20)

// are all drones fully ready (>= 50%) ?
const allReady = dorneBattery.every(b => b >= 50);
console.log(allReady); // false (40 and 14 are < 50)


// *** Q.1 ***

const sensorStatuses = ["OK", "OK", "ERROR", "OK"];

const anyError = sensorStatuses.some( s => s === "ERROR");
const allSystemOk = sensorStatuses.every( s => s === "OK");

console.log(anyError); // true
console.log(allSystemOk); // false ("ERROR" === "OK" => false)


// *** reduce() - The Powerhouse Aggregator ***
/*
1. reduce() :-> the most versatile method is array sort. it traverses the entire array's elements and squeezes them into a single accumulated result (total number, combined object, aggregated count).
ex. -> array.reduce((accumulator, currentValue) => {
    return updatedAccumulator;
    }, initialValue);

1. accumulator :-> in this the calculated result of previous steps keeps accumulator.
2. initialValue :-> starting value from where the accumulator starts.
*/

const playloadWeights = [150, 200, 350]; // grams

// calculating totla playload weight across all attached.
const totalWeight = playloadWeights.reduce((sum, weight) => {
    return sum + weight;
}, 0); // initial value = 0

console.log(totalWeight); // 700


// *** Q.1 ***

const flightDistances = [10, 25, 15]; // kilometers

const totalFlightDistance = flightDistances.reduce((acc, dist) => {
    return acc + dist;
}, 5); // note: initial value is 5 (base offset)

/*
initial: acc = 5
iteration 1: acc = 5 + 10 => 15
iteration 2: acc = 15 + 25 => 40
iteration 3: acc = 40 + 15 => 55
*/
console.log(totalFlightDistance); // 55


// *** Chaining Array Method ***
// to clean raw data in real-world telemetry dashboards, chain multiple array methods into one line: .filter().map().

const fleet = [
    { id: "D1", battery: 90, active: true },
    { id: "D2", battery: 15, active: true },
    { id: "D3", battery: 80, active: false }
];

// filter active drones, then array map their IDs.

const activeDroneIds = fleet
.filter(d => d.active)
.map(d => d.id);

console.log(activeDroneIds); // ["D1", "D2"]


const waypoints = [
    { name: "Aplha", alt: 120 },
    { name: "Beta", alt: 80 },
    { name: "Gamma", alt: 150 }
];

// filter waypoints with alt > 100, then map to their upperCase names.

const highAltNames = waypoints
.filter(w => w.alt > 100)
.map(w => w.name.toUpperCase());

console.log(highAltNames.length); // 2
console.log(highAltNames[0]); // ALPHA


// *** flat() & flatMap() (Nested Telemetry Flattening) ***
/*
1. flat() :-> Opens nested arrays and converts them into single-level arrays. the default depth is 1.
2. flatMap() :-> Performs both map processing and single-level flattening in a single pass.
*/

const chunkedCroods = [[28.70, 77.10], [28.71, 77.11]];

const flatCoords = chunkedCroods.flat();
console.log(flatCoords); // [28.70, 77.10, 28.71, 77.11]

// *** Q.1 ***

const missionLogs = [
    ["Launch", "Check1"],
    ["TargetFound"],
    ["Return"]
];

const allEvents = missionLogs.flat(); // (converted single-level arrays => ["Launch", "Check1", "TargetFound", "Return"])

console.log(allEvents.length); // 4
console.log(allEvents[2]); // "TargetFound"


// *** Sorting arrays (sort() pitfall) ***
/*
The sort() method is used to sort arrays, but it has one major problem (pitfall):
by default, sort() treats array elements as strings and sorts them alphabetically

for correct numerical sorting, need to pass a Comparator callback function (a, b) => a - b :
*/

const signalStrengths = [100, 25, 5, 80];

// Default sort (STRING alphabetical conversion - BUGGY for numbers!)
console.log([...signalStrengths].sort()); // [100, 25, 5, 80] ("100" comes before "25" alphabetically!)

// Correct Numerical Sort (Ascending)
const sortedAsc = [...signalStrengths].sort((a,  b) => a - b);
console.log(sortedAsc); // [5, 25, 80, 100]


const batteries = [40, 100, 15, 85];

// sort in Descending order (Highest battery first)
batteries.sort((a, b) => b - a); // [100, 85, 40, 15]

console.log(batteries[0]); // 100
console.log(batteries[3]); // 15


// *** mutable vs immutable methods mindset ***

// toSorted(), toReversed(), toSpliced() => ES2023 has newer immutable methods that sort/reverse without making the original mutable.


const activeDrone = ["D1", "D2", "D3"];

// Line A: slice (immutable)
const backupList = activeDrone.slice(0, 2);

// Line B: pop (mutable)
activeDrone.pop();

console.log(activeDrone.length); // 2
console.log(backupList.length); // 2


// *** Array Chaining & Memory Management ***

const drones = [
    { id: "Alpha", battery: 12, speed: 45 },
    { id: "Beta", battery: 85, speed: 60 },
    { id: "Gamma", battery: 40, speed: 30 }
];

// Telemetry Pipeline:
// 1. Filter low battery (< 50)
// 2. Map to extract object with ID and speed doubled
// 3. Sort by speed descending (a - b)

const emergencyBoost = drones
.filter(d => d.battery < 50)
.map(b => ({ id: b.id, boostedSpeed: b.speed * 2})) // [{ id: "Alpha", boostedSpeed: 90 }, {id: "Gamma", BoostedSpeed: 60 }]
.sort((a, b) => b.boostedSpeed - a.boostedSpeed);

console.log(emergencyBoost[0].id); // Alpha
console.log(emergencyBoost.length); // 2
console.log(emergencyBoost);