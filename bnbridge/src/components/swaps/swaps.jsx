import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Typography,
  Grid
} from '@material-ui/core';
import { colors } from '../../theme/theme'

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";

import FirstPage from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPage from "@material-ui/icons/LastPage";

import {
  SWAPS_UPDATED,
  GET_SWAPS,
} from '../../constants/constants'

import Store from "../../stores/store";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return <div className={classes.root}>
      <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>;
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);

const styles = theme => ({
  root: {
    width: '800px',
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
    swaps: [],
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
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
    const { classes } = this.props;
    const { swaps, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, swaps.length - page * rowsPerPage);

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">ETH Addr</TableCell>
            <TableCell align="right">BNB Addr</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Deposit</TableCell>
            <TableCell align="right">Transfer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderSwaps(swaps, page, rowsPerPage) }
          {
            emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={3} count={swaps.length} rowsPerPage={rowsPerPage} page={page} SelectProps={{
              native: true
            }} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped} />
          </TableRow>
        </TableFooter>
      </Table>
    )
  };

  renderSwaps = (swaps, page, rowsPerPage) => {
    if (!this.state.swapsDisplay) {
      return null
    }

    return this.state.swapsDisplay
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((swap) => {
        return <TableRow key={swap.transfer_transaction_hash}>
          <TableCell component="th" scope="row">
            {swap.created}
          </TableCell>
          <TableCell align="right">{swap.eth_address}</TableCell>
          <TableCell align="right">{swap.bnb_address}</TableCell>
          <TableCell align="right">{swap.amount}</TableCell>
          <TableCell align="right">{swap.deposit_transaction_hash}</TableCell>
          <TableCell align="right">{swap.transfer_transaction_hash}</TableCell>
        </TableRow>
      })
  }
}

Swaps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Swaps);
