import React from 'react';
import '../style.css';

function Product({item}) {
    function openInNewTab(url) {

        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
      }

    return (
        // <div class="col mb-5">
        //     <div class="card h-100">              
        //         <img class="card-img-top" src={item.product_img_url} alt={item.product_name} />
        //         <div class="card-body p-4">
        //             <div class="text-center">
        //                 {/* Product Name */}
        //                 <h5 class="fw-bolder">
        //                     {item.product_name}
        //                 </h5>
        //                     {/* Product price */}
        //                     $40.00 - $80.00
        //             </div>
        //         </div>
        //         {/* Product actions  */}
        //         <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        //             <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to wishlist</a></div>
        //         </div>
        //     </div>
        // </div>
        <div class="col mb-5" onClick={openInNewTab(item.product_url)}>
            <div class="card h-100">
                {item.unit_discount !== "0" && <div class="badge bg-info text-white position-absolute" style={{top: 0.5+"rem", right: 0.5+"rem"}}>{item.unit_discount} % </div> }
                <img class="card-img-top" src={item.product_img_url} alt={item.product_name} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <a href = {item.product_url} rel="noreferrer" target="_blank" style={{color: 'black'}}><h5 class="fw-bolder">{item.product_name}</h5></a>
                        <h6>{item.product_brand}</h6>
                        <span class="text-muted text-decoration-line-through">{item.unit_discount !== "0" && "$" + item.product_std_price}</span>
                    $ {item.product_sales_price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="">Add to wishlist</a></div>
                </div>
            </div>
        </div>
    );
}

export default Product;