import React from 'react';
import '../style.css';

function Header() {
     return (
        <div class="text-start text-white">
            <h1 class="display-4 fw-bolder">SHOPPR</h1>
            <p class="lead fw-normal text-white-50 mb-2">Your One-Stop-Shop for all online clothing tasks.</p>
            <p class="lead fw-normal text-white-50 mb-2">We know how daunting it can be searching through multiple online clothing retailer while looking for that outfit that perfectly matches your imagination. </p>
            <p class="lead fw-normal text-white-50 mb-2"><b>Shoppr</b> makes it easier for you. On here, you can search across multiple top clothing retailers in one platform, compare prices, and save your picks to a wishlist!</p>
        </div>
    );
}

export default Header;