import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import './Login.css'; 

export default function Login() {
  const [personnelId, setPersonnelId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const navigate = useNavigate();

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
        const response = await axios.post(`${BASE_API_URL}/api/auth/signin`, { personel_id: personnelId, password });
        localStorage.setItem('user_token', response.data.token);
        const { first_name, last_name } = response.data;

        localStorage.setItem('first_name', first_name);
        localStorage.setItem('last_name', last_name);

        setSuccessMsg('Giriş başarılı!');
        setErrorMsg('');
        navigate('/dashboard');
      } catch (error) {
        setErrorMsg('Geçersiz Personel ID veya şifre.');
        setSuccessMsg('');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <Typography component="h1" variant="h5" className="login-title">
          Personel Giriş Ekranı
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          {successMsg && (
            <Typography className="successMsg" align="center">
              {successMsg}
            </Typography>
          )}
          {errorMsg && (
            <Typography className="errorMsg" align="center">
              {errorMsg}
            </Typography>
          )}
          <TextField
            id="personnelId"
            label="Personel ID"
            value={personnelId}
            onChange={(e) => setPersonnelId(e.target.value)}
            variant="outlined"
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
            size="small"
          />
          <TextField
            id="password"
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
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
            size="small"
          />
          <Box className="action-buttons">
            <Button
              type="submit"
              className="login-btn"
            >
              Giriş Yap
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
