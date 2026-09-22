// 1. Array of objects reference trap

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

// 2. deleting properties & references

let player1 = {name: "virat", role: "Batsman"};
let player2 = player1;

delete player2.role; // delete string value and return undefined.

player2 = {name: "Rohit", role: "Captain"}; // the pointer for player2 shifted to the new memory address.

console.log(player1.role); // undefined
console.log(player1.name); // virat
console.log(player2); // {name: "Rohit", role: "Captain"}
console.log(player1); // {name: "virat"}

// 3. object key overwrite & coercion trap.

const a = {};
const b = {name: "sk"};
const c = {name: "rk"};
// js object keys are always strings, when try to use an object as a keys like => a[b], the js engine converts that object into a string that is => a.toString() => ["[object object]"]
a[b] = 123; // a["[object object]"] = 123 
a[c] = 456; // a["[object object"] = 456 (same key overwrite)
console.log(a[b]); // 456

// 4. object.freez() vs nested reference trap.

const userProfile = Object.freeze({
    // Object.freeze() performs a shallow freeze!, top-level keys like (username,userpass or settings) get frozen(locked no delete no changes of this keys value), but nested objects (such as the object inside 'settings') remain mutable in memory. they can still be modified!. => (Object.freeze() => specially uses for nested object and array)

    username: "coder_99", // Locked (Primitive)
    userpass: 1234, // Locked (Primitive)
    settings: { // Address pointer locked
        theme: "dark" // Unlocked (Nested Object)
    }
});

// can not modified.
userProfile.username = "pro_coder";
// can not modified.
userProfile.userpass = 9876;
// keys inside nested object remain mutable in memory can still be modified.
userProfile.settings.theme = "light";
console.log(userProfile.username); // coder_99 
console.log(userProfile.userpass); // 1234
console.log(userProfile.settings.theme); // light

// 5. prototype vs own property lookup engine.

const parentObj = {role: "Admin", accessLevel: 8 };
// Object.create() creates a new object and sets the prototype(_proto_) of that new object to the old object (child inherit from parent)
const childObj = Object.create(parentObj);

childObj.role = "Editor"; // child => "Editor" --> (prototype link) --> parent => "Admin"

// the `delete` keyword only removes an object's 'Own' property, it cannot touch properties within the prototype chain. once the own property is deleted, the engine retrieves the callback value from the prototype chain!.
delete childObj.role; // if child.role("Editor") deleted. then pass --> (prototype link) --> parent.role => ("Admin")

console.log(childObj.role); // Admin 
console.log(childObj.accessLevel); // 8

// 6. the object key property mutation.

const obj = {
    a: 1,
    b: 2
};

const key = "a";
obj[key] = 10; // obj.a = 10 (updated)
obj.key = 20; // 20  (dot(.) nation doesn't look for a variable instead, it directly creates a new property named "key" and sets its value to 20!.)

console.log(obj.a); // 10
console.log(obj.key); // 20

// 7. Object.assign() shallow copy trap

const target = {a: 1, b: {c: 2}};
const source = {b: {c: 3}};
// Object.assign() performs a shallow copy. A memory reference to the inner object {c: 3} is passed, not a new copy.

Object.assign(target, source); // overwrite target.b with source.b. now target.b is directly pointing (referencing) to the nested object {c: 3} containing source.b
source.b.c = 99; // after that, when did source.b.c also changed to 99 bCoz the reference was the same.

console.log(target.b.c);// 99

// 8. Object.freeze() vs nested objects.

const user = {
    name: "Amit", // freeze 1st property (Primitive)
    address: {    // address pointer freeze 
        city: "Delhi" // nested objects property unfreeze they can modify
    }
};

Object.freeze(user);

user.name = "Rahul"; 
user.address.city = "Mumbai";

console.log(user.name); // Amit
console.log(user.address.city); // Mumbai

// 9. prototype global object property lookup.

const proto = {a: 10};
const objct = Object.create(proto); // copy proto object and return new own object

objct.a++; // modified only own objct property not proto property.

console.log(objct.a); // 11
console.log(proto.a); // 10