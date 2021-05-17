import Axios from "axios";
import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import routes from "../../routes";

export default class MovieDetailsPage extends Component {
  state = {
    title: null,
    vote_average: null,
    overview: null,
    genres: null,
    poster_path: null,
    id: null,
    back: {},
  };
  async componentDidMount() {
    const movieId = this.props.match.params.movieId;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=60f2f8cea661505440d8c2effba6029d `
    );
    this.setState({ ...response.data, back: { ...this.props.location.state } });
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    if (this.state.back.query) {
      history.push({
        pathname: this.state.back.from,
        search: `query=${this.state.back.query}`,
        state: { query: this.state.back.query },
      });
    } else {
      history.push("/");
    }

    console.log(this.state);
  };

  render() {
    return (
      <>
        <button
          type="button"
          onClick={this.handleGoBack}
          className="backButton"
        >
          Go back
        </button>
        <div className="movieInfo">
          <div>
            {this.state.poster_path && (
              <img
                className="coverPic"
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.poster_path}`}
                alt={this.state.title}
              />
            )}
          </div>
          <div className="textInfo">
            <h2>{this.state.title}</h2>
            <span>User Score:{this.state.vote_average * 10}%</span>
            <h3>Overview</h3>
            <p>{this.state.overview}</p>
            <h3>Genres</h3>
            {this.state.genres && (
              <ul>
                {this.state.genres.map((genr) => (
                  <li key={genr.id} className="genre">
                    {genr.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to={`${this.props.match.url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${this.props.match.url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <Route
            path={`${this.props.match.path}/cast`}
            render={(props) => <Cast {...props} />}
          />
          <Route
            path={`${this.props.match.path}/reviews`}
            render={(props) => <Reviews {...props} />}
          />
        </div>
      </>
    );
  }
}
