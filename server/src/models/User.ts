// server/src/models/User.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must be a valid email address!'] },
  password: { type: String, required: true, minlength: 5 },
  savedBooks: [
    {
      bookId:   { type: String, required: true },
      authors:  [String],
      description: String,
      title:    { type: String, required: true },
      image:    String,
      link:     String
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = model('User', userSchema);
