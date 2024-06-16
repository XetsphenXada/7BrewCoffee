import { useEffect, useState } from "react";
import EditRecipeButton from "./Edit-Recipe-Button";
import DeleteRecipeButton from "./Delete-Recipe-Button";

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
    <>
      <div className="flex flex-col justify-center items-center overflow-y-auto h-full">
        <div className="text-6xl font-bold text-primary mb-[12px]">
          All Recipes
        </div>
        <div className="border-2 border-secondary mb-[16px] w-[30rem]"></div>
        <div className="overflow-y-auto border-2 border-secondary mb-12">
          <table className="table table-pin-rows">
            <tbody className=" flex-inline text-neutral">
              {recipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className=" flex-inline justify-center border-secondary"
                >
                  <td className=" flex justify-center text-primary">
                    {"Recipe Name"}
                  </td>
                  <td className=" flex justify-center">{recipe.name}</td>
                  <td className=" flex justify-center text-primary">
                    {"Recipe Ingredients"}
                  </td>
                  <td className=" flex justify-center">{recipe.ingredients}</td>
                  <td className=" flex justify-center text-primary">
                    {"Recipe Directions"}
                  </td>
                  <td className=" flex justify-center">{recipe.directions}</td>
                  <td>
                    <EditRecipeButton recipe={recipe} />
                  </td>
                  <td>
                    <DeleteRecipeButton recipe={recipe} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
