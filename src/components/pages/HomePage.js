import React, { Component } from "react";
import Axios from "axios";
import MoviesList from "../MoviesList/MoviesList";

export default class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=60f2f8cea661505440d8c2effba6029d `
    );
    this.setState({ movies: response.data.results });
  }
  render() {
    return <MoviesList movies={this.state.movies} />;
  }
}
