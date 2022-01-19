import React from 'react';

import Set from './Set';

import '../styles/exercise.css';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const ReadonlyExercise = ({index, name, sets}) => {

    return <Card className="exercise-container">
        <CardHeader>Ex. {index + 1}: {name}</CardHeader>
        {sets && sets.length > 0 && (
            <Card.Body className="set-container">
                {sets.map((x, i) => <Set key={x.id} i={i} weight={x.weight} reps={x.reps} />)}
            </Card.Body>
        )}
    </Card>
}

export default ReadonlyExercise;