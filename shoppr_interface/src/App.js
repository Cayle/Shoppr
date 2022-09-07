import React, {useState}  from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import TestMovies from './api/TestMovies';
import ShopprBase from './api/ShopprBase';

function App() {
  const items  = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const initialState =  {
    search_word: "",
    number_of_results: 0,
    results: [],
  }
  const [state, setState] = useState(initialState);

  const onSearch = async (text) => {
    console.log("got to app.js");
    // const response = await TestMovies.get("/", {
    //   params: { s: text, i: "tt3896198", apiKey: "1d36b0d6" },
    // });
    // const results = response.data.Search;
    // console.log(results);

    const response = await ShopprBase.get("/search/" + text);
    const data =  response.data;
    console.log(data);

    setState(prevState => {
      return { ...prevState, search_word: data.search_word, number_of_results: data.number_of_results, results: data.results }
    })
    console.log("finished the onSearch");
    console.log(state.results);
  };
  return (
    <div className="App">
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
          <ProductList items={state.results}/>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;
