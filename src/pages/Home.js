import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';

const Home = ({user}) => {

    const [api, setApi] = useState(new Api('https://localhost:7269'));

    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseType, setExerciseType] = useState('');

    useEffect(() => {
        (async () => {
            if(api) {
                const currentWorkout = await api.getCurrentWorkout(1);
                if(currentWorkout) {
                    setCurrentWorkout(currentWorkout);
                }
            }
        })();
    }, []);
    
    const startWorkout = async () => {
        if(api) {
            setCurrentWorkout(await api.addWorkout());
            setWorkoutStarted(true);
        }
    }

    const saveWorkout = () => {
        setWorkoutStarted(false);
    }

    const addExercise = async (name, type) => {
        if(api) {
            const newExercise = await api.addExercise(name, type);
            if(newExercise) {
                setExerciseName('');
                setExerciseType('');
            }
        }
    }

    return <div className="container">
        <div className="workout-container">
            <button onClick={() => startWorkout()}>Start a workout</button>

            {currentWorkout && (
                <div>
                    <div className="add-exercise-container">
                        <input type="text" placeholder="Name" value={exerciseName} onChange={e => setExerciseName(e.target.value)}/>
                        <input type="text" placeholder="Type" value={exerciseType} onChange={e => setExerciseType(e.target.value)}/>
                        <button onClick={() => addExercise(exerciseName, exerciseType)}>Add</button>
                    </div>
                    <button onClick={() => saveWorkout(user)}>Save workout</button>
                </div>
            )}
        </div>
    </div>
}

export default Home;