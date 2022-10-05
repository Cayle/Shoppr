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

function App() {
  const initialState =  {
    search_word: "",
    number_of_results: 0,
    results: [],
  }
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  
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

    setState(prevState => {
      return { ...prevState, search_word: data.search_word, number_of_results: data.number_of_results, results: data.results }
    })
    console.log("finished the onSearch");
    setLoading(false)
    console.log(state.results);
  };


  function HomePage() {
    console.log("got to home page");
    return (
      <div>
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
              <ProductList items={state.results}/>
            </div>
          </section>
        </div>
    );
  }

  return (
    <div className="App">
      <NavBar/>
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
            {/* <Route path="red" element={<Red />} />
            <Route path="green" element={<Green />} />
            <Route path="purple" element={<Purple />} /> */}
         </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
