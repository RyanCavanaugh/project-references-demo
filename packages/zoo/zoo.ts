// import Animal from '../animals/index';
import { Dog, createDog } from '@example/animals';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}

