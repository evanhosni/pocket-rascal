import React, { useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../../utils/API';
import { makeStyles } from '@mui/styles';
import AppContext from './../AppContext'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pocket Rascal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  form: {
    fontFamily: "'Nanum Pen Script', sans-serif",
    "&MuiInputLabel-root": {
      fontFamily: "'Nanum Pen Script', sans-serif",
    }
  },
  button: {
    color: 'white',
    fontFamily: "'Nanum Pen Script', sans-serif",
    fontSize: 'x-large',
    backgroundColor: '#00717f'
  }
});

const theme = createTheme();

export default function SignUp(props) {

  const classes = useStyles();

  const myContext = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      email: data.get('email'),
      password: data.get('password')
    };
    API.signup(newUser).then(response => {
      API.login(newUser).then(res => {
        console.log(res)
        myContext.setUser(res.data.user.email, res.data.user.id)
        myContext.setUserToken(res.data.token)
        localStorage.setItem("token", res.data.token)
        myContext.setCurrentPage('CreateRascal')
      }).catch(err => {
        alert("Signup Failed")
        console.log(err);
      })
    })

  };

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
        <Container style={{ marginRight: 'auto', marginLeft: 'auto', display: 'flex', justifyContent: 'center' }}
          component='side' maxWidth='sm' sx={{ mt: 0 }}>
          <img src='./assets/rascal-ex1.png' alt='' />
          <img src='./assets/rascal-ex2.png' alt='' />
          <img src='./assets/rascal-ex3.png' alt='' />
        </Container>
        <Container maxWidth='xs' sx={{ height: '100px', textAlign: 'center' }} >
          <img src='./assets/title.png' style={{ height: '80px' }} alt='' />
        </Container>
        <Container
          component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: '#00717f' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}>
              SIGN UP
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                    InputLabelProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                    required
                    fullWidth
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                    InputLabelProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                style={{
                  color: 'white',
                  fontFamily: "'Nanum Pen Script', sans-serif",
                  fontSize: 'x-large',
                  backgroundColor: '#00717f'
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button style={{ fontFamily: "'Nanum Pen Script', sans-serif" }} onClick={() => myContext.setCurrentPage('Login')} variant="body2">
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}