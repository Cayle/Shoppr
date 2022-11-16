import React from 'react';
import '../style.css';

function WishlistProduct({item}) {
    function openInNewTab(url) {

        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
      }

    return (
        <div class="col mb-5" onClick={openInNewTab(item.url)}>
            <div class="card h-100">
                {item.unit_discount !== "0" && <div class="badge bg-info text-white position-absolute" style={{top: 0.5+"rem", right: 0.5+"rem"}}>{item.unit_discount} % </div> }
                <img class="card-img-top" src={item.image_url} alt={item.name} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <a href = {item.url} rel="noreferrer" target="_blank" style={{color: 'black'}}><h5 class="fw-bolder">{item.name}</h5></a>
                        <h6>{item.store}</h6>
                        <span class="text-muted text-decoration-line-through">{item.unit_discount !== "0" && "$" + item.standard_price}</span>
                        $ {item.sales_price}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishlistProduct;