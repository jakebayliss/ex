import React from "react";

import ReadonlyExercise from '../components/ReadonlyExercise';

import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const Workout = ({data}) => {
    return <Card>
        <CardHeader>
            {data.workoutType} | {new Date(data.createdDate).toLocaleString()}
        </CardHeader>
        {data.exercises && data.exercises.length > 0 && (
            <Card.Body>
                {data.exercises.map((x, i) => <ReadonlyExercise key={x.id} index={i} name={x.name} sets={x.sets} addSet={(weight, reps) => addSet(x.id, weight, reps)} />)}
            </Card.Body>
        )}
    </Card>
}

export default Workout;

