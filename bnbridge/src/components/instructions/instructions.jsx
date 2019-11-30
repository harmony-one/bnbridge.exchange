import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Link
} from '@material-ui/core';
import { colors } from '../../theme';

import {
  FEES_UPDATED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const store = Store.store

const styles = theme => ({
  root: {
    width: '525px',
  },
  header: {
    fontSize: '2.4rem',
    color: colors.harmony,
    marginBottom: '10px',
    fontWeight: 700,
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
  },
  action: {
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: "0.5rem"
  },
  actionHighlight: {
    fontSize: '0.9rem',
    color: '#000000',
    display: 'inline-block',
    marginTop: "0.5rem"
  },
  actionLink: {
    fontSize: '0.9rem',
    color: '#2196f3',
    display: 'inline-block',
    marginTop: "0.5rem"
  },
  action2: {
    fontSize: '0.85rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: "0.5rem"
  },
  actionRed: {
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: '0.5rem',
    fontWeight: 'bold'
  },
  price: {
    paddingRight: '60px',
    fontSize: '1rem',
    color: colors.lightBlack,
    display: 'inline-block',
    marginTop: '0.5rem'
  }
});

class Instructions extends Component {
  state = {
    fees: []
  };

  componentDidMount() {
    emitter.on(FEES_UPDATED, this.feesUpdated);
  };

  componentWillUnmount() {
    emitter.removeListener(FEES_UPDATED, this.feesUpdated);
  };

  feesUpdated = () => {
    const fees = store.getStore('fees')

    let feesDisplay = fees.map((fee) => {
      let description = ""

      switch (fee.msg_type) {
        case 'submit_proposal':
          description = 'Submit Listing Proposal'
          break;
        case 'dexList':
          description = 'Listing On DEX'
          break;
        case 'issueMsg':
          description = 'Issue New Token'
          break;
        case 'send':
          description = 'Transfer Tokens'
          break;
        case 'list_proposal_deposit':
          description = 'Listing Proposal Deposit'
          break;
        default:
          break;
      }

      return {
        description: description,
        price: fee.fee / 100000000
      }
    })

    this.setState({
      fees,
      feesDisplay: feesDisplay,
    })
  };

  renderBep2ToErc20() {
    const {
      classes
    } = this.props;

    return (
      <Grid
        container
        justify="flex-start"
        display="table">
        <Grid style={{ display: 'table', }} item xs={12} align='left'>
          <div style={{ display: 'table', }} className={classes.root}>
            <Typography className={classes.header} style={{ marginTop: '10px' }}>With bnbridge you can:</Typography>
            <li><Typography className={classes.action}>Swap between ERC20 and BEP2 tokens</Typography></li>
          </div>
        </Grid>
      </Grid>
    )
  };

  renderErc20ToBep2() {
    const {
      classes
    } = this.props;

    return (
      <Grid
        container
        justify="flex-start"
        display="table">
        <Grid style={{ display: 'table', }} item xs={12} align='left'>
          <div style={{ display: 'table', }} className={classes.root}>
            <Typography className={classes.header} style={{ marginTop: '10px' }}>With bnbridge you can:</Typography>
            <li><Typography className={classes.action}>Swap between ERC20 and BEP2 tokens</Typography></li>
          </div><br/>
          <div>
            <Typography className={classes.actionHighlight}>
              If you are using a binance.com account, your 9 digit ONE deposit memo is required in addition to your ONE address.
              <br/>
              <Typography component={'span'} className={classes.actionLink}>
                <Link href="https://www.binance.vision/tutorials/how-to-deposit" rel="noopener noreferrer" target="_blank">How to find your deposit MEMO?</Link>
              </Typography>
            </Typography>
<<<<<<< HEAD
            <img src={require('../../assets/images/MEMO_Example.png')}  stylalt="bnb memo example"e={{width: '100%'}}></img>
=======
            <img src={ require('../../assets/images/MEMO_Example.png')} style={{width: '80%'}} alt="bnb memo example"></img>
>>>>>>> 3a33a6b98f305aa83b058cdeeec07211a58da3ec
          </div>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {
      classes,
      swapDir
    } = this.props;

    return (
      <Grid container className={ classes.root }>
          { swapDir === 'Bep2ToErc20' && this.renderBep2ToErc20() }
          { swapDir === 'Erc20ToBep2' && this.renderErc20ToBep2() }
      </Grid>
    )
  };

  renderFees = () => {
    const {
      classes
    } = this.props;

    if (!this.state.feesDisplay) {
      return null
    }

    return this.state.feesDisplay.map((fee) => {
      return (
        <React.Fragment key={fee.description}>
          <Grid item xs={6} align='left' className={classes.action}>
            {fee.description}
          </Grid>
          <Grid item xs={6} align='right' className={classes.price}>
            {fee.price} BNB
          </Grid>
        </React.Fragment>
      )
    })
  }
}

Instructions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Instructions);
