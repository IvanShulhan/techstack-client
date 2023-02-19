import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectApartments } from '../../store/slices/apartments';
import { useLocation, useSearchParams } from 'react-router-dom';
import { createArray } from '../../utils';
import { v4 as uuid} from 'uuid';
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Typography, 
  Box,
  Paper
} from '@mui/material';
import styles from './ListHeader.module.scss'

export const ListHeader = () => {
  const { apartments } = useSelector(selectApartments);
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [params, setParams] = useState({
    rooms: searchParams.get('rooms') || '',
    price: searchParams.get('price') || ''
  });


  const changeParamsHandler = (key, value) => {
    !value
      ? searchParams.delete(key)
      : searchParams.set(key, value);

    setParams(curr => ({...curr, [key]: value}));
    setSearchParams(searchParams);
  }
  
  return (
    <Paper className={styles.header}>
      <Typography className={styles.title}>
        Avilable Apartments{`(${apartments.length})`}
      </Typography>
      <Box className={styles.inner}>
        <FormControl className={styles.inner}>
          <InputLabel id="price-label">Filter by price</InputLabel>
          <Select
            labelId="price-label"
            label="Filter by price"
            defaultValue=""
            value={params.price}
            onChange={({ target }) => {
              changeParamsHandler('price', target.value)
            }}
          >
            <MenuItem value="">
              Without filtering
            </MenuItem>
            <MenuItem value="desc">
              Price - highest to lowest
            </MenuItem>
            <MenuItem value="asc">
              Price - lowest to highest
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.inner}>
        <InputLabel id="rooms-label">Sort by rooms</InputLabel>
          <Select
            labelId="rooms-label"
            label="Sort by rooms"
            defaultValue=""
            value={params.rooms}
            onChange={({ target }) => {
              changeParamsHandler('rooms', target.value)
            }}
          >
            <MenuItem value="">
              Without sorting
            </MenuItem>
            {createArray(5).map((el) => {
              const value = el + 1;

              return <MenuItem key={uuid()} value={value}>{value}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}