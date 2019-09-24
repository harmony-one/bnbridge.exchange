import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid
} from '@material-ui/core';
import { colors } from '../../theme/theme'

import {
  SWAPS_UPDATED,
  GET_SWAPS,
} from '../../constants/constants'

import Store from "../../stores/store";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    width: '400px',
    marginBottom: '24px'
  },
  header: {
    fontSize: '2.4rem',
    color: colors.yellow,
    marginBottom: '24px',
    fontWeight: 400,
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
  },
  action: {
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: "0.5rem"
  },
  actionRed: {
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: "0.5rem",
    fontWeight: 'bold'
  },
  price: {
    paddingRight: '60px',
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: "0.5rem"
  }
});

class Swaps extends Component {
  state = {
    swaps: []
  };

  componentWillMount() {
    emitter.on(SWAPS_UPDATED, this.swapsUpdated);
    dispatcher.dispatch({ type: GET_SWAPS, content: {} })
  };

  componentWillUnmount() {
    emitter.removeListener(SWAPS_UPDATED, this.swapsUpdated);
  };

  swapsUpdated = () => {
    const swaps = store.getStore('swaps')

    let swapsDisplay = swaps.map((swap) => {
      return {
        eth_address: swap.eth_address,
        bnb_address: swap.bnb_address,
        amount: swap.amount,
        deposit_transaction_hash: swap.deposit_transaction_hash,
        transfer_transaction_hash: swap.transfer_transaction_hash,
        processed: swap.processed,
        created: swap.created,
        direction: swap.direction,
      }
    })

    this.setState({
      swaps,
      swapsDisplay: swapsDisplay,
    })
  };

  render() {
    const {
      classes
    } = this.props;

    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-end">
        <Grid item xs={12} align='left'>
          {<div className={ classes.root } >
            <Typography className={ classes.header }>Bnbridge swaps:</Typography>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-end">
                { this.renderSwaps() }
            </Grid>
          </div> }
        </Grid>
      </Grid>
    )
  };

  renderSwaps = () => {
    const {
      classes
    } = this.props;

    if (!this.state.swapsDisplay) {
      return null
    }

    return this.state.swapsDisplay.map((swap) => {
      return <React.Fragment key={swap.transfer_transaction_hash}>
        <Grid item xs={6} align='left' className={classes.action}>
          {swap.eth_address}
        </Grid>
        <Grid item xs={6} align='right' className={classes.price}>
          {swap.transfer_transaction_hash}
        </Grid>
      </React.Fragment>
    })
  }
}

Swaps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Swaps);
