const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controllers');


// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// get and delete one thought by id api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// post reaction to thought by /api/thoughts/:thoughtId/reactions
router
    .route('/:throughtId/reactions')
    .post(createReaction),

    // delete reaction to thought by /api/thoughts/:thoughtId/reactionsId
    router
        .route('/:thoughtId/reactions/:reactionId')
        .delete(deleteReaction);


module.exports = router;