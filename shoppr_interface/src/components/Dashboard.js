import {useState, useEffect, React} from 'react';
import '../style.css';
import UserNavbar from './UserNavbar';
import axios from 'axios';
import WishlistProductList from './WishlistProductList';
function Dashboard({userInfo}) {
    console.log(userInfo);

    const [wishlistData, setWishlistData] = useState([])
    const [refinedWishlist, setRefinedWishlist] = useState([])

    function getUserWishList() {
        axios.get("http://127.0.0.1:8000/shoppr/wishlists/" + userInfo.id)
        .then(function(response) {
            console.log(response.data)
            const wishlist_data = response.data.map( (res) => {return res.fields})
            setWishlistData(() => (wishlist_data))

        }).catch(function(error) {
            console.log(error)
        });

        // const refinedData = wishlistData.map( (data) => { return {product_brand: d} })

    }
    useEffect(() => {
        getUserWishList();
    }, [])
    
    console.log(wishlistData);
     return (
        <div>
            <UserNavbar loginStatus= {true}  userInfo = {userInfo}/>
            <div>Your Dashboard</div>
            {/* <p> Username: {userInfo.username}; User ID: {userInfo.id} </p> */}
            <h3 className={ {'text-align': 'left'} }>{userInfo.username}'s wishlist</h3>
            <hr></hr>
            <WishlistProductList items = {wishlistData} />
        </div>
        
    );
}

export default Dashboard;