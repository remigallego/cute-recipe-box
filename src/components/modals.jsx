import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js'
import {PanelGroup, Panel, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl} from './imports.jsx'
import RecipeList from './recipelist.jsx'

class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow  = this.handleShow.bind(this)
    this.handleSave  = this.handleSave.bind(this)
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

  // Render
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

// Modal for the Form on 'Add Recipe'
class ModalForm extends Component {
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
  // todo: return validation error
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

export {ModalEdit, ModalForm}
