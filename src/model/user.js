import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: [true, 'Username is required'], unique: true },
    email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email already exists'] },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const User = models.User || model('User', UserSchema);

export default User;
