// import "./key.txt";
import './App.css';
import Axios from "axios";
import React, { useState} from 'react';
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery]=useState("");
  const [recipes, setrecipes]=useState([])
  const [healthLabels, sethealthLabels]= useState("vegan")

  const YOUR_APP_ID = process.env.REACT_APP_ID
  const YOUR_APP_KEY= process.env.REACT_APP_KEY

  var url = `https://api.edamam.com/search?q=${query}&
app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=21&health=${healthLabels}`;
  
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
        <select className='app__healthLabels'>
          <option onClick={()=> sethealthLabels("vegan")}>Vegan</option>
          <option onClick={()=> sethealthLabels("vegetarian")}>Vegetarian</option>
          <option onClick={()=> sethealthLabels("paleo")}>Paleo</option>
          <option onClick={()=> sethealthLabels("gluten-free")}>Gluten-Free</option>
          <option onClick={()=> sethealthLabels("wheat-free")}>Wheat-Free</option>
          <option onClick={()=> sethealthLabels("egg-free")}>Egg-Free</option>
          <option onClick={()=> sethealthLabels("low-sugar")}>Low-Sugar</option>
        </select>
      </form>
      <div className='app__recipes'>
      {recipes.map((recipe) =>{
        return <RecipeTile key={recipe.totalWeight} recipe={recipe} />;
      })}
      </div>
    </div>
  );
}

export default App;
