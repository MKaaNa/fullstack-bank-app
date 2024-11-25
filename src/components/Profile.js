import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Container, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [personnelId, setPersonnelId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const navigate = useNavigate(); // Correctly define navigate

  const validatePersonnelId = (id) => {
    return /^\d{11}$/.test(id);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validatePersonnelId(personnelId)) {
      setErrorMsg('Personel ID 11 haneli ve sadece rakamlardan oluşmalıdır.');
      setSuccessMsg('');
    } else if (!password) {
      setErrorMsg('Şifre boş olamaz.');
      setSuccessMsg('');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/signin', {
          personel_id: personnelId,
          password,
        });
        localStorage.setItem('user_token', response.data.token);
        setSuccessMsg('Giriş başarılı!');
        setErrorMsg('');
        navigate('/dashboard');
      } catch (error) {
        if (error.response) {
          console.error('Response error:', error.response.data);
          setErrorMsg('Geçersiz Personel ID veya şifre.');
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error', error.message);
        }
        setSuccessMsg('');
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Personel Giriş Ekranı
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          {successMsg && (
            <Typography color="success.main" align="center" sx={{ mb: 2 }}>
              {successMsg}
            </Typography>
          )}
          {errorMsg && (
            <Typography color="error.main" align="center" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}
          <TextField
            id="personnelId"
            label="Personel ID"
            value={personnelId}
            onChange={(e) => setPersonnelId(e.target.value)}
            variant="standard"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              inputProps: {
                pattern: "\\d{11}",
                title: "11 haneli bir personel ID giriniz."
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            id="password"
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Giriş Yap
            </Button>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              component={Link}
              to="/register"
            >
              Hesap Oluştur
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}