import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApartments, fetchCreateApartment } from '../../store/slices/apartments';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../axios';
import { v4 as uuid} from 'uuid';
import { createArray, generateName } from '../../utils';
import { ApartmentContext } from '../../App';
import {
  Typography, 
  TextField, 
  Paper, 
  Button, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import styles from './AddForm.module.scss';

export const AddForm = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { removeItemFromUpdate } = useContext(ApartmentContext);
  const apartment = JSON.parse(localStorage.getItem('apartmentToUpdate'));

  const isShrink = () => {
    if (apartment) return true
  };

  const { 
    register, 
    handleSubmit, 
    control,
    reset,
    formState: { errors },
   } = useForm({
    values: {
      name: generateName(apartment, 'name'),
      price: generateName(apartment, 'price'),
      rooms: generateName(apartment, 'rooms'),
      description: generateName(apartment, 'description'),
    },
    mode: "onBlur"
   });

  const onSubmit = (data) => {
    !apartment 
      ? dispatch(fetchCreateApartment(data))
      : axios.put(`/apartments/${apartment._id}`, data)
        .then(() => {
          dispatch(fetchApartments(search))
        })
    
    removeItemFromUpdate();
    reset();
  }

  return (
    <Paper className={styles.paper}>
      <Typography className={styles.title}>
        Create a new rent
      </Typography>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <TextField
          label="Title"
          className={styles.input}
          InputLabelProps={{ shrink: isShrink() }} 
          error={Boolean(errors.name)}
          helperText={errors.name?.message?.toString()}
          placeholder="Ex. Flat in the city center"
          {...register('name', {
            required: 'Enter apartment name',
            maxLength: {
              value: 99,
              message: 'Too long name'
            }
          })}
        />
        <FormControl className={styles.input}>
          <InputLabel id="rooms-label">Rooms</InputLabel>
          <Controller 
            control={control}
            name="rooms"
            value={apartment && apartment.rooms}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <Select
                labelId="rooms-label"
                label="Rooms"
                {...field}
                error={Boolean(errors.rooms)}
              >
                {createArray(5).map((el) => {
                  const value = el + 1;
                  
                  return (
                    <MenuItem 
                      key={uuid()} 
                      value={value} 
                    >
                      {value}
                    </MenuItem>
                )})}
              </Select>
            )}
          />
          {Boolean(errors.rooms) && <FormHelperText className={styles.error}>Chouse please</FormHelperText>}
        </FormControl>
        <TextField 
          className={styles.input}
          label="Rent Price"
          InputLabelProps={{ shrink: isShrink() }} 
          error={Boolean(errors.price)}
          helperText={errors.price?.message?.toString()}
          placeholder="99.00"
          {...register('price', {
            required: 'Enter Price',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Only numbers'
            }
          })}
        />
        <TextField
          label="Description"
          InputLabelProps={{ shrink: isShrink() }} 
          error={Boolean(errors.description)}
          helperText={errors.description?.message?.toString()}
          placeholder="Some discription of the apartment"
          multiline
          {...register('description', {
            required: 'Enter apartment description',
            maxLength: {
              value: 999,
              message: 'Too long description'
            },
          })}
          fullWidth
        />
        <Button 
          size="large" 
          variant="contained" 
          type="submit"
          fullWidth
        >
          Submit rent
        </Button>
      </form>
    </Paper>
  );
};
