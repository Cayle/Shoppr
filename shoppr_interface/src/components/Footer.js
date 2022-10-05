import React from 'react';
import '../style.css';

function Footer() {
    return (
        <footer class="py-5 bg-dark" style = { {'position': 'fixed', 'bottom': 0, 'width': '100%', 'margin-top': 20} }>
            <div class="container">
                <p class="m-0 text-center text-white">
                    Copyright &copy; Shoppr 2022
                </p>
            </div>
        </footer>
    );
}

export default Footer;