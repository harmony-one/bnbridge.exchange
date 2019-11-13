import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Grid
} from '@material-ui/core';

import bnbridgeTheme from './theme';

// import Header from './components/header';
import Instructions from './components/instructions';
import Controller from './components/controller';
import Swaps from './components/swaps';

require('dotenv').config();

function App() {
  return (
    <MuiThemeProvider theme={ createMuiTheme(bnbridgeTheme) }>
      <CssBaseline />
      <Grid
        style={{ padding: '3.0rem 20.0rem'}}
        container
        justify="center"
        alignItems="center"
        direction="row">
        <Grid item align='center' xs={6}>
          <Instructions />
        </Grid>
        <Grid item align="center" xs={6}>
          <Controller />
        </Grid>
      </Grid>
      <Grid
        style={{ padding: '0.0rem 12.0rem 0.0rem 12.0rem', display: 'table'}}
        container
        justify="center"
        alignItems="center"
        direction="row">
        <Grid item align="center">
          <Swaps />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
