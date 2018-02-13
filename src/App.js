import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';

import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'

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

  // Add recipe
  addRecipe(newrecipe) {
    let updatedrecipes = this.state.recipes;
    updatedrecipes.push(newrecipe);
    this.saveLocalStorage(updatedrecipes);
    this.setState({recipes: updatedrecipes})

  }

  editRecipe(recipe, index) {
    let recipes = this.state.recipes;
    recipes[index] = recipe;
    this.saveLocalStorage(recipes);
    this.setState({recipes : recipes})
  }

  // Render
  render() {
  const {recipes} = this.state;

    return(
      <div className="App container">
        <RecipeList recipes={this.state.recipes} handleDel={this.deleteRecipe} handleEdit={this.editRecipe}/>
        <ModalForm handleAdd={this.addRecipe}/>
      </div>
    );
  }
}


// **** RecipeList
class RecipeList extends App {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this);
  }
  render() {
    let recipes = this.props.recipes;
    if(recipes.length < 1)
    {
      return(<div></div>);

    }
    else

    {return(
    <div>
      <PanelGroup accordion id="b">
        {
          recipes.map((recipe, index)=>(
            <Panel eventKey={index} key={index} >
            <Panel.Heading>
            <Panel.Title toggle>{recipe.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ol>
                {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
                ))}
              </ol>
              <div id="del-edit-buttons">
                <button id="fabtn" onClick={(e)=>this.props.handleDel(index)}><i className="fas fa-trash-alt" ></i></button>
                <ModalEdit recipe={recipe} index={index} edit={this.handleEdit}/>
              </div>
            </Panel.Body>
            </Panel>
          ))
        }

      </PanelGroup>
    </div>
    )}
  }

  handleEdit(recipe, index) {
    this.props.handleEdit(recipe, index)
  }

}

// Modal for the Edit Button
class ModalEdit extends RecipeList {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleSave = this.handleSave.bind(this)

  }
  state = {
    showEdit: false,
    recipe: this.props.recipe,
  }

  // Closes Modal
  handleClose() {
    this.setState({showEdit: false})
  }

  // Open Modal
  handleShow() {
  this.setState({showEdit: true})
  }

  // Handle Change
  handleChange(field, value) {
    let updatedRecipe = this.state.recipe;
    updatedRecipe[field] = value;
    this.setState({recipe: updatedRecipe})
  }

  // Handle Save
  handleSave() {
    if(this.state.recipe.name === "" || this.state.recipe.ingredients.join() === "")
  {  }
  else
{    this.props.edit(this.state.recipe, this.props.index)
    this.handleClose();}

  }


  render() {

    return(
<div>
  <button onClick={this.handleShow} id="fabtn"><i className="fas fa-edit"></i></button>
  <Modal show={this.state.showEdit} onHide={this.handleClose}>

    <Modal.Header closeButton>
    <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <FormGroup >
          <ControlLabel>Recipe Name</ControlLabel>
          <FormControl
          type="text"
          value={this.state.recipe.name}
          placeholder= "Enter Recipe Name"
          onChange= {(e) => this.handleChange("name", e.target.value)}
          >
        </FormControl>
        <ControlLabel>Ingredients <i id="syntax">(Syntax: Tomato,Carrots,Cheese)</i></ControlLabel>
        <FormControl
        type="textarea"
        value={this.state.recipe.ingredients}
        placeholder= "Enter Ingedients"
        onChange= {(e) => this.handleChange("ingredients", e.target.value.split(","))}
        >
      </FormControl>
        </FormGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.handleSave}>Submit</Button>
    </Modal.Footer>
  </Modal>
</div>
  )
  }

}




// Modal for the Form
class ModalForm extends App {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this);
  }

  state = {
    showAdd: false,
    newestRecipe: {name: "", ingredients: []}
  }

  // Closes Modal
  handleClose() {
    this.setState({showAdd: false})
  }

  // Open Modal
  handleShow() {
  this.setState({showAdd: true})
  }

  // Handle add
  handleChange(field, value) {
    let updatedRecipe = this.state.newestRecipe;
    updatedRecipe[field] = value;

    this.setState({newestRecipe: updatedRecipe})

  }

  // Save new recipe
  handleSave() {
    if(this.state.newestRecipe.name === "" || this.state.newestRecipe.ingredients.length < 1)
    {
    // return validation error
    }
    else {
    this.props.handleAdd(this.state.newestRecipe)
    this.handleClose();
    this.setState({newestRecipe: {name: "", ingredients: []}})
  }
  console.log(this.state.newestRecipe.name);
  }

  render() {
    return(
<div>
  <button onClick={this.handleShow}>Add Recipe</button>
  <Modal show={this.state.showAdd} onHide={this.handleClose}>

    <Modal.Header closeButton>
      <Modal.Title>Add Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <FormGroup>
          <ControlLabel>Recipe Name</ControlLabel>
          <FormControl
          type="text"
          value={this.state.newestRecipe.name}
          placeholder= "Enter Recipe Name"
          onChange= {(e) => this.handleChange("name", e.target.value)}
          >
        </FormControl>
        <ControlLabel>Ingredients <i id="syntax">(Syntax: Tomato,Carrots,Cheese)</i></ControlLabel>
        <FormControl
        type="textarea"
        value={this.state.newestRecipe.ingredients}
        placeholder= "Enter Ingedients"
        onChange= {(e) => this.handleChange("ingredients", e.target.value.split(","))}
        >
      </FormControl>
        </FormGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.handleSave}>Submit</Button>
    </Modal.Footer>
  </Modal>
</div>
  )
  }
}

export default App;
