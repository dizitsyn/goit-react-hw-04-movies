import axios from "axios";
import React, { Component } from "react";
import MoviesList from "../MoviesList/MoviesList";

export default class MoviesPage extends Component {
  state = {
    movies: [],
    query: "",
  };

  componentDidMount() {
    const { search } = this.props.location;
    const str = search.replace("?query=", "").trim();
    if (search.length !== 0) {
      this.setState({ query: str }, this.feetchMovies);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.feetchMovies();
    }
  }

  feetchMovies = async () => {
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=60f2f8cea661505440d8c2effba6029d&query=${this.state.query}`
        )
        .then((res) => {
          this.setState({ movies: res.data.results });
        });
    } catch (error) {}
  };

  inputHandler = (e) => {
    this.setState({ query: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.history.push({ search: `query=${this.state.query}` });
  };
  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.inputHandler}
          ></input>
          <button type="submit">Search</button>
        </form>

        <MoviesList movies={this.state.movies} />
      </>
    );
  }
}
