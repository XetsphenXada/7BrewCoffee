export default function Flashcards() {

    return (
        <div className="stack">
            <div className="card w-96 h-48 shadow-md bg-primary text-primary-content">
                <div className="card-body flex-col justify-center">
                    <h2 className="card-title justify-center">flashcard1</h2>
                </div>
            </div> 
            <div className="card w-96 h-48 shadow-md bg-primary text-primary-content">
                <div className="card-body flex-col justify-center">
                    <h2 className="card-title justify-center">flashcard2</h2>
                </div>
            </div> 
            <div className="card w-96 h-48 shadow-md bg-primary text-primary-content">
                <div className="card-body flex-col justify-center">
                    <h2 className="card-title justify-center">flashcard3</h2>
                </div>
            </div> 
        </div>
    )
}