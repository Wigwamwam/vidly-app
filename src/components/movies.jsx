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
    const genres = [{name: 'All Genres'}, ...getGenres()]
    // here we are creating a new object at the beginning of the array, creating the name properties
    // and addding all genres, we are not saving it to the database at the top of the list
    this.setState({ movies: getMovies(), genres });
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
    this.setState({selectedGenre: genre, currentPage: 1})
    // updated state and making sure to reset the current page if genre is selected
  };


  render() {

    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    if (count === 0)
      return <p>There are no movies in the database</p>;

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter( m => m.genre._id === selectedGenre._id) : allMovies;
    // calling updated state selected genre - if filter show filters movies otherwise show all movies

    const movies = paginate(filtered, currentPage, pageSize);
    // need to paginate the filtered method


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
            <p>Showing {filtered.length} movies in the database </p>
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
              itemsCount={filtered.length}
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
