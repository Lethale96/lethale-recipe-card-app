import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import firebase from "firebase/app";
import "../firebase/firebase.js";

const RecipesContainer = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("recipes");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(false);

  function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRecipes(items); //The error is here, and everything i have read about this error has to do with JSX
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);

  const saveRecipe = async (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients.split(",");

    await ref.collection("recipes").doc("recipes.id").add({
      title,
      ingredients: ingredientsArray,
    });
    setTitle("");
  };

  const handleTitleChange = (e) => {
    console.log(e.target.value);
  };
  const handleIngredientsChange = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    var editRecipe = {
      title: handleTitleChange,
      ingredients: handleIngredientsChange,
    };
    console.log(editRecipe);
  };

  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <Accordion key={recipe.id}>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  name="title"
                  onChange={handleTitleChange}
                >
                  {recipe.title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body name="ingredients" onChange={handleTitleChange}>
                  <li>{recipe.ingredients}</li>
                </Card.Body>
                <Button
                  className="editButton"
                  variant="info"
                  onClick={handleSubmit}
                >
                  Edit
                </Button>
                <Button
                  className="deleteButton"
                  variant="danger"
                  onClick={handleShow}
                >
                  Delete
                </Button>
              </Accordion.Collapse>
            </Card>
            <Button
              className="addButton"
              variant="primary"
              onClick={handleShow}
            >
              Add Recipe
            </Button>
          </Accordion>
        );
      })}
      {loading ? <h1>loading</h1> : null}
      {/* Add Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Recipe Title: </label>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Enter Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <label>Ingredients: </label>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Enter Ingredients, seperate each with a comma"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveRecipe}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
    </div>
  );
};
export default RecipesContainer;
