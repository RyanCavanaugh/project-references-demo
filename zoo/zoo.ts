import Animal from '../animals';
import { Dog } from '../animals';

export function createZoo(): Animal[] {
    return [
        Dog()
    ];
}

