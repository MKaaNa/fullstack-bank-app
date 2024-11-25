import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';

const BASE_API_URL = 'http://localhost:5005/api';

const CustomerInfo = () => {
  const [tckn, setTckn] = useState('');
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [includePassive, setIncludePassive] = useState(false);

  useEffect(() => {
    if (tckn === '') {
      setShowTable(false);
    }
  }, [tckn]);

  const fetchAllCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/musteri`, {
        params: { includePassive }
      });
      const validCustomers = response.data.filter(customer => customer && customer.tckn);
      setRowData(validCustomers.map(customer => ({
        ...customer,
        dogum_tarihi: formatDate(customer.dogum_tarihi) // Format tarihi
      })));
      setError('');
      setShowTable(true);
    } catch (err) {
      console.error('Hata:', err);
      setError('Müşteriler getirilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByTckn = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/musteri/${tckn}`);
      const customerData = response.data;
      setCustomer({
        ...customerData,
        dogum_tarihi: formatDate(customerData.dogum_tarihi) // Format tarihi
      });
      setError('');
      setShowTable(false);
    } catch (err) {
      console.error('Hata:', err);
      setError('Müşteri bulunamadı.');
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (tckn.trim() === '') {
      fetchAllCustomers();
    } else {
      fetchCustomerByTckn();
    }
  };

  const handleMarkAsPassive = async () => {
    const tcknList = selectedRows.map(row => row.tckn).filter(tckn => tckn !== undefined && tckn !== null);
  
    if (tcknList.length === 0) {
      setError('Pasif duruma getirilecek müşteri seçilmedi.');
      return;
    }
  
    try {
      await Promise.all(tcknList.map(async (tckn) => {
        await axios.put(`${BASE_API_URL}/musteri/pasif/${tckn}`);
      }));
  
      setRowData(rowData.filter(row => !tcknList.includes(row.tckn)));
      setSelectedRows([]);
      setSuccess('Seçilen müşteriler başarıyla pasif duruma getirildi.');
      setError('');
    } catch (err) {
      console.error('Hata:', err);
      setError('Müşteriler pasif duruma getirilirken bir hata oluştu.');
      setSuccess('');
    }
  };

  const handleReactivate = async () => {
    const tcknList = selectedRows.map(row => row.tckn).filter(tckn => tckn !== undefined && tckn !== null);
  
    if (tcknList.length === 0) {
      setError('Aktif duruma getirilecek müşteri seçilmedi.');
      return;
    }
  
    try {
      await Promise.all(tcknList.map(async (tckn) => {
        await axios.put(`${BASE_API_URL}/musteri/aktif/${tckn}`); // Endpoint'i doğrulayın
      }));
  
      setRowData(rowData.map(row => tcknList.includes(row.tckn) ? { ...row, aktiflik_durumu: 1 } : row));
      setSelectedRows([]);
      setSuccess('Seçilen müşteriler başarıyla aktif duruma getirildi.');
      setError('');
    } catch (err) {
      console.error('Hata:', err);
      setError('Müşteriler aktif duruma getirilirken bir hata oluştu.');
      setSuccess('');
    }
  };
  
  
  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY'); // Tarih formatını düzenleyin
  };

  const columns = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerName: 'Seçim',
      width: 100,
    },
    { headerName: 'TCKN', field: 'tckn', sortable: true, filter: true },
    { headerName: 'Ad', field: 'ad', sortable: true, filter: true },
    { headerName: 'Soyad', field: 'soyad', sortable: true, filter: true },
    { headerName: 'Doğum Tarihi', field: 'dogum_tarihi', sortable: true, filter: true },
    { headerName: 'Cinsiyet', field: 'cinsiyet', sortable: true, filter: true },
    { headerName: 'Kimlik Seri No', field: 'kimlik_seri_no', sortable: true, filter: true },
    { headerName: 'Uyruk', field: 'uyruk', sortable: true, filter: true },
    { headerName: 'Anne Adı', field: 'anne_ad', sortable: true, filter: true },
    { headerName: 'Baba Adı', field: 'baba_ad', sortable: true, filter: true },
    { headerName: 'Telefon Numarası', field: 'telefon_no', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Adres', field: 'adres', sortable: true, filter: true },
    {
      headerName: 'Durum',
      field: 'aktiflik_durumu',
      sortable: true,
      filter: true,
      cellRenderer: params => params.value === 1 ? 'Aktif' : 'Pasif',
      width: 150
    }
  ];

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e3f2fd',
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 1200,
          width: '100%',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#0288d1' }}>
          Müşteri Bilgisi Sorgulama
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="TCKN"
            fullWidth
            sx={{ mb: 3 }}
            value={tckn}
            onChange={(e) => setTckn(e.target.value)}
            variant="outlined"
            size="medium"
            placeholder="11 haneli TCKN girin"
            InputProps={{
              style: { fontSize: '1.5rem', borderRadius: '8px' },
            }}
            inputProps={{
              maxLength: 11,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includePassive}
                onChange={(e) => setIncludePassive(e.target.checked)}
                color="primary"
              />
            }
            label="Pasif Müşterileri Göster"
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ fontSize: '1.3rem', borderRadius: '8px' }}>
            Sorgula
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mb: 3, fontSize: '1.3rem', borderRadius: '8px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3, fontSize: '1.3rem', borderRadius: '8px' }}>{success}</Alert>}
        {customer && !showTable && (
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={2}
              sx={{
                padding: 6,
                borderRadius: 2,
                maxWidth: 1500,
                width: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#0288d1' }}>
                Müşteri Bilgileri
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(customer).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Typography variant="subtitle1" gutterBottom>
                      {key.replace('_', ' ')}: {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}
        {showTable && (
          <Box sx={{ mt: 5 }}>
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columns}
                rowSelection="multiple"
                onSelectionChanged={(event) => setSelectedRows(event.api.getSelectedRows())}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeOptions={[10, 20, 50]}
                domLayout='autoHeight'
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 3, fontSize: '1.3rem', borderRadius: '8px' }}
              onClick={handleMarkAsPassive}
            >
              Seçilenleri Pasif Yap
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, ml: 2, fontSize: '1.3rem', borderRadius: '8px' }}
              onClick={handleReactivate}
            >
              Seçilenleri Aktif Yap
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CustomerInfo;
