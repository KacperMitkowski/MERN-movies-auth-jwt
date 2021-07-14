/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getMovies } from '../../actions/movies';
import useStyles from './styles';

const Pagination = ({ page }: any) => {
  const { numberOfPages } = useSelector((state : any) => state.movies);
  const dispatch = useDispatch();
  const classes = useStyles();

  // useEffect(() => {
  //   if (page) {
  //     dispatch(getMovies(page));
  //   }
  // }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item : any) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Pagination;