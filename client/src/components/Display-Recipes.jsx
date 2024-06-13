import { useEffect, useState } from "react";
import { Table } from "reactstrap";

export default function DisplayRecipes() {
  // State to store set room value
  const [recipes, setRecipes] = useState([]);

  //uses allRooms route in room controller to display all rooms from db
  async function retrieveRecipesList() {
    const response = await fetch("http://localhost:3000/allRecipes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("jwt-token"),
      },
    });
    const responseArray = await response.json();

    //checking if request was successful
    if (response.status === 200) {
      console.log(responseArray);
      setRecipes(responseArray);
    } else {
      console.log("error");
    }
  }

  useEffect(() => {
    retrieveRecipesList();
  }, []);

//displays table of currently available rooms
  return (
    <Table>
      <thead>
        <tr>
          <th>Recipe Name</th>
          <th>Recipe Ingredients</th>
          <th>Recipe Directions</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe._id}>
            <th scope="row">{recipe.name}</th>
            <td>{recipe.ingredients}</td>
            <td>{recipe.directions}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
