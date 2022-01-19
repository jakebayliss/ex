import React from "react";

const Set = ({i, weight, reps}) => {
    return <div className='set'>
        <p>Set {i + 1}</p>
        <p>Weight: {weight}</p>
        <p>Reps: {reps}</p>
    </div>
}

export default Set;