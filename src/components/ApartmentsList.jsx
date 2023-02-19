import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments, selectApartments } from '../store/slices/apartments';
import { useLocation } from 'react-router-dom';
import { ListItem } from './ListItem';
import { ListHeader } from './ListHeader';
import { Box, CircularProgress } from '@mui/material';

export const ApartmentsList = () => {
  const dispatch = useDispatch();
  const { apartments, status } = useSelector(selectApartments);
  const { search } = useLocation();

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchApartments(search))
  }, [dispatch, search]);

  return (
    <Box>
      <ListHeader />
      {isLoading 
        ? (
          <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={150} />
          </Box>
        ) : (apartments.map((apartment) => (
          <Fragment key={apartment._id}>
            <ListItem apartment={apartment} />
          </Fragment>
      )))}
    </Box>
  )
}