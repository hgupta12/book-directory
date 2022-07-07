# Book Directory

A basic Express CRUD app for managing books

## How to run the app

* Clone this repo https://github.com/hgupta12/book-directory.git using the `git clone https://github.com/hgupta12/book-directory.git` command
* Change the branch to Task-1 using the command `git checkout Task-1`
* Run `npm install` to download the required dependencies
* Open up a terminal and use the command `npm run dev` to run the app on http://localhost:3000

## Routes

* GET / - Home Page
* GET /add - Form to create a new book
* GET /edit/:id - Form to edit the book with a particular id
* GET /books - Display all the books
* GET /books/:id - Display the book with a particular id
* POST /books - Create a new book and store it on the database
* POST /books/edit/:id - Update the information of a particular book
* DELETE /books/:id - Delete the book with a particular id

## Tech stack used

NodeJS, ExpressJS, EJS, Bootstrap, MongoDB

You can checkout the application [here](http://wec-book-directory.herokuapp.com/)



