import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

const AccountOperations = () => {
  const handleOperation = (operation) => {
    // Hesap işlemleri burada yapılacak
  };

  return (
    <Container>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOperation('deposit')}>
          Para Yatırma
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleOperation('withdraw')}>
          Para Çekme
        </Button>
        <Button variant="contained" onClick={() => handleOperation('summary')}>
          Hesap Özeti
        </Button>
      </Box>
    </Container>
  );
};

export default AccountOperations;
