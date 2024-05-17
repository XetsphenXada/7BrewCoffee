import { useEffect, useState } from "react";

export default function Flashcards() {
    const [flashcards, setFlashcards] = useState();

    useEffect(() => {
        async function getFlashcardData() {
            const response = await fetch("http://localhost:3000/flashcards");
            const flashcardJson = await response.json();
            setFlashcards(flashcardJson)
        }
        
        getFlashcardData();
    }, []);

    return (
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
    )
}