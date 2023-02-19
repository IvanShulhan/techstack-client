import { Typography, Box } from '@mui/material'
import { AddForm } from '../components/AddForm';
import { ApartmentsList } from '../components/ApartmentsList';

export const Home = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: 48 }}>
        Apartments Marketplace
      </Typography>
      <AddForm />
      <ApartmentsList />
    </Box>
  )
}