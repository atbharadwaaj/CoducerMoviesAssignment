import React , {Component} from 'react';
import Header from './header';
import MovieList from './movieList';
import LoaderSpinner from './loader';
import axios from 'axios';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList : [],
			updatedMovieList: [],
			showLoader: false,
			searchText: '',
			watchListIds: []
		};
	}

	componentDidMount() {
		this.setState({
			showLoader: true
		});
		axios.get("https://imdb-scraper.p.rapidapi.com/top250", {
			headers: {
				'X-RapidAPI-Host': 'imdb-scraper.p.rapidapi.com',
    		'X-RapidAPI-Key': '798b67d6bcmshe4337ef2bb98a1bp10f457jsn358c18be6ae3'
			}
		})
		.then((response) => {
			this.setState({
				movieList: response.data.movies,
				updatedMovieList: response.data.movies,
				showLoader: false
			});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	handleSearchFunction = (searchCategory, searchString) => {
		let movieSearchString = searchString.trim().toLowerCase();
		let format = /[!@#$%^&*()+\=\[\]{};'"\\|,<>\/?]+/;
		let movieFilteredList = [];
		if (searchCategory === 'Title' && searchString.length > 0) {
			if(!format.test(movieSearchString)) {
				this.state.movieList.forEach((movie) => {
					if(movie.Title.toLowerCase().match(movieSearchString)) {
						movieFilteredList.push(movie);
					}
				});
			}
		} else if (searchCategory === 'Rank' && searchString.length > 0) {
			if(!format.test(movieSearchString)) {
				this.state.movieList.forEach((movie) => {
					if(movie.rank == movieSearchString) {
						movieFilteredList.push(movie);
					}
				});
			}
		} else if (searchCategory === 'Year' && searchString.length > 0) {
			if(!format.test(movieSearchString)) {
				this.state.movieList.forEach((movie) => {
					if(movie.Year.toLowerCase().match(movieSearchString)) {
						movieFilteredList.push(movie);
					}
				});
			}
		} else if (searchCategory === 'Rating' && searchString.length > 0) {
			if(!format.test(movieSearchString)) {
				this.state.movieList.forEach((movie) => {
					if(movie.Rating.toLowerCase().match(movieSearchString)) {
						movieFilteredList.push(movie);
					}
				});
			}
		} else {
			movieFilteredList = this.state.movieList;
		}
		this.setState({
			updatedMovieList: movieFilteredList,
			searchText: searchString
		});
	}

	handleWatchList = (movieId) => {
		let watchList = this.state.watchListIds;
		if (watchList.includes(movieId)) {
			watchList = watchList.filter((item) => {
			  return item !== movieId
			})
		} else {
			watchList.push(movieId);
		}
		this.setState({
			watchListIds: watchList
		});
	}

	render() {
		return (
			<>
				<LoaderSpinner modalShow={this.state.showLoader} />
				<Header
					searchCallBack = {this.handleSearchFunction}
					watchListMovies={this.state.watchListIds}
					completeMovies={this.state.movieList}
				/>
				<MovieList
					list_of_movies={this.state.updatedMovieList}
					searchText={this.state.searchText}
					handleWatchListClick={this.handleWatchList}
					watchListMovies={this.state.watchListIds}
				/>
			</>
		);
	}
}

export default Landing;