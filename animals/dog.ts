import Animal from '.';
import { makeRandomName } from '../core/utilities';

export default interface Dog extends Animal {
    woof(): void;
    name: string;
}

export default function createDog(): Dog {
    return ({
        size: "medium",
        woof: function(this: Dog) {
            console.log(`${this.name} says "Woof"!`);
        },
        name: makeRandomName()
    });
}

