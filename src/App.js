// import "./key.txt";
import './App.css';
import Axios from "axios";
import React, { useState} from 'react';
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery]=useState("");
  const [recipes, setrecipes]=useState([])
  const YOUR_APP_ID = process.env.REACT_APP_ID
  const YOUR_APP_KEY= process.env.REACT_APP_KEY

  var url = `https://api.edamam.com/search?q=${query}&
app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
  async function getRecipes(){
    var result = await Axios.get(url); 
    setrecipes(result.data.hits); 
    console.log(result.data);
  }

  const onSubmit =(e) =>{
    e.preventDefault();
    getRecipes();
  }


  return (
    <div className="App">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
        type="text" className='app__input' placeholder="enter ingredient"
        value={query} onChange={(e)=> setquery(e.target.value)}
        />
        <input className='app__submit' type="submit" value="Search" />
      </form>
      <div>
      {recipes.map((recipe) =>{
        return <RecipeTile recipe={recipe} />;
      })}
      </div>
    </div>
  );
}

export default App;
