import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = (props) => {

  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);


  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1)

  return <nav>
    <ul className="pagination pagination-sm">
      {pages.map(page => (
        <li key={page} className={ page === currentPage ? 'page-item active' : "page-item"} aria-current= { page === currentPage ? 'page' : "null"} >
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
    </ul>
  </nav>
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;


// class Pagination extends Component {
//   state = {  }

//   render() {
//     let classes = "active";

//     return (
//       <ul class="pagination pagination-sm">
//       <li class="page-item active" aria-current="page"><span class="page-link">1</span></li>
//       <li class="page-item"><a class="page-link" href="#">1</a></li>
//       <li class="page-item"><a class="page-link" href="#">2</a></li>
//       <li class="page-item"><a class="page-link" href="#">3</a></li>
//     </ul>
//     );
//   }
// }



// export default Pagination;
