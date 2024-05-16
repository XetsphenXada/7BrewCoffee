import { Router } from "express";
import flashcardData from "../initial-data/flashcardData.json" with { type: "json" };

const router = Router();

// return all flashcards
router.get("/flashcards", (request, response) => {
    try {
        // get all flashcard data
        const flashcards = flashcardData;

        // send flashcard data as response
        response.send(flashcards);
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
    }
});

// return flashcards that match category
router.get("/flashcards/:category", (request, response) => {
    try {
        let flashcards = {};

        // find flashcards with matching category
        for(let key in flashcardData) {
            if(flashcardData[key].category === request.params.category.toLowerCase()) {
                flashcards[key] = flashcardData[key];
            }
        }
        
        // check if flashcards object is empty
        if(Object.keys(flashcards).length === 0) {
            // no macthing category found
            response.status(400).send({
                message: "Category not found."
            });
        }
        else {
            // send flashcard data as response
            response.send(flashcards);
        }
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
    }
});

export default router;