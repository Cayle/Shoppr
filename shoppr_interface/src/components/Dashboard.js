import React from 'react';
import '../style.css';
import UserNavbar from './UserNavbar';

function Dashboard({userInfo}) {
    console.log(userInfo);
     return (
        <div>
            <UserNavbar loginStatus= {true}  userInfo = {userInfo}/>
            <div>My Dashboard</div>
            <p> Username: {userInfo.username}; User ID: {userInfo.id} </p>
        </div>
        
    );
}

export default Dashboard;