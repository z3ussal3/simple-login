import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

const Profile = ({ location }) => {
    console.log(location);
    return (
        <>
            Profile <Link to='/login'>Login</Link>
        </>
    )
}

export default withRouter(Profile);