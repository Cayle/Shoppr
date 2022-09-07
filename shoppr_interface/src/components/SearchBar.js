import React, {useState} from 'react';
import '../style.css';

function SearchBar(props) {

    const {onSearch} = props;
    
    const [searchText, setSearchText] = useState('')
    
    const handleInput = (e) => {
        const text = e.target.value
        setSearchText(text)
    }
    
    const handleSearchResult = (e) => {
        if(e.key=== 'Enter') {
            console.log("1");
            console.log(searchText);
            onSearch(searchText)
            console.log("2");
        }
        // else if (searchText !== '') {
        //     onSearch(searchText)
        // }
    }

    return (
        // <form class="d-flex" width="70%">
            <div class="input-group my-sm-4">
                <input type="text" onChange={handleInput} onKeyPress={handleSearchResult} value={searchText} class="form-control" placeholder="Search something, e.g black jackets, white hoodies, etc" aria-label="Search Word" aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit" onClick={handleSearchResult}>
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
    );
}

export default SearchBar;