import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    return (
        <>
            <div className='mainpage-div'>
                <Link to="/login" type="button" class="btn btn-primary ms-3" >Student Login</Link>
                <Link to="/signup" type="button" class="btn btn-secondary ms-3">Student SignUp</Link>

                <Link to="/admin/login" type="button" class="btn btn-info ms-3" >Admin Login</Link>
            </div>
        </>
    )
}
