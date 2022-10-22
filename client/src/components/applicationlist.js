import React from 'react';


export const Applicationlist = (props) => {
    return (
        <div class="card text-center " >
            <div class="card-body">
                {props.text}
            </div>
        </div>
    );

}

export default Applicationlist;