import { useEffect, useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [cardCategory, setCardCategory] = useState([]);
    const [isCategoryChecked, setIsCategoryChecked] = useState({
        "all": true,
        "recipe-quick": false,
        "customer-questions": false,
        "company-culture": false,
        "brewista-positions": false,
        "brewista-terms": false,
        "recipe-prep": false,
        "recipe-dairy": false,
        "recipe-tea": false,
        "recipe-questions": false
    });

    // retrieve flashcard data
    useEffect(() => {
        async function getFlashcardData() {
            const response = await fetch("http://localhost:3000/flashcards");
            const flashcardJson = await response.json();
            setFlashcards(flashcardJson);
        }
        console.log("change detected")
        getFlashcardData();
    }, [cardCategory]);

    // move to next flashcard
    function nextFlashcard(event) {
        event.preventDefault();

        let tempCards = [...flashcards];
        let currentCard = tempCards.shift();
        tempCards.push(currentCard);
        setFlashcards(tempCards);
    }

    // go to previous flashcard
    function previousFlashcard(event) {
        event.preventDefault();

        let tempCards = [...flashcards];
        let lastCard = tempCards.pop();
        tempCards.unshift(lastCard);
        setFlashcards(tempCards);
    }

    function getCheckedStatus(event) {
        event.preventDefault();

        console.log(isCategoryChecked);
    }
    function getCardCategoryArray(event) {
        event.preventDefault();

        console.log(cardCategory);
        console.log(cardCategory.length);
    }

    // handle checkbox selection
    function categorySelection(category) {
        let categoryValues = Object.values(isCategoryChecked);
        categoryValues.shift();

        if(category === "all") {
            if(!isCategoryChecked.all) {
                // uncheck all other checkboxes
                let tempCategoryCheck = {...isCategoryChecked};
                for(let key in isCategoryChecked) {
                    if(key !== "all") {
                        tempCategoryCheck = {...tempCategoryCheck, [`${key}`]: false};
                    }
                }
                // setIsCategoryChecked(tempCategoryCheck);
                setIsCategoryChecked({...tempCategoryCheck, "all": true});
                setCardCategory([]);
            }
            else if(!categoryValues.includes(true)) {
                // keep checked if only thing checked
                setIsCategoryChecked({...isCategoryChecked, "all": true});
            }
            else {
                setIsCategoryChecked({...isCategoryChecked, "all": false});
            }
        }
        else {
            let tempCategoryCheck = {...isCategoryChecked};
            // if nothing is selected yet uncheck all checkbox
            if(!categoryValues.includes(true)) { 
                tempCategoryCheck = {...tempCategoryCheck, "all": false};
            }

            // if category is not checked yet...
            if(!isCategoryChecked[category]) {
                // add category to cardCategory array
                const tempArr = [...cardCategory, category];
                setCardCategory(tempArr);
            }
            else {
                // remove category from cardCategory array
                const tempArr = [...cardCategory];
                const categoryIndex = cardCategory.findIndex(() => category);
                tempArr.splice(categoryIndex, 1);
                setCardCategory(tempArr);
                // if all checkboxes are unchecked set all checkbox to true
                if(tempArr.length === 0) {
                    tempCategoryCheck = {...tempCategoryCheck, "all": true};
                }
            }
            
            setIsCategoryChecked({...tempCategoryCheck, [`${category}`]: !isCategoryChecked[category]});
        }
    }

    return (
        <div className="flex ">
            <fieldset className="mr-5">
                <legend>Category</legend>
                <div>
                    <input type="checkbox" id="all" name="category" value={isCategoryChecked.all} onChange={() => categorySelection("all")} checked={isCategoryChecked.all} />
                    <label htmlFor="all">All</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-quick" name="category" value={isCategoryChecked["recipe-quick"]} onChange={() => categorySelection("recipe-quick")} checked={isCategoryChecked["recipe-quick"]} />
                    <label htmlFor="recipe-quick">Quick Recipe</label>
                </div>
                <div>
                    <input type="checkbox" id="customer-questions" name="category" value={isCategoryChecked["customer-questions"]} onChange={() => categorySelection("customer-questions")} checked={isCategoryChecked["customer-questions"]} />
                    <label htmlFor="customer-questions">Customer Questions</label>
                </div>
                <div>
                    <input type="checkbox" id="company-culture" name="category" value={isCategoryChecked["company-culture"]} onChange={() => categorySelection("company-culture")} checked={isCategoryChecked["company-culture"]} />
                    <label htmlFor="company-culture">Company Culture</label>
                </div>
                <div>
                    <input type="checkbox" id="brewista-positions" name="category" value={isCategoryChecked["brewista-positions"]} onChange={() => categorySelection("brewista-positions")} checked={isCategoryChecked["brewista-positions"]} />
                    <label htmlFor="brewista-positions">Brewista Positions</label>
                </div>
                <div>
                    <input type="checkbox" id="brewista-terms" name="category" value={isCategoryChecked["brewista-terms"]} onChange={() => categorySelection("brewista-terms")} checked={isCategoryChecked["brewista-terms"]} />
                    <label htmlFor="brewista-terms">Brewista Terms</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-prep" name="category" value={isCategoryChecked["recipe-prep"]} onChange={() => categorySelection("recipe-prep")} checked={isCategoryChecked["recipe-prep"]} />
                    <label htmlFor="recipe-prep">Drink Prep</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-dairy" name="category" value={isCategoryChecked["recipe-dairy"]} onChange={() => categorySelection("recipe-dairy")} checked={isCategoryChecked["recipe-dairy"]} />
                    <label htmlFor="recipe-dairy">Dairy</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-tea" name="category" value={isCategoryChecked["recipe-tea"]} onChange={() => categorySelection("recipe-tea")} checked={isCategoryChecked["recipe-tea"]} />
                    <label htmlFor="recipe-tea">Tea</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-questions" name="category" value={isCategoryChecked["recipe-questions"]} onChange={() => categorySelection("recipe-questions")} checked={isCategoryChecked["recipe-questions"]} />
                    <label htmlFor="recipe-questions">Recipe Questions</label>
                </div>
                <button className="btn btn-neutral w-1/5" onClick={getCheckedStatus}>checked status</button>
                <button className="btn btn-neutral w-1/5" onClick={getCardCategoryArray}>cardCategory array</button>
            </fieldset>
            <div className="w-1/4 flex flex-col content-center gap-y-5">
                <div className="stack">
                    {flashcards.map((card) => (
                        <label key={card.cardNumber} className="swap swap-flip">
                            <input type="checkbox" />
                            <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-off">
                            <div className="card-body flex-col justify-center">
                                <h2 className="card-title justify-center">{card.question}</h2>
                            </div>
                            </div> 
                            <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-on">
                                <div className="card-body flex-col justify-center">
                                    <h2 className="card-title justify-center">{card.answer}</h2>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
                <div className="flex justify-around">
                    <button className="btn btn-neutral w-1/5" onClick={previousFlashcard}>Previous</button>
                    <button className="btn btn-neutral w-1/5" onClick={nextFlashcard}>Next</button>
                </div>
            </div>
        </div>
    )
}