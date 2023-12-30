console.log("Hello! I need to compile the following code correctly.");
/**
 * Task 2.1.1
 * Returns the length of the first word in a string.
 *
 * @param {string} a - The input string.
 * @returns {number} - The length of the first word.
 */
function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}


/**
 * Task 2.1.2
 * Returns a new object that contains two properties.
 *
 * @param {Object} a - An object with properties 'name' and 'surname'.
 * @property {string} a.name - The name property.
 * @property {string} a.surname - The surname property.
 * @returns {Object} - An object with properties 'fullname' and 'initials'.
 * @property {string} Object.fullname - The combined full name.
 * @property {string} Object.initials - The initials using the first letters of name and surname.
 */
function getUserNamings(a: { name: string; surname: string }): { fullname: string; initials: string } {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}


/**
 * Task 2.1.3
 * Returns an array of product names from the "a" object.
 *
 * @param {Object} a - An object that may contain a 'products' property,
 *                    which is an array of objects with a 'name' property.
 * @property {Array<Object>} a.products - An array of objects with a 'name' property.
 * @property {string} a.products.name - The name property of each product.
 * @returns {Array<string>} - An array of product names.
 */
function getAllProductNames(a: { products?: { name: string }[] }): string[] {
    return a?.products?.map(prod => prod?.name) || [];
}


/*
     Task 2.1.4
     easy way is using 'as' keyword
     hard way is ?...
     define a separate interface for the type of object passed to the function
*/

/**
 * Task 2.1.4.1 
 * Defines the interface for an object with a 'name' method and additional properties of any type.
 *
 * @interface
 */
interface Person {
    /**
     * Returns a string representing the name.
     *
     * @returns {string} - The name string.
     */
    name(): string;
    cuteness?: number;
    coolness?: number;
}
/**
 * Greets on adding a name using the name() method of object "a"
 *
 * @param {Person} a - An object implementing the Person interface.
 * @returns {string} - A greeting string.
 */
function hey(a: Person): string {
    return "hey! i'm " + a.name();
}
// Calling the hey() method with an object that has a name method and a 'cuteness' property
hey({ name: () => "roma", cuteness: 100 });
// Calling he hey() method with an object having a 'name' method and a 'coolness' property
hey({ name: () => "vasya", coolness: 100 });


/**
 * Task 2.1.4.2 
 * Defines the interface Pet with a 'name' method and additional properties of any type.
 *
 * @interface
 */
interface Pet {
    /**
   * Returns a string representing the pet's name.
   *
   * @returns {string} - The name of the pet.
   */
    name(): string;
    [anyKey: string]: any;
}

/**
 * Represents a cat as a type of pet.
 *
 * @class
 * @implements {Pet}
 */
class Cat implements Pet {
    /**
     * Creates a new Cat instance.
     *
     * @param {string} nameCat - The name of the cat.
     * @param {boolean} coolness - Property of a cat.
     */
    constructor(protected nameCat: string, protected coolness: boolean) { }
    /**
    * Returns the name of the cat.
    *
    * @returns {string} - The name of the cat.
    */
    name(): string {
        return this.nameCat;
    }
}

/**
 * Represents a dog as a type of pet.
 *
 * @class
 * @implements {Pet}
 */
class Dog implements Pet {
    /**
    * Creates a new Dog instance.
    *
    * @param {string} nameDog - The name of the dog.
    * @param {number} coolness - Property of a dog.
    */
    constructor(protected nameDog: string, protected coolness: number) { }
    /**
    * Returns the name of the dog.
    *
    * @returns {string} - The name of the dog.
    */
    name(): string {
        return this.nameDog;
    }
}

/**
 * Greets on adding a pet name using the name() method of the "abstractPet" object.
 *
 * @param {Pet} abstractPet - An object implementing the Pet interface.
 * @returns {string} - A greeting string.
 */
function hey_1(abstractPet: Pet): string {
    return "hey! i'm " + abstractPet.name();
}
// Creating a new Cat instance with the name "myavchik" and a coolness property set to true.
let a = new Cat("myavchik", true)
// Creating a new Dog instance with the name "gavchik" and a coolness property set to 333.
let b = new Dog("gavchik", 333)
// Calling the hey_1 function with the Cat instance 'a'.
hey_1(a)
// Calling the hey_1 function with the Dog instance 'b'.
hey_1(b)


/**
 * Task 2.1.4.3 
 * Defines the interface for information about a person.
 *
 * @interface
 */
interface PersonInfo {
    /**
     * Returns a string representing the name.
     *
     * @returns {string} - The name string.
     */
    name: () => string;
    /**
     * The type of the entity (e.g., 'cat' or 'dog').
     *
     * @type {"cat" | "dog"}
     */
    type: "cat" | "dog";
    /**
    * The cuteness factor (applicable for 'cat' type).
    *
    * @type {number}
    */
    cuteness?: number;
    /**
     * The coolness factor (applicable for 'dog' type).
     *
     * @type {number}
     */
    coolness?: number;
}

/**
 * Generates a greeting with the appropriate properties of the object added to the string
 *
 * @param {PersonInfo} a - An object implementing the PersonInfo interface.
 * @returns {string} - A greeting string.
 */
function hey_2(a: PersonInfo): string {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
// Calling the hey_2() method
hey_2({ name: () => "roma", type: "cat", cuteness: 100 })
hey_2({ name: () => "vasya", type: "dog", coolness: 100 })


/**
 * Task 2.1.5
 * Returns either an array of strings or an array of keys from the object.
 *
 * @param {string[] | Record<string, any>} a - An array of strings or an object with
 *                                             properties of any type.
 * @returns {Array<string>} - An array of strings.
 */
function stringEntries(a: string[] | Record<string, any>): string[] {
    /* Uses a ternary operator to check the type of "a".
       If "a" is an array, returns it as is; otherwise, uses Object.keys to get an array of keys. */
    return Array.isArray(a) ? a : Object.keys(a);
}


/**
 * Task 2.1.6
 * Generates a string by repeating the "*" character a specified number of times.
 *
 * @param {number} a - The number of times the "*" character is repeated to form the string.
 * @return {Promise<string>} - A promise that resolves to a string consisting of repeated "*" characters.
 */
async function world(a: number): Promise<string> {
    return "*".repeat(a)
}

/**
* Asynchronous function 'async' that returns a Promise resolving to a string of asterisks.
*
* @return {Promise<string>} - A promise that resolves to a string generated by the `world` function.
*/
const hello: () => Promise<string> = async (): Promise<string> => {
    return await world(10);
};
// Types for parameters "r" (string) and "e" (any type) to ensure proper type checking.
hello()
    .then((r: string) => console.log(r))
    .catch((e: any) => console.log("fail"));  