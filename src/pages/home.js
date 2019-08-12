import React from 'react';
import { Link } from "react-router-dom";

export default () => {
    return (
        <>
            Home <Link to='/login'>Logout</Link>
        </>
    )
}