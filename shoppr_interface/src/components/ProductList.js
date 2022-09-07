import React from 'react';
import '../style.css';
import Product from './Product';


function ProductList({items}) {
    return (
        <div>
            <h5 class="lead fw-normal text-white-50 mb-2">{items.search_word}</h5>
            <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center'>
                {items.map((item) => (<Product key={item.product_id} item={item}/>) )}
            </div>  
        </div>
    );
}

export default ProductList;