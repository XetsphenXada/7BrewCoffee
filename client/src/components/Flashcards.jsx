import { useEffect, useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);

    // retrieve flashcard data
    useEffect(() => {
        async function getFlashcardData() {
            const response = await fetch("http://localhost:3000/flashcards");
            const flashcardJson = await response.json();
            setFlashcards(flashcardJson);
        }

        getFlashcardData();
    }, []);

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

    return (
        <div className="flex ">
            <fieldset className="mr-5">
                <legend>Category</legend>
                <div>
                    <input type="checkbox" id="all" name="all" checked />
                    <label for="all">All</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-quick" name="recipe-quick" />
                    <label for="recipe-quick">Quick Recipe</label>
                </div>
                <div>
                    <input type="checkbox" id="customer-questions" name="customer-questions" />
                    <label for="customer-questions">Customer Questions</label>
                </div>
                <div>
                    <input type="checkbox" id="company-culture" name="company-culture" />
                    <label for="company-culture">Company Culture</label>
                </div>
                <div>
                    <input type="checkbox" id="brewista-positions" name="brewista-positions" />
                    <label for="brewista-positions">Brewista Positions</label>
                </div>
                <div>
                    <input type="checkbox" id="brewista-terms" name="brewista-terms" />
                    <label for="brewista-terms">Brewista Terms</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-prep" name="recipe-prep" />
                    <label for="recipe-prep">Drink Prep</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-dairy" name="recipe-dairy" />
                    <label for="recipe-dairy">Dairy</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-tea" name="recipe-tea" />
                    <label for="recipe-tea">Tea</label>
                </div>
                <div>
                    <input type="checkbox" id="recipe-questions" name="recipe-questions" />
                    <label for="recipe-questions">Recipe Questions</label>
                </div>
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