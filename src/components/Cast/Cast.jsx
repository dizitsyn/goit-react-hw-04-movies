import Axios from 'axios';
import React, { Component } from 'react'

export default class Reviews extends Component {
    state = {
        cast:[]
    }
    
    async componentDidMount() {

        const response = await Axios.get(`
        https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=60f2f8cea661505440d8c2effba6029d`)
        
        // console.log(response.data.cast);
        
        this.setState({ cast: response.data.cast })
    }
    
    render() {
        return (
            <>
                <h2>Cast</h2>
                
                <ul className="castList">
                    {this.state.cast.map(actor => (<li key={actor.id} className='castItem'>
                        
                        {actor.profile_path &&
                            <img className="castPic"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}`}
          alt={this.state.title}
        />
                        }
                        <span>{actor.name}</span>
                        <span>Character: {actor.character}</span>

                    </li>))}
                </ul> 
                
            </>
        )
    }
}
