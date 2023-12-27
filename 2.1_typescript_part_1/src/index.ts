// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: { name: string; surname: string }) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: { products?: { name: string }[] }) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a: { name(): string, [anyKey: string]: any; }) {
    return "hey! i'm " + a.name();
}

hey({ name: () => "roma", cuteness: 100 });
hey({ name: () => "vasya", coolness: 100 });

// 4.2
interface Pet {
    name(): string;
    [anyKey: string]: any;
}

class Cat implements Pet {
    constructor(private nameCat: string, private coolness: boolean) { }

    name(): string {
        return this.nameCat;
    }
}

class Dog implements Pet {
    constructor(private nameDog: string, private coolness: number) { }

    name(): string {
        return this.nameDog;
    }
}

function hey_1(abstractPet: Pet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey_1(a)
hey_1(b)

// 4.3

// function hey_2(a:) {
//     return "hey! i'm " + a.name()
//         + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
// }
// hey_2({ name: () => "roma", type: "cat", cuteness: 100 })
// hey_2({ name: () => "vasya", type: "dog", coolness: 100 })

// 5.

// google for Record type
function stringEntries(a: Record<string, any> | []) {
    return Array.isArray(a) ? a : Object.keys(a);
}
// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))