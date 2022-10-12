import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import List from './common/list';
import { getGenres } from '../services/fakeGenreService';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    // count: getMovies().count
    pageSize: 4,
    currentPage: 1,
  }

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres( )});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id );
    this.setState({ movies });
    // updates the movies list
  };

  handleLiked = (movie) => {
    // console.log('liked click', movie)
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies});
  }

  handlePageChange = page => {
    this.setState({ currentPage : page });
  };

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre})
  };


  render() {

    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies} = this.state;

    if (count === 0)
      return <p>There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);



    return (
      <React.Fragment>
        <div className='d-flex align-items-start m-4'>
          <div className='mx-3'>
            <List
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}

              >
            </List>
          </div>
          <div>
            <p>Showing {count} movies in the database </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { movies.map(movie => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like liked={movie.liked} onClick={() => this.handleLiked(movie)}/>
                      </td>
                      <td>
                        <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">x</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}>
            </Pagination>
          </div>
        </div>
    </React.Fragment>)
  }


}

export default Movies;
