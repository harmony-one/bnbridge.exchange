import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Grid, GridColumn
} from '@material-ui/core';

import bnbridgeTheme from './theme';

// import Header from './components/header';
import Instructions from './components/instructions';
import Controller from './components/controller';
import Swaps from './components/swaps';

function App() {
  return (
    <MuiThemeProvider theme={ createMuiTheme(bnbridgeTheme) }>
      <CssBaseline />
      <Grid
        style={{ padding: '0 1.0rem'}}
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
        style={{ padding: '0 1.0rem', display: 'inline-block'}}
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
