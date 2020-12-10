const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: "Seems you forgot to write your username",
            trim: true
        },
        email: {
            type: String,
            required: "Opps, you forgot to write your e-mail address",
            unique: true,
            validate: {
                validator(emailValidation) {
                    return /^([0-9a-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(emailvalidation);
                },
                message: "Opps, you must enter a valid email address"
            },
        },
        thought: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Shema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', USerSchema);

module.exports = User;