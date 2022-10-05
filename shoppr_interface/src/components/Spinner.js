import React from 'react';
import '../style.css';

function Spinner() {
    return (
        <div class="text-center">
            <div class="spinner-grow text-dark" style={{width: 10 + "rem", height: 10 +"rem", role:"status"}}>
                {/* <span class="sr-only">Loading...</span> */}
            </div>
        </div>
    );
}

export default Spinner;