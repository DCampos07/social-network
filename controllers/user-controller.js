const { User } = require('../models');
const Thought = require('../models/Thought');
const { db } = require('../models/User');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thought',
                select: ('-__v -userName')
            })
            .populate({
                path: 'friends',
                select: ('-__v -thought')
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thought',
                select: ('-__v -userName')
            })
            .populate({
                path: 'friends',
                select: ('-__v -thought')
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Oh oh! We did not find any users with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user is not in our list.' });
                    return;
                }
                return dbUserData;
            })
            .then(dbUserData => {
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.userId } }
                )
                    .then(() => {
                        Thought.deleteMany({ userName: dbUserData.userName })
                            .then(() => {
                                res.json({ message: 'You have successfully deleted this user.' });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // create friend by id
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Uhmm, we could not find any users with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // delete friend by id
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Oh no! We were unable to find any users with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    }
};

module.exports = userController;