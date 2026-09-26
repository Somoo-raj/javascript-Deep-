// *** Object Iteration Utilities (Object.keys, Object.values, Object.entries). ***

// the js V8 engine enables iterative processing by extracting object data inti arrays using these three methods.
// 1. Object.keys(obj) :-> Returns the array of key names (["id", "status"]).
// 2. Object.values(obj) :-> Returns the array of values (["D1", "ACTIVE"]).
// 3. Object.entries(obj) :-> Returns an array of inner arrays of key-value pairs.

const telemetry = {
    droneId : "RESCUE_01",
    altitude: 120,
    battery: 88
};

const keys = Object.keys(telemetry);
const values = Object.values(telemetry);
const entries = Object.entries(telemetry);

console.log(keys); // ["droneId", "altitude", "battery"]
console.log(values); // ["RESCUE_01", 120, 88]
console.log(entries);

// *** Q.1 ***

const droneConfig = {
    mode: "AUTONOMOUS",
    maxSpeed: 80,
    signalStrength: 95
};

const keysArray = Object.keys(droneConfig);
const valuesArray = Object.values(droneConfig);

console.log(keysArray.length); // 3
console.log(valuesArray[1]); // 80

// *** Object Immutability (Object.seal() vs Object.freeze()) ***

// In production applications, protecting state objects from accidental mutation is critical. js provides two levels of object protection:
// 1. Object.seal(obj) :-> Prevents adding new properties or deleting existing ones (add/delete disabled).
// 2. Object.freeze(obj) :-> Prevents adding, deleting, or updating properties. Make the entire top-level object completely read-only.

const userSession = Object.seal({ id: "S101", role: "GUEST" });
userSession.role = "ADMIN"; // Allowed (Modifying existing property works)
userSession.token = "XYZ"; // Ignored (Cannot add new properties)

const appLimits = Object.freeze({ maxRetries: 3, timeout: 5000 });
appLimits.maxRetries = 5; // Ignored (Ready-only object)

// *** Q.1 ***

const profile = Object.seal({ username: "alex", score: 50});
const rules = Object.freeze({ username: "alex", score: 50});

profile.score = 100;
rules.score = 100;

console.log(profile.score); // 100
console.log(rules.score); // 50 , no modifying

// *** Defensive Access (?. Optional Chaining & ?? Nullish Coalescing) ***

// When consuming external APIs or database payloads, missing keys can cause 'type error: can not read properties of undefined', crashing the aplications. We prevent crashes using two complementary features:

// 1. ?.(Optinal chaining): -> Immediately short-circuits and returns undefined if any parent reference in the chain is null or undefined, preventing runtime crashes.
// 2. ?? (Nullish Coalescing) :-> Assigns a default fallback value ONLY when the left side is null or undefined. Unlike ||, it trats 0 and false as valid values without overwriting them.

const apiRespons = {
    user: {
        unreadCount: 0,
        avatar: null
    }
};

// Optional chaining avoids crashing if user/address is missing
const city = apiRespons.user?.address?.city; // Returns undefined safely

// Nullish coalescing assigns defaults correctly
const count = apiRespons.user?.unreadCount ?? 10; // output: 0(0 is valid!)
const avatar = apiRespons.user?.avatar ?? "default.png"; // output: "default.png"

// *** Q.1 ***

const userPayload = {
    account: {
        loginCount: 0,
        preferredTheme: null
    }
};

const count1 = userPayload.account?.loginCount ?? 5;
const theme = userPayload.account?.preferredTheme ?? "dark";
const zipCode = userPayload.account?.address?.zipCode ?? "00000";

console.log(count1); // 0
console.log(theme); // dark
console.log(zipCode); // 0000


// *** Shallow copy vs Deep copy ***

// js objects are passed by reference, not by value in engine-level memory management. Modifying nested data requires understanding memory allocations:

// 1. {...obj} :-> Copies top-level properties to a new memory location.
// 2. Object.assign({}, obj) :-> Keeps nested objects/arrays linked to the same memory reference. chaining a nestedd value in the copy will also mutate the original.
// 3. structuredClone(obj) :-> Modern V8 native method whitch provides complite memory independence by recursively cloning every nested level.

const original = { name: "server1", config: { port: 8080}};
// shallow copy 
const shallow = {...original};
shallow.config.port = 900; // oroginal port become 900

// Deep copy
const deep = structuredClone(original);
deep.config.port = 300; // original safely untouched!


// *** Q.1 ***

const setting = {
    theme: "light",
    layout: { sidebar: true}
};

// shallow copy 
const userSetting = {...setting};

// Deep copy
const adminSetting = structuredClone(setting);

userSetting.layout.sidebar = false;

console.log(setting.layout.sidebar); // false
console.log(adminSetting.layout.sidebar); // true