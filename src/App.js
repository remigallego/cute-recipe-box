import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';

import {PanelGroup, Panel, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl} from './components/imports.jsx'
import RecipeList from './components/recipelist.jsx'
import {ModalEdit, ModalForm} from './components/modals.jsx'

// **** App
class App extends Component {
  constructor(props) {
    super(props)
    this.addRecipe        = this.addRecipe.bind(this);
    this.deleteRecipe     = this.deleteRecipe.bind(this);
    this.editRecipe       = this.editRecipe.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }


  state = {
    recipes: [],
    showAdd: false,
    newestRecipe: {name: "", ingredients: []}
  }

  // ComponentDidMount  Local Storage
  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({recipes: recipes})
    this.saveLocalStorage();
  }

  // Save Recipe list to Local Storage
  saveLocalStorage(updatedRecipe) {
    let recipes = updatedRecipe;
    if(recipes != undefined)
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }

  // Deletes a Recipe
  deleteRecipe(index) {
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    this.saveLocalStorage(recipes);
    this.setState(recipes: recipes);
  }

  // Add a recipe
  addRecipe(newrecipe) {
    let updatedrecipes = this.state.recipes;
    updatedrecipes.push(newrecipe);
    this.saveLocalStorage(updatedrecipes);
    this.setState({recipes: updatedrecipes})

  }

  // Edit a recipe
  editRecipe(recipe, index) {
    let recipes = this.state.recipes;
    recipes[index] = recipe;
    this.saveLocalStorage(recipes);
    this.setState({recipes : recipes})
  }

  // Render
  render() {
    return(
      <div className="App container">
        <RecipeList recipes={this.state.recipes} handleDel={this.deleteRecipe} handleEdit={this.editRecipe}/>
        <ModalForm handleAdd={this.addRecipe}/>
      </div>
    );
  }
}



export default App;
