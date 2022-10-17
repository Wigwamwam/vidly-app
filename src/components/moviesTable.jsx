import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title'},
    { path: 'grenre.name', label: 'Genre'},
    { path: 'numberInStock', label: 'Stock'},
    { path: 'dailyRentalRate', label: 'Title'},
    { key: "like" },
    { key: "delete" },
  ];

  render() {

    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;


  return (
  <table className="table">
    <TableHeader
      columns={this.columns}
      sortColumn={sortColumn}
      onSort={onSort}>
    </TableHeader>
    <tbody>
      { movies.map(movie => {
        return (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onClick={() => this.onLike(movie)}/>
            </td>
            <td>
              <button onClick={() => this.onDelete(movie)} className="btn btn-danger btn-sm">x</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table> );

  }
}

export default MoviesTable;
