import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRemoveApartment } from '../../store/slices/apartments';
import { cutString } from '../../utils';
import { ApartmentContext } from '../../App';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import styles from './ListItem.module.scss';

export const ListItem = ({ apartment }) => {
  const dispatch = useDispatch();

  const { addItemToUpdate } = useContext(ApartmentContext);

  const onRemoveHandler = () => {
    dispatch(fetchRemoveApartment(apartment._id))
  }

  return (
    <Paper className={styles.wrapper}>
      <Grid container className={styles.content}>
        <Box className={styles.inner}>
          <Typography className={styles.item}>
            {apartment.name}
          </Typography>
          <Typography className={styles.item}>
            {apartment.rooms} {apartment.rooms > 1 ? 'rooms' : 'room'}
          </Typography>
          <Typography className={styles.item}>
            {apartment.price}$
          </Typography>
          <Typography className={styles.item}>
            {cutString(apartment.description)}
          </Typography>
        </Box>
        <Box className={styles.buttons}>
          <Button 
            className={styles.update}
            variant="outlined" 
            onClick={() => addItemToUpdate(apartment)}
          >
            Update
          </Button>
          <Button 
            variant="contained" 
            onClick={onRemoveHandler}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Grid>
    </Paper>
)}