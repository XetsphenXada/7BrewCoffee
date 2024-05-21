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

    function nextFlashcard(event) {
        event.preventDefault();
        console.log("next")

        let tempCards = flashcards;
        let currentCard = tempCards.shift();
        tempCards.push(currentCard);
        setFlashcards(tempCards);
        console.log(flashcards)
    }

    function previousFlashcard(event) {
        event.preventDefault();
        console.log("previous")

        let tempCards = flashcards;
        let lastCard = tempCards.pop();
        tempCards.unshift(lastCard);
        setFlashcards(tempCards);
        console.log(flashcards)
    }

    return (
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
    )
}