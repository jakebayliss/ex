import React from 'react';

import Set from './Set';

import '../styles/exercise.css';

const ReadonlyExercise = ({index, name, sets}) => {

    return <div className="exercise-container">
        <p>Ex. {index + 1}: {name}</p>
        {sets && sets.length > 0 && (
            <div className="set-container">
                {sets.map((x, i) => <Set key={x.id} i={i} weight={x.weight} reps={x.reps} />)}
            </div>
        )}
    </div>
}

export default ReadonlyExercise;