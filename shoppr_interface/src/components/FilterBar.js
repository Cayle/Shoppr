import React, {useState} from 'react';
import '../style.css';

function FilterBar({onFilter}) {

    const filterInit = { store: '', min_price: '', max_price:''}
    
    const [filters, setFilters] = useState(filterInit)

    function handleFilter(e) {
        console.log("entered handlefilter");
        console.log(filters);
        onFilter(filters);
        console.log("leave handleFilter");

    }

    return (
        <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center'>
            <div>
                <input type="text" 
                    onChange={(e) => {setFilters({min_price: e.target.value, max_price: filters.max_price, store: filters.store})}} 
                    value={filters.min_price} 
                    class="form-control" 
                    placeholder="Min price (in $)" 
                    aria-label="Min price" aria-describedby="basic-addon2"/>
            </div>
            <div>
                <input type="text" 
                    onChange={(e) => {setFilters({max_price: e.target.value, min_price: filters.min_price, store: filters.store})}} 
                    value={filters.max_price} 
                    class="form-control" 
                    placeholder="Max price (in $)" 
                    aria-label="Max price" aria-describedby="basic-addon2"/>
            </div>
            <div>
                <select 
                    class="form-select form-select-lg mb-3" 
                    aria-label=".form-select-lg example"
                    value={filters.store}
                    onChange={(e) => {setFilters({store: e.target.value, min_price: filters.min_price, max_price: filters.max_price})}}>
                    <option value ='' >Preferred store</option>
                    <option value="asos">Asos</option>
                    <option value="shein">Shein</option>
                </select>
            </div>
            <div>
                <button class="btn btn-outline-secondary" type="submit" onClick={handleFilter}>
                    <i class="bi bi-filter"></i>
                    Filter
                </button>
            </div>
            
        </div>
    );
}

export default FilterBar;