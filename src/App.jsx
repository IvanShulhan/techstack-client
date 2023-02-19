import { Container } from '@mui/system';
import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.page';

export const ApartmentContext = createContext({
  addItemToUpdate: () => {},
  removeItemFromUpdate: () => {}
});

function App() {
  const [updateApartmentId, setUpdateApartmentId] = useState(null);

  const addItemToUpdate = (apartment) => {
    if (apartment._id !== updateApartmentId) {
      setUpdateApartmentId(apartment._id);
      localStorage.setItem('apartmentToUpdate', JSON.stringify(apartment));
    }
  };

  const removeItemFromUpdate = () => {
    setUpdateApartmentId(null);

    localStorage.removeItem('apartmentToUpdate');
  };


  return (
    <Container maxWidth="lg">
      <ApartmentContext.Provider value={{addItemToUpdate, removeItemFromUpdate}} >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ApartmentContext.Provider>
    </Container>
  );
}

export default App;
