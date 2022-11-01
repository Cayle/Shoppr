import React, {useState}  from 'react';
import {Routes, Route, Link} from  'react-router-dom'
import './App.css';
import './style.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ShopprBase from './api/ShopprBase';
import About from './components/About';
import Spinner from './components/Spinner';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import LogIn from './components/LogIn';
import FilterBar from './components/FilterBar';
import { AuthContext } from './components/Context';

function App() {
  const initialState =  {
    search_word: "",
    number_of_results: 0,
    results: [],
  }

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [productItems, setProductItems] = useState([])

  // function onFilter(filter) {
  //   if (filter.store != '') {
  //     const filteredItemsOne = productItems.filter((item) => (item.product_brand === filter.store));
  //     setProductItems(filteredItemsOne);
  //   }
  //   console.log(productItems)
  //   const filteredItemsTwo = productItems.filter( (item) => (item.product_sales_price >= parseInt(filter.min_price) && item.product_sales_price <= parseInt(filter.max_price)));
  //   setProductItems(filteredItemsTwo);

  //   console.log(productItems)
  // }

  function onFilter(filter) {
    console.log("received the filters")
    console.log(filter)
  }
  
  const onSearch = async (text) => {
    console.log("got to app.js");
    // const response = await TestMovies.get("/", {
    //   params: { s: text, i: "tt3896198", apiKey: "1d36b0d6" },
    // });
    // const results = response.data.Search;
    // console.log(results);
    setState(initialState)
    setLoading(true)
    const response = await ShopprBase.get("/search/" + text);
    const data =  response.data;
    console.log(data);

    // setState( {search_word: data.search_word, number_of_results: data.number_of_results, results: data.results })
    setState(data)
    
    setLoading(false)
    console.log("These are state")
    console.log(state);
    const prodresults = state.results;
    setProductItems(data.results)
    console.log("these are the product items");
    console.log(productItems)
    console.log("finished the onSearch");

  };


  function HomePage() {
    console.log("got to home page");
    return (
      <div>
        <NavBar/>
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
              <Header/>
              <div className="text-center">
                <SearchBar onSearch = {onSearch}/>
              </div>
            </div>
          </header>
          <section className='py-5'>
            <div className='container mt-5'>
              { loading && <Spinner/>}
              { productItems.length != 0 && <FilterBar onFilter = {onFilter}/>}
              <ProductList items={productItems}/>
            </div>
          </section>
        </div>
    );
  }

  return (
    <AuthContext.Provider>
      <div className="App">
        
        {/* <li class="nav-item"><Link className='nav-link' to='/about'>About</Link></li> */}
        <div className='routes-wrapper'>
          {/** 
             * Add Router
             *        Add invidual Route for Orange, Red, Green and Purple
             * Note: Refer react documentation for examples on how to add Routes
             * This is where your child components will load
    */}
            <Routes>
              <Route exact path="/about" element={ <About/> } />
              <Route exact path='/contact-us' element= {<ContactUs/>} />
              <Route exact path='/' element = {HomePage()}/>
              <Route exact path='/register' element= {<Register/>} />
              <Route path='/account' element = {<LogIn/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
