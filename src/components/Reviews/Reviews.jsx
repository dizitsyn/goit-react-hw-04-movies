import Axios from 'axios';
import React, { Component } from 'react'

export default class Reviews extends Component {
    state = {
        reviews: [],
        
        
    }

    
    
    async componentDidMount() {
            

        const response = await Axios.get(`
        https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/reviews?api_key=60f2f8cea661505440d8c2effba6029d`)
        
        
        this.setState({ reviews: response.data.results })
    }
    


    render() {
        return (
            <>
                <h2>Reviews</h2>
                <ul>
                    {this.state.reviews.map(review => (<li key={review.id }>
                        <h4>Author: {review.author}</h4>
                        <p>{review.content}</p>
                        </li>
                    ))}
               </ul>
                
            </>
        )
    }
}
