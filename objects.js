// *** 1. Array of objects reference trap ***

const originalCart = [
    {id : 1, name: "Laptop", price: 32000 },
    {id : 2, name: "Phone", price: 12000 }
]

// ...originalCart creates a shallow copy of the array.
// It copies the array structure, but the inner objects are still the same objects in memory.
// So originalCart[0] and updateCart[0] both point to the same object.

const updateCart = [...originalCart];

// Action A
// Adds a new object only to updateCart.
// originalCart stays length 2.

updateCart.push({id : 3, name: "Watch", price: 5000 });

// Action B
// This changes the first inner object.
// Since both arrays reference the same object, originalCart[0].price also becomes 34000.

updateCart[0].price = 34000;

console.log(originalCart.length); // 2
console.log(originalCart[0].price); // 34000
console.log(updateCart.length); // 3
console.log(updateCart[2].price); // 5000

// key point: Shallow copy does not clone nested objects.



// *** 2. deleting properties & references ***

let player1 = {name: "virat", role: "Batsman"};

// player2 points to the same object as player1.
let player2 = player1;

// This deletes the role property from the shared object.
// Since both variables reference the same object, player1.role becomes undefined.

delete player2.role;

// This does NOT change player1.
// It reassigns player2 to a completely new object.
// So player1 stays as { name: "virat" } after deletion.

player2 = {name: "Rohit", role: "Captain"};

console.log(player1.role); // undefined
console.log(player1.name); // virat
console.log(player2); // {name: "Rohit", role: "Captain"}
console.log(player1); // {name: "virat"}

// Key point: delete affects the object itself.
// Reassigning a variable changes only that variable’s reference, not the original object.



// *** 3. object key overwrite & coercion trap. ***

const a = {};
const b = {name: "sk"};
const c = {name: "rk"};

// In JavaScript, object keys are strings.
// When you use an object as a key, JavaScript converts it to a string.

a[b] = 123;
a[c] = 456;

// b and c are objects.
// Both are converted to the same string: "[object Object]".
// So both assignments overwrite the same key.

console.log(a[b]); // Result is 456 because the second assignment overwrote the first.

// Key point: Object keys are not unique by object identity; they become strings.



// *** 4. object.freez() vs nested reference trap. ***

// Object.freeze() makes the top-level object immutable.
// But settings is a nested object, and it is still mutable because freeze is shallow.

const userProfile = Object.freeze({
    username: "coder_99", // Locked (Primitive)
    userpass: 1234, // Locked (Primitive)
    settings: { // Address pointer locked
        theme: "dark" // Unlocked (Nested Object)
    }
});

// These changes do not work because top-level properties are frozen.
userProfile.username = "pro_coder";
userProfile.userpass = 9876;

// This works because settings is a nested object and was not frozen.
userProfile.settings.theme = "light";

console.log(userProfile.username); // coder_99 
console.log(userProfile.userpass); // 1234
console.log(userProfile.settings.theme); // light

// Key point: Object.freeze() is shallow, not deep.



// *** 5. prototype vs own property lookup engine. ***

// childObj inherits from parentObj.
// It has a prototype link to parentObj.

const parentObj = {role: "Admin", accessLevel: 8 };
const childObj = Object.create(parentObj);

// Now childObj has its own role property.
// So childObj.role becomes "Editor" before checking the prototype.

childObj.role = "Editor";

// This deletes the child’s own property.
// Then JavaScript looks up the prototype chain and finds parentObj.role, which is "Admin".

delete childObj.role;

console.log(childObj.role); // Admin 
console.log(childObj.accessLevel); // 8

// Key point: delete removes only own properties, not prototype properties.



// *** 6. the object key property mutation. ***

const obj = {
    a: 1,
    b: 2
};

// obj[key] is same as obj["a"] → changes a to 10.
// obj.key creates a new property literally named "key", not "a".

const key = "a";
obj[key] = 10;
obj.key = 20;

console.log(obj.a); // 10
console.log(obj.key); // 20

/* Key point:
obj[key] uses variable value.
obj.key uses a literal property name. */



// *** 7. Object.assign() shallow copy trap. ***

const target = {a: 1, b: {c: 2}};
const source = {b: {c: 3}};

// This copies the top-level b property from source into target.
// It does not deep clone nested objects.
// So target.b now points to the same nested object as source.b.

Object.assign(target, source);

// Since both target.b and source.b reference the same nested object, target.b.c also becomes 99.
source.b.c = 99;

console.log(target.b.c);// 99

// Key point: Object.assign() is shallow.



// *** 8. Object.freeze() vs nested objects. ***

const user = {
    name: "Amit",
    address: {
        city: "Delhi"
    }
};

// Top-level user is frozen.
// But nested address object is not frozen.

Object.freeze(user);

// First assignment fails because name is frozen.
// Second assignment succeeds because nested object is mutable.

user.name = "Rahul"; 
user.address.city = "Mumbai";

console.log(user.name); // Amit
console.log(user.address.city); // Mumbai

// Key point: Freeze only affects the object you call it on, not deeply nested objects.



// 9. prototype global object property lookup.

const proto = {a: 10};

// objct inherits from proto.
const objct = Object.create(proto);

// JavaScript sees objct does not have its own a.
// It finds inherited a from the prototype.
// Then it creates or modifies a new own property on objct with value 11.
// So:
// objct.a becomes 11
// proto.a remains 10

objct.a++;

console.log(objct.a); // 11
console.log(proto.a); // 10

// Key point: Incrementing inherited property creates an own property on the child, without changing the prototype.
