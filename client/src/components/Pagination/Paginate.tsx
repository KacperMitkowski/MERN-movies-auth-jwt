import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Paginate = ({ page }: any) => {
  const { numberOfPages } = useSelector((state: any) => state.movies);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.pagination}>
          <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="secondary"
            renderItem={(item: any) => (
              <PaginationItem {...item} component={Link} to={`/movies?page=${item.page}`} size="large" variant="outlined" />
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Paginate;
