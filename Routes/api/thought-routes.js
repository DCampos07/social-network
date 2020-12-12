const router = require('express').Router();
const { getAllThought, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controller');


// api/thought
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// get and delete one thought by id api/thought/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// post reaction to thought by /api/thought/:thoughtId/reaction
router
    .route('/:thoughtId/reaction')
    .post(createReaction),

    // delete reaction to thought by /api/thought/:thoughtId/reactionId
    router
        .route('/:thoughtId/reaction/:reactionId')
        .delete(deleteReaction);


module.exports = router;