export default class Api {
    constructor(url) {
        this.url = url;
    }

    addWorkout = async () => {
        const response = await fetch(`${this.url}/workouts/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    getCurrentWorkout = async (userId) => {
        const response = await fetch(`${this.url}/user/${userId}/currentworkouts`);
        if(response) {
            var current = await response.json();
            return current;
        }
        return null;
    }

    addExercise = async (id, name, type) => {
        const data = {
            name: name,
            type: type
        }
        const response = await fetch(`${this.url}/workouts/${id}/exercises/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    getCurrentExercises = async (id) => {
        const response = await fetch(`${this.url}/workouts/${id}/currentexercises`);
        if(response) {
            var current = await response.json();
            return current;
        }
        return null;
    }
}
    