import React, { useState, useEffect } from 'react';

import '../styles/exercise.css';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const Exercise = ({name, sets, addSet}) => {
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);

    return <div className="exercise-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3px'}}>
            <p>{name}</p>
        </div>
        <div className='set-control-container'>
            <Button style={{marginRight: '15px'}} onClick={() => addSet(weight, reps)}>Add</Button>
            <div className='set-control'>
                <p style={{marginRight: '5px'}}>Weight:</p><FormControl style={{width: '40px', padding: '5px'}} type="number" placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)}/>
            </div>
            <div className='set-control'>
                <p style={{marginRight: '5px'}}>Reps: </p><FormControl style={{width: '40px', padding: '5px'}} type="number" placeholder='Reps' value={reps} onChange={e => setReps(e.target.value)}/>
            </div>
        </div>
        {sets && sets.length > 0 && (
            <div className="set-container">
                {sets.map((x, i) => 
                    <div key={x.id} className='set'>
                        <p>Set {i + 1}</p>
                        <p>Weight: {x.weight}</p>
                        <p>Reps: {x.reps}</p>
                    </div>
                )}
            </div>
        )}

    </div>
}

export default Exercise;