import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js'
import {PanelGroup, Panel, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl} from './imports.jsx'
import {ModalEdit, ModalForm} from './modals.jsx'

// **** RecipeList
class RecipeList extends Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this);
  }

  // Handle Edit a Recipe
  handleEdit(recipe, index) {
    this.props.handleEdit(recipe, index)
  }

  // Render
  render() {
    let recipes = this.props.recipes;
    if(recipes.length < 1)
      return(<div></div>);
    else
    {return(
    <div>
      <PanelGroup accordion id="accordion">
        {
          recipes.map((recipe, index)=>(
            <Panel eventKey={index} key={index} >
            <Panel.Heading>
            <Panel.Title toggle >{recipe.name}</Panel.Title>
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


}

export default RecipeList
