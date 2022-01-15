import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Api from '../api';
import Exercise from '../components/Exercise';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';

const Home = ({user}) => {

    const [api, setApi] = useState(new Api('https://localhost:7269'));

    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [exerciseName, setExerciseName] = useState('');
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [workoutType, setWorkoutType] = useState('');

    useEffect(() => {
        (async () => {
            if(api) {
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
        console.log(workoutType);
        if(api && workoutType) {
            setCurrentWorkout(await api.addWorkout(workoutType));
            setWorkoutStarted(true);
        }
    }

    const saveWorkout = async () => {
        var saved = await api.saveWorkout(currentWorkout.id);
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
                    <FormSelect value={workoutType} onChange={e => setWorkoutType(e.target.value)}>
                        {workoutTypes && (
                            workoutTypes.map(x => <option value={x.id}>{x.name}</option>)
                        )}
                    </FormSelect>
                </div>
            ) : (
                <div>
                    <div className="add-exercise-container">
                        <p>Whats your next exercise</p>
                        <FormControl type="text" placeholder="Name" value={exerciseName} onChange={e => setExerciseName(e.target.value)}/>
                        <Button onClick={() => addExercise(exerciseName)}>Add</Button>
                    </div>
                    {currentWorkout.exercises && (
                        <div>
                            {currentWorkout.exercises.map(x => <Exercise key={x.id} name={x.name} sets={x.sets} addSet={(weight, reps) => addSet(x.id, weight, reps)}/>)}
                        </div>
                    )}
                    <Button onClick={() => saveWorkout()}>Save workout</Button>
                </div>
            )}
        </div>
    </div>
}

export default Home;