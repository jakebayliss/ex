
import Exercise from "./exercise";
import User from "./User";

export default interface Workout {
    id: number,
    user: User,
    exercises: Exercise[]
}