import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';
import Exercise from '../components/Exercise';
import Workout from '../components/Workout';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';
import { Accordion } from 'react-bootstrap';

const Home = ({user}) => {

    const [api, setApi] = useState(new Api('https://localhost:7269'));

    const [workouts, setWorkouts] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [exerciseName, setExerciseName] = useState('');
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [workoutType, setWorkoutType] = useState('');

    const [caloriesBurned, setCaloriesBurned] = useState(0);

    useEffect(() => {
        (async () => {
            if(api) {
                const workouts = await api.getWorkouts(1);
                if(workouts.length > 0) {
                    setWorkouts(workouts);
                    console.log(workouts);
                }
                const workoutTypes = await api.getWorkoutTypes();
                setWorkoutTypes(workoutTypes);
                const currentWorkout = await api.getCurrentWorkout(1);
                if(currentWorkout) {
                    setCurrentWorkout(currentWorkout);
                    console.log(currentWorkout);
                }
            }
        })();
    }, []);
    
    const startWorkout = async () => {
        if(api && workoutType) {
            console.log(workoutType);
            setCurrentWorkout(await api.addWorkout(workoutType));
        }
    }

    const saveWorkout = async () => {
        var saved = await api.saveWorkout(currentWorkout.id, caloriesBurned);
        if(saved) {
            setCurrentWorkout(null);
        }
    }

    const addExercise = async (name) => {
        if(api && name) {
            const newCurrentWorkout = await api.addExercise(currentWorkout.id, name);
            if(newCurrentWorkout) {
                setCurrentWorkout(newCurrentWorkout);
                setExerciseName('');
                setWorkoutType('');
            }
        }
    }

    const addSet = async (id, weight, reps) => {
        if(api) {
            const newCurrentWorkout = await api.addSet(currentWorkout.id, id, weight, reps);
            if(newCurrentWorkout) {
                setCurrentWorkout(newCurrentWorkout);
            }
        }
    }

    return <div className="container">
        <div className="workout-container">
            {!currentWorkout 
            ? (
                <div>
                    <Button onClick={() => startWorkout()}>Start a workout</Button>
                    <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                        <option></option>
                        {workoutTypes && (
                            workoutTypes.map((x, i) => <option key={i} value={x.name}>{x.name}</option>)
                        )}
                    </select>
                </div>
            ) : (
                <div>
                    {currentWorkout.workoutType == "Cardio" && (
                        <div className='cardio-container'>
                            Calories Burned: <input type='number' value={caloriesBurned} onChange={e => setCaloriesBurned(e.target.value)}/>
                        </div>
                    )}
                    {currentWorkout.workoutType == "Strength" && (
                        <div className='strength-container'>
                            <div className="add-exercise-container">
                                <p>Whats your next exercise</p>
                                <FormControl type="text" placeholder="Name" value={exerciseName} onChange={e => setExerciseName(e.target.value)}/>
                                <Button onClick={() => addExercise(exerciseName)}>Add</Button>
                            </div>
                            {currentWorkout.exercises && currentWorkout.exercises.length > 0 && (
                                <Accordion alwaysOpen>
                                    {currentWorkout.exercises.map((x, i) => <Exercise key={x.id} index={i} name={x.name} sets={x.sets} addSet={(weight, reps) => addSet(x.id, weight, reps)} />)}
                                </Accordion>
                            )}
                        </div>
                    )}
                    <Button onClick={() => saveWorkout()}>Save workout</Button>
                </div>
            )}
            {workouts && workouts.length > 0 && (
                <div>
                    {workouts.map(x => <Workout key={x.id} data={x}/>)}
                </div>
            )}
        </div>
    </div>
}

export default Home;