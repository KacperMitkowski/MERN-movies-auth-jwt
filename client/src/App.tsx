import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import LoginUser from './components/Auth/LoginUser';
import Details from './components/Details/Details';
import Unauthorized from './components/Unauthorized/Unauthorized';
import RegisterUser from './components/Auth/RegisterUser';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';

const theme = createTheme({
  typography: {
    "fontFamily": `"Open Sans", sans-serif`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 700
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/movies" />} />
            <Route path="/movies" exact component={Home} />
            <Route path="/movies/search" exact component={Home} />
            <Route path="/movies/:id" exact component={Details} />
            <Route path="/loginUser" exact component={LoginUser} />
            <Route path="/register" exact component={RegisterUser} />
            <Route path="/addMovie" exact component={AddMovie} />
            <Route path="/editMovie/:id" exact component={EditMovie} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
