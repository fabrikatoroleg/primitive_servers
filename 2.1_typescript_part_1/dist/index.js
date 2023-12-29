"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello! I need to compile the following code correctly.");
/**
 * 1. Returns the length of the first word in a string.
 *
 * @param {string} a - The input string.
 * @returns {number} - The length of the first word.
 */
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
/**
 * 2. Returns a new object that contains two properties.
 *
 * @param {Object} a - An object with properties 'name' and 'surname'.
 * @property {string} a.name - The name property.
 * @property {string} a.surname - The surname property.
 * @returns {Object} - An object with properties 'fullname' and 'initials'.
 * @property {string} Object.fullname - The combined full name.
 * @property {string} Object.initials - The initials using the first letters of name and surname.
 */
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
/**
 * 3. Returns an array of product names from the "a" object.
 *
 * @param {Object} a - An object that may contain a 'products' property,
 *                    which is an array of objects with a 'name' property.
 * @property {Array<Object>} a.products - An array of objects with a 'name' property.
 * @property {string} a.products.name - The name property of each product.
 * @returns {Array<string>} - An array of product names.
 */
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
/**
 * Greets on adding a name using the name() method of object "a"
 *
 * @param {Person} a - An object implementing the Person interface.
 * @returns {string} - A greeting string.
 */
function hey(a) {
    return "hey! i'm " + a.name();
}
// Calling the hey() method with an object that has a name method and a 'cuteness' property
hey({ name: () => "roma", cuteness: 100 });
// Calling he hey() method with an object having a 'name' method and a 'coolness' property
hey({ name: () => "vasya", coolness: 100 });
/**
 * Represents a cat as a type of pet.
 *
 * @class
 * @implements {Pet}
 */
class Cat {
    /**
     * Creates a new Cat instance.
     *
     * @param {string} nameCat - The name of the cat.
     * @param {boolean} coolness - Property of a cat.
     */
    constructor(nameCat, coolness) {
        this.nameCat = nameCat;
        this.coolness = coolness;
    }
    /**
        * Returns the name of the cat.
        *
        * @returns {string} - The name of the cat.
        */
    name() {
        return this.nameCat;
    }
}
/**
 * Represents a dog as a type of pet.
 *
 * @class
 * @implements {Pet}
 */
class Dog {
    /**
    * Creates a new Dog instance.
    *
    * @param {string} nameDog - The name of the dog.
    * @param {number} coolness - Property of a dog.
    */
    constructor(nameDog, coolness) {
        this.nameDog = nameDog;
        this.coolness = coolness;
    }
    /**
    * Returns the name of the dog.
    *
    * @returns {string} - The name of the dog.
    */
    name() {
        return this.nameDog;
    }
}
/**
 * Greets on adding a pet name using the name() method of the "abstractPet" object.
 *
 * @param {Pet} abstractPet - An object implementing the Pet interface.
 * @returns {string} - A greeting string.
 */
function hey_1(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
// Creating a new Cat instance with the name "myavchik" and a coolness property set to true.
let a = new Cat("myavchik", true);
// Creating a new Dog instance with the name "gavchik" and a coolness property set to 333.
let b = new Dog("gavchik", 333);
// Calling the hey_1 function with the Cat instance 'a'.
hey_1(a);
// Calling the hey_1 function with the Dog instance 'b'.
hey_1(b);
/**
 * Generates a greeting with the appropriate properties of the object added to the string
 *
 * @param {PersonInfo} a - An object implementing the PersonInfo interface.
 * @returns {string} - A greeting string.
 */
function hey_2(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
// Calling the hey_2() method
hey_2({ name: () => "roma", type: "cat", cuteness: 100 });
hey_2({ name: () => "vasya", type: "dog", coolness: 100 });
/**
 * 5. Returns either an array of strings or an array of keys from the object.
 *
 * @param {string[] | Record<string, any>} a - An array of strings or an object with
 *                                             properties of any type.
 * @returns {Array<string>} - An array of strings.
 */
function stringEntries(a) {
    /* Uses a ternary operator to check the type of "a".
       If "a" is an array, returns it as is; otherwise, uses Object.keys to get an array of keys. */
    return Array.isArray(a) ? a : Object.keys(a);
}
/**
 * 6. Generates a string by repeating the "*" character a specified number of times.
 *
 * @param {number} a - The number of times the "*" character is repeated to form the string.
 * @return {Promise<string>} - A promise that resolves to a string consisting of repeated "*" characters.
 */
function world(a) {
    return __awaiter(this, void 0, void 0, function* () {
        return "*".repeat(a);
    });
}
/**
* Asynchronous function 'async' that returns a Promise resolving to a string of asterisks.
*
* @return {Promise<string>} - A promise that resolves to a string generated by the `world` function.
*/
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield world(10);
});
// Types for parameters "r" (string) and "e" (any type) to ensure proper type checking.
hello()
    .then((r) => console.log(r))
    .catch((e) => console.log("fail"));
