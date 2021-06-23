import React from "react";
import RecipesContainer from "./components/RecipesContainer";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./firebase/firestore";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h2 className="head">LethaLe's React Recipe Box</h2>
      <p className="sub-head">
        Create, edit, delete your recipes. Uses session storage so that page
        refresh will keep stored data (but not after page close)
      </p>
      <RecipesContainer />
    </div>
  );
};

export default App;
