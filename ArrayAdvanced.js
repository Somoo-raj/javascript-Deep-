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
