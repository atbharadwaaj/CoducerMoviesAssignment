import React, {Component} from 'react';
import '../styles/movieList.css';
import { Table } from 'reactstrap';
import classnames from 'classnames';

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updated_list: []
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.list_of_movies !== prevProps.list_of_movies) {
		  this.handleUpdate();
		}
	}

	handleUpdate = () => {
		this.setState({
			updated_list: this.props.list_of_movies
		});
	}

	render() {
		return(
			<>
			<div className="row list-area">
				<div className="col-2"></div>
				<div className="col-8 content-col">
					<h5 className="pt-2">CoducerMovies Top 250's List : </h5>
					<Table dark>
		        <thead>
		          <tr>
		            <th># Rank</th>
		            <th>Movie Title</th>
		            <th>Rating</th>
		            <th>Release Year</th>
		            <th></th>
		          </tr>
		        </thead>
		        <tbody>
			        {this.state.updated_list.map((movie_details) => {
								return (
									<tr key={movie_details.movieId}>
				            <th scope="row">{movie_details.rank}</th>
				            <td>{movie_details.Title}</td>
				            <td><i class="fa-solid fa-star star-color"></i> {movie_details.Rating}</td>
				            <td>{movie_details.Year.slice(1, -1)}</td>
				            <td>
				            	<i
				            		className={[
				            			classnames({
				            				bookmarked: this.props.watchListMovies.includes(movie_details.movieId)
				            			}),
				            			"fa fa-bookmark add-watch-list"
				            		].join(' ')}
				            		onClick={() => this.props.handleWatchListClick(movie_details.movieId)}
				            	></i>
				            </td>
				          </tr>
								);
							})}
		        </tbody>
		      </Table>
		      {this.state.updated_list.length === 0 && this.props.searchText.length > 0 ? 
	        	(
	        		<div className="row">
	        			<div className="col-12">
	        				<h5 className="error-class">No movie found for the selected search criteria.</h5>
	        			</div>
	        		</div>
	        	)
	        	:
	        	this.state.updated_list.length === 0 && this.props.searchText.length === 0 ? 
	        	(
	        		<div className="row">
	        			<div className="col-12">
	        				<h5 className="error-class">Fetching all the movies.</h5>
	        			</div>
	        		</div>
	        	) : ''
	     		}
				</div>
				<div className="col-2"></div>
			</div>
				
			</>
		);
	}
}

export default MovieList;