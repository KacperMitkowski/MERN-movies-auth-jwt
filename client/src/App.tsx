import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Details from './components/Details/Details';
import Unauthorized from './components/Unauthorized/Unauthorized';

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
            <Route path="/" exact component={() => <Redirect to="/movies?page=1" />} />
            <Route path="/movies" exact component={Home} />
            <Route path="/movies/:id" exact component={Details} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
