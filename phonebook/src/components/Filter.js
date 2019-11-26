import React from 'react'

const Filter = (props) =>(
    <div>
        filter shown by <input value={props.search} onChange={props.onChange} /> 
    </div>
)

export default Filter