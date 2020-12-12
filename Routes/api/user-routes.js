
// User API Routes
const router = require('express').Router();
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, createFriend, deleteFriend } = require('../../controllers/user-controller');

// get users and post new user /api/user/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// get one user, put and delete user by ID /api/user/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//post to add new friend
//delete to remove friend from user list  /api/user/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;