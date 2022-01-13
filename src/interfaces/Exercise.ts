import Set from "./Set";

export default interface Exercise {
    id: number,
    name: string,
    type: string,
    sets: Set[]
}