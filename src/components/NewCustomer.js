import React, { useState } from 'react';
import { Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography, Paper, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:5005'; 
const countries = ['Türkiye', 'Almanya', 'Fransa', 'İtalya', 'Hollanda', 'Amerika']; // Uyruk seçenekleri

const NewCustomer = () => {
  const [formData, setFormData] = useState({
    tckn: '',
    ad: '',
    soyad: '',
    dogumTarihi: null,
    cinsiyet: '',
    kimlikSeriNo: '',
    uyruk: '',
    anneAd: '',
    babaAd: '',
    telefonNo: '',
    email: '',
    adres: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dogumTarihi: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tckn, ad, soyad, dogumTarihi, cinsiyet, kimlikSeriNo, uyruk, anneAd, babaAd, telefonNo, email, adres } = formData;

    // Validasyon
    if (!/^\d{11}$/.test(tckn) || tckn[tckn.length - 1] % 2 !== 0) {
      setErrorMsg('TCKN 11 basamaklı ve son hanesi çift olmalıdır.');
      return;
    }
    if (!ad || !soyad || !dogumTarihi || !cinsiyet || !kimlikSeriNo || !uyruk || !anneAd || !babaAd || !telefonNo || !email || !adres) {
      setErrorMsg('Lütfen tüm alanları doldurunuz.');
      return;
    }
    if (new Date(dogumTarihi) >= new Date()) {
      setErrorMsg('Doğum tarihi bugünden önce olmalıdır.');
      return;
    }
    const age = new Date().getFullYear() - new Date(dogumTarihi).getFullYear();
    if (age < 18) {
      setErrorMsg('18 yaşından küçük olamaz.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.post(`${BASE_API_URL}/api/newcustomer`, formData);
      setSuccessMsg(response.data.message);
      setFormData({
        tckn: '',
        ad: '',
        soyad: '',
        dogumTarihi: null,
        cinsiyet: '',
        kimlikSeriNo: '',
        uyruk: '',
        anneAd: '',
        babaAd: '',
        telefonNo: '',
        email: '',
        adres: '',
      });
    } catch (error) {
      console.error('Error details:', error.response || error.message || error);
      if (error.response && error.response.status === 400) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 800,
          width: '100%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: '2rem' }}>
          Yeni Müşteri Kaydı
        </Typography>
        {errorMsg && (
          <Alert severity="error" sx={{ fontSize: '1.2rem', marginBottom: 2 }}>
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ fontSize: '1.2rem', marginBottom: 2 }}>
            {successMsg}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            name="tckn"
            label="TCKN"
            value={formData.tckn}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="ad"
            label="Ad"
            value={formData.ad}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="soyad"
            label="Soyad"
            value={formData.soyad}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <FormControl variant="outlined" required fullWidth>
            <InputLabel id="dogum-tarihi-label" sx={{ fontSize: '1.2rem' }}></InputLabel>
            <DatePicker
              selected={formData.dogumTarihi}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Doğum Tarihini Seçin"
              className="form-control"
              customInput={<TextField sx={{ fontSize: '1.2rem' }} />}
            />
          </FormControl>
          <FormControl variant="outlined" required fullWidth>
            <InputLabel id="cinsiyet-label" sx={{ fontSize: '1.2rem' }}>Cinsiyet</InputLabel>
            <Select
              labelId="cinsiyet-label"
              name="cinsiyet"
              value={formData.cinsiyet}
              onChange={handleChange}
              label="Cinsiyet"
              sx={{ fontSize: '1.2rem' }}
            >
              <MenuItem value="Erkek">Erkek</MenuItem>
              <MenuItem value="Kadın">Kadın</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="kimlikSeriNo"
            label="Kimlik Seri No"
            value={formData.kimlikSeriNo}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <FormControl variant="outlined" required fullWidth>
            <InputLabel id="uyruk-label" sx={{ fontSize: '1.2rem' }}>Uyruk</InputLabel>
            <Select
              labelId="uyruk-label"
              name="uyruk"
              value={formData.uyruk}
              onChange={handleChange}
              label="Uyruk"
              sx={{ fontSize: '1.2rem' }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="anneAd"
            label="Anne Adı"
            value={formData.anneAd}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="babaAd"
            label="Baba Adı"
            value={formData.babaAd}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="telefonNo"
            label="Telefon Numarası"
            value={formData.telefonNo}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <TextField
            name="adres"
            label="Adres"
            value={formData.adres}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{ fontSize: '1.2rem' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3, fontSize: '1.2rem', padding: '12px 24px' }}>
            Kaydet
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewCustomer;
