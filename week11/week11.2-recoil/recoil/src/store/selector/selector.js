import { selector } from "recoil";
import { counter } from "../atoms/counter";

export const atomSelector = selector({
    key:'counterSelector',
    get: ({ get })=> {
        const atom = get(counter)
        const isEven = (atom % 2 === 0)
        return isEven;
    }
})