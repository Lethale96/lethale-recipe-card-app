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
import "./firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

const RecipesContainer = () => {
  //// ==========================STATE
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  ///////-------------------DATA
  const ref = firebase.firestore().collection("recipes");
  /////////////------------DATA (unnecessary code)
  // useEffect(() => {
  //   ref.onSnapshot((snapshot) => snapshot.docs.map((doc) => doc.data()));
  // }, []);
  ///////++++++++++++++FUNCTIONS
  //-----------------Add Button Handler for Add Modal
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => setShowAdd(true);
  //-----------------Edit Button Handler for Edit Modal
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = () => setShowEdit(true);

  //----------------------Retrieving  Data from Firestone
  function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
      setRecipes(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);

  ///---------------------------- Sending Data Edits to Firebase
  // function editRecipe() {
  //   ref.onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "modified") {
  //         console.log("Edit Successful:", change.doc.data());
  //       }
  //     });
  //   });
  // }
  // useEffect(() => {
  //   editRecipe();
  // }, []);

  // ----------------------------Edit Recipe Function
  // function editRecipe(updatedRecipe) {
  //   setLoading();
  //   ref
  //     .doc(updatedRecipe.id)
  //     .update(updatedRecipe)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // () =>
  //             editRecipe({
  //               title: recipes.title,
  //               ingredients: recipes.ingredients,
  //               id: recipes.id,
  //             })

  ///-------------------------------------Update Recipe Input Handlers
  const handleTitleChange = (e) => {
    console.log(e.target.value);
  };
  const handleIngredientsChange = (e) => {
    console.log(e.target.value);
  };
  const handleEditSubmit = () => {
    var editReciped = {
      title: handleTitleChange,
      ingredients: handleIngredientsChange,
    };
    console.log(editReciped);
  };
  // --------------------------------------- Updating Recipe (unnecessary code -maybe)
  // const saveRecipe = async (e) => {
  //   e.preventDefault();
  //   const ingredientsArray = ingredients.split(",");

  //   await ref.collection("recipes").doc("recipes.id").add({
  //     title,
  //     ingredients: ingredientsArray,
  //   });
  //   setTitle("");
  //   setIngredients("");
  // };

  //   ///-----------------------------------Adding Recipe Data to Firebase

  function addRecipe(newRecipe) {
    ref
      .doc(newRecipe.id)
      .set(newRecipe)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setIngredients("");
  }

  // useEffect(() => {
  //   addRecipe();
  // }, []);
  // ------------------------------Deleting Recipe Data from Firebase
  // function deleteRecipe(recipe) {
  //   ref
  //     .doc(recipe.id)
  //     .delete()
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  // useEffect(() => {
  //   deleteRecipe();
  // }, []);

  return (
    <div className="App">
      <div className="heading">
        <h2 className="head">LethaLe's React Recipe Box</h2>
        <p className="sub-head">
          Create, edit, delete your recipes. Uses session storage so that page
          refresh will keep stored data (but not after page close)
        </p>
      </div>
      <div className="body">
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
                    value="title"
                    onChange={handleTitleChange}
                  >
                    {recipe.title}
                  </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body // HELP PLEASE!!!!!!!!!!, BUG HERE, TypeError: recipe.map is not a function {Reference Doc: https://forum.freecodecamp.org/t/map-is-suddenly-not-a-function/134196 }
                    name="ingredients"
                    value="ingredients"
                    onChange={handleIngredientsChange}
                  >
                    {/* Short BUG Story Break: 
//Once upon a time, There was an array that worked then next this you know it stop. "It MUST BE AN BUG!" yelled the MACBOOK. 
Many devlopers poundered on this bug, that haunted one particular devloper by the name of lethale . 
How will they fix it?? 
Stayed tuned for the next BUG HUNT SESSION on Tuesday, July 20th, 20201 at 12:30pm */}

                    {recipe.map((recipe) => {
                      /// I have tryed may different ways of calling the array for map non have been sucessful so I am pushing the last working map for reference for our session {code may change}
                      return <li key={ingredients.id}>{recipe}</li>; //{The best Forum Reference found Doc: https://forum.freecodecamp.org/t/map-is-suddenly-not-a-function/134196 }
                    })}

                    {/* <li>{recipe.ingredients}</li> */}
                    <Button
                      className="editButton"
                      variant="info"
                      onClick={handleShowEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      className="deleteButton"
                      variant="danger"
                      // onClick={deleteRecipe}
                      // onClick={() => deleteRecipe(recipe)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
        })}
        {loading ? <h1>loading</h1> : null}
        {/*----------------------------------------------------------------- Add Modal */}
        <Button className="addButton" variant="primary" onClick={handleShowAdd}>
          Add Recipe
        </Button>
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Recipe Title: </label>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </InputGroup>
            <label>Ingredients: </label>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Enter Ingredients, seperate each with a comma"
                value={ingredients}
                onChange={(e) => setIngredients(e.currentTarget.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addRecipe({ title, ingredients, id: uuidv4() });
              }}
            >
              Add Recipes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Edit Modal */}
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Recipe Title: </label>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <label>Ingredients: </label>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default RecipesContainer;
