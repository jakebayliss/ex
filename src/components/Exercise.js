import React, { useState, useEffect } from 'react';

import '../styles/exercise.css';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

const Exercise = ({index, name, sets, addSet}) => {
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);

    return <AccordionItem className="exercise-container" eventKey={index}>
        <AccordionHeader>
            <p>Ex. {index + 1}: {name}</p>
        </AccordionHeader>
        <AccordionBody>
            <div className='set-control-container'>
                <Button style={{marginRight: '10px'}} onClick={() => addSet(weight, reps)}>Add</Button>
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
        </AccordionBody>
    </AccordionItem>
}

export default Exercise;