export default class Api {
    constructor(url) {
        this.url = url;
    }

    getWorkoutTypes = async () => {
        const response = await fetch(`${this.url}/workouttypes`);
        if(response) {
            var types = await response.json();
            return types;
        }
        return null;
    }

    addWorkout = async (type) => {
        const data = {
            name: type
        }
        const response = await fetch(`${this.url}/workouts/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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

    saveWorkout = async (id) => {
        const response = await fetch(`${this.url}/workouts/${id}/save`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response) {
            return true;
        }
        return false;
    }

    addExercise = async (id, name) => {
        const data = {
            name: name
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

    addSet = async (workoutId, exerciseId, weight, reps) => {
        const data = {
            weight: weight,
            reps: reps
        }
        const response = await fetch(`${this.url}/workouts/${workoutId}/exercises/${exerciseId}/sets/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}
    