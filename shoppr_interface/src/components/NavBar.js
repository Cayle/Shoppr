import React from 'react';
import '../style.css';
import {Link} from  'react-router-dom'
function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">SHOPPR</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        {/* <li class="nav-item"><Link to='' className='nav-link active'>Home</Link></li> */}
                        {/* <a class="nav-link active" aria-current="page" href="#!">Home</a> */}
                        <li class="nav-item"><Link className='nav-link' to='/about'>About</Link></li>
                        <li class="nav-item"><Link className='nav-link' to='/contact-us'>Contact Us</Link></li>
                        {/* <a class="nav-link" href="#!">About</a> */}
                        <li class="nav-item dropdown">
                            {/* <a class="nav-link dropdown-toggle" id="navbarDropdown" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a> */}
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">All Products</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex me-xl-4">
                        <Link className='nav-link btn btn-outline-dark' to='/register'>
                            <span style = { {'color':"black"}}>
                                <i class="bi bi-person-circle"></i>
                                Sign In
                             </span>
                        </Link>
                    </form>
                    {/* <span style={{'color': 'black', 'margin': 10+'px'}}>
                        Welcome, <b>user_two !</b>
                    </span> */}
                    <form class="d-flex">
                        <Link className='nav-link btn btn-outline-dark' to='/account'>
                            <span style = { {'color':"black"}}>
                                <i class="bi bi-person-circle"></i>
                                Log In
                             </span>
                        </Link>
                        {/* <Link className='nav-link btn btn-outline-dark' to='/logout'>
                            <span style = { {'color':"black"}}>
                                Log Out
                             </span>
                        </Link> */}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;