import React from "react";
import StartPage from "./StartPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";


class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  moveShelf = (book, shelf) => {
      BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(item => item.id !== book.id).concat([book])
        }))
      })
    
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <StartPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage moveShelf={this.moveShelf} books={this.state.books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
