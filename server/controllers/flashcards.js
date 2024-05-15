import { Router } from "express";

const router = Router();

router.get("/flashcards", (request, response) => {
    response.send("hi")
});

export default router;