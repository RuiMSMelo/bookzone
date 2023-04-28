const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    bookTitle: {
      type: String,
      //trim: true,
      //required: true,
      unique: true
    },
    author: {
      type: String,
      //required: true,
      //trim: true
    },
    genre: {
      type: String,
      //required: true
    },
    cover: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
