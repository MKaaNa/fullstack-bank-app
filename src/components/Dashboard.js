import React, { useState } from 'react';
import { Container, Box, Select, MenuItem, FormControl, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Varsayılan değeri boş bir string olarak başlatın
  const navigate = useNavigate();

  // Kullanıcı adı ve soyadı
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const fullName = `${firstName || ''} ${lastName || ''}`; // İsim ve soyadını birleştirme

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case 'newcustomer':
        navigate('/newcustomer');
        break;
      case 'customerinfo':
        navigate('/customerinfo');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    // LocalStorage'den token ve kullanıcı bilgilerini sil
    localStorage.removeItem('user_token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    // Logout sonrası giriş ekranına yönlendirilir
    navigate('/');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Ortadaki Çerçeve */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 600, // Maksimum genişliği ayarlayın
          padding: 4, // İç boşlukları ayarlayın
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Kullanıcı Adı */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '1.5rem', // Yazı boyutunu artırın
            zIndex: 1, // Üst üste gelmemesi için
          }}
        >
          {fullName ? `Hoş geldin, ${fullName}` : ''}
        </Typography>

        {/* Logout Butonu */}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: '1.2rem', // Yazı boyutunu artırın
            padding: '10px 20px', // Buton padding
            zIndex: 1, // Üst üste gelmemesi için
          }}
          onClick={handleLogout}
        >
          Çıkış Yap
        </Button>

        {/* Form İçeriği */}
        <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
          <FormControl fullWidth variant="standard">
            <Select
              id="select-box"
              value={selectedOption}
              onChange={handleSelectChange}
              sx={{ fontSize: '1.5rem', height: '56px' }} // Yazı boyutunu ve yükseklik ayarını artır
            >
              <MenuItem value="newcustomer" sx={{ fontSize: '1.5rem' }}>Yeni Müşteri Kaydı</MenuItem>
              <MenuItem value="customerinfo" sx={{ fontSize: '1.5rem' }}>Müşteri Bilgi Sorgulama</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
