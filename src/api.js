export default class Api {
    constructor(url) {
        this.url = url;
    }

    addWorkout = async () => {
        const response = fetch(`${this.url}/workouts/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    getCurrentWorkout = async (userId) => {
        const response = fetch(`${this.url}/user/${userId}/currentworkouts`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    addExercise = async (name, type) => {
        const exercise = {
            name: name,
            type: type
        }
        const response = await fetch(`${this.url}/exercises/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        });
        return await response.json();
    }
}
    