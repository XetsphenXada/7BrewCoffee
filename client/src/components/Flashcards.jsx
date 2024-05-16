export default function Flashcards() {

    return (
        <div className="stack">
            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-off">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 front</h2>
                    </div>
                </div> 
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-on">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 back</h2>
                    </div>
                </div>
            </label>
            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-off">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 front</h2>
                    </div>
                </div> 
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-on">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 back</h2>
                    </div>
                </div>
            </label>
            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-off">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 front</h2>
                    </div>
                </div> 
                <div className="card w-96 h-48 shadow-md bg-primary text-primary-content flex-col justify-center swap-on">
                    <div className="card-body flex-col justify-center">
                        <h2 className="card-title justify-center">flashcard1 back</h2>
                    </div>
                </div>
            </label>
        </div>
    )
}