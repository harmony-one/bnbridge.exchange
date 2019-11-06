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
        style={{ padding: '5.0rem 30.0rem'}}
        container
        justify="center"
        alignItems="center"
        direction="row">
        <Grid item align='right'>
          <Instructions />
        </Grid>
        <Grid item align="left">
          <Controller />
        </Grid>
      </Grid>
      <Grid
        style={{ padding: '5.0rem 15%', display: 'inline-block'}}
        container
        justify="center"
        alignItems="center"
        direction="row">
        <Grid item align="left" style={{ width: '100%' }}>
          <Swaps />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
