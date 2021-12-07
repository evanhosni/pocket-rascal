import React, { useContext } from "react";
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
import API from "../../utils/API"
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

export default function SignIn(props) {

  const classes = useStyles();

  const myContext = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password')
    }
    API.login(user).then(async (res) => {
      myContext.setUser(res.data.user.email, res.data.user.id)
      myContext.setUserToken(res.data.token)
      localStorage.setItem("token", res.data.token)
      const rascalDat = await API.loadRascal(res.data.user.id)
        console.log(rascalDat)
        const equipDat = await API.loadEquippedItems(rascalDat.data.id)
        const unlockDat = await API.loadUnlockedItems(rascalDat.data.id)
        myContext.setUserRascal(rascalDat.data)
        myContext.setEquipItems(equipDat.data)
        myContext.setUnlockItems(unlockDat.data)
      myContext.setCurrentPage('Dashboard')
    }).catch(err => {
      alert("Incorrect Credentials")
      console.log(err);
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
        <Container style={{ marginRight: 'auto', marginLeft: 'auto', display: 'flex', justifyContent: 'center' }}
          component='side' maxWidth='sm' sx={{mt:0}}>
          <img src='./assets/rascal-ex1.png' alt='' />
          <img src='./assets/rascal-ex2.png' alt='' />
          <img src='./assets/rascal-ex3.png' alt='' />
        </Container>
        <Container maxWidth='xs' sx={{height:'100px',textAlign:'center'}} >
          <img src='./assets/title.png' style={{height: '80px'}} alt='' />
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
              SIGN IN
            </Typography>
            <br />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
              <TextField
                InputProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                InputLabelProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <br />
              <TextField
                InputProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                InputLabelProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
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
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button style={{ fontFamily: "'Nanum Pen Script', sans-serif" }} onClick={() => myContext.setCurrentPage('SignUp')} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}