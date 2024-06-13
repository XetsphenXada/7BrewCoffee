import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recipes() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const navigate = useNavigate();

  async function newRecipe(event) {
    event.preventDefault(); //stop page from refreshing on submit
    //sending username and password to backend
    const response = await fetch("http://localhost:3000/newRecipe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        ingredients,
        directions
      }),
    });

    const body = await response.json();
    if (response.status === 200) {
      console.log(body);

      navigate("/");
      
    } else {
      console.log(body.response);
    }
  }
  return (
    <form
      name="newRecipe"
      onSubmit={newRecipe}
      className="flex flex-col items-center"
    >
      <label className="flex form-control items-center justify-center">
        <span>Please enter name of new recipe</span>
        <input
          type="text"
          placeholder="Name"
          className=" input input-bordered w-full max-w-xs text-3xl"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <span>Please enter ingredients of new recipe</span>
        <input
          type="text"
          placeholder="Ingredients"
          className=" input input-bordered w-full max-w-xs text-3xl"
          onChange={(e) => setIngredients(e.target.value)}
        ></input>
        <span>Please enter directions for preparing new recipe</span>
        {/* <input
          type="text"
          className=" textarea textarea-bordered text-3xl"
          placeholder="Directions"
          onChange={(e) => setDirections(e.target.value)}
        ></input> */}
        <textarea
          type="text"
          className=" textarea textarea-bordered w-full max-w-xs text-3xl"
          placeholder="Directions"
          onChange={(e) => setDirections(e.target.value)}
        ></textarea>
        <button className="btn btn-wide btn-primary m-3 text-2xl" type="submit">
          Submit
        </button>
      </label>
    </form>
  );
}

export default Recipes;
