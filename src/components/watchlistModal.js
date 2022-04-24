import React from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

const WatchListModal = (props) => {
  return (
    <div>
        <Modal size='lg' backdrop={true} isOpen={props.showBookMarked} toggle={props.toggleWatchlist}>
          <ModalHeader toggle={props.toggleWatchlist}>Watchlist Movies : </ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th># Rank</th>
                  <th>Movie Title</th>
                  <th>Rating</th>
                  <th>Release Year</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.allMovieList.map((movie_details) => {
                    if(props.movieList.includes(movie_details.movieId)) {
                      return (
                        <tr key={movie_details.movieId}>
                          <th scope="row">{movie_details.rank}</th>
                          <td>{movie_details.Title}</td>
                          <td><i class="fa-solid fa-star star-color"></i> {movie_details.Rating}</td>
                          <td>{movie_details.Year.slice(1, -1)}</td>
                        </tr>
                      );
                    } else {
                      return('');
                    }
                  })
                }
              </tbody>
            </Table>
            {props.movieList.length === 0 ? (<h6 className="text-center">No movies added to watchlist.</h6>) : ''}
          </ModalBody>
        </Modal>
      </div>
  );
}

export default WatchListModal;