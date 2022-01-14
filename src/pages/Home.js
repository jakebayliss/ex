import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';

const Home = ({user}) => {

    const [api, setApi] = useState(new Api('https://localhost:7269'));

    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseType, setExerciseType] = useState('');
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        (async () => {
            if(api) {
                const currentWorkout = await api.getCurrentWorkout(3);
;                if(currentWorkout) {
                    setCurrentWorkout(currentWorkout);
                    console.log(currentWorkout);

                    if(currentWorkout.exerciseCount > 0) {
                        const exercises = await api.getCurrentExercises(currentWorkout.id);
                        if(exercises) {
                            setExercises(exercises);
                        }
                    }
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
            const newExercise = await api.addExercise(currentWorkout.id, name, type);
            if(newExercise) {
                setExerciseName('');
                setExerciseType('');
            }
        }
    }

    return <div className="container">
        <div className="workout-container">
            {!currentWorkout 
            ? (
                <button onClick={() => startWorkout()}>Start a workout</button>
            ) : (
                <div>
                    <div className="add-exercise-container">
                        <p>What your next exercise</p>
                        <input type="text" placeholder="Name" value={exerciseName} onChange={e => setExerciseName(e.target.value)}/>
                        <input type="text" placeholder="Type" value={exerciseType} onChange={e => setExerciseType(e.target.value)}/>
                        <button onClick={() => addExercise(exerciseName, exerciseType)}>Add</button>
                    </div>
                    {exercises && (
                        <div>
                            {exercises.map(x => <p>{x.name}</p>)}
                        </div>
                    )}
                    <button onClick={() => saveWorkout(user)}>Save workout</button>
                </div>
            )}
        </div>
    </div>
}

export default Home;