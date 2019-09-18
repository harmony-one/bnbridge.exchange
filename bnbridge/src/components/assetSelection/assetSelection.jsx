import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import Store from "../../stores";
import Select from '../common/select';


const dispatcher = Store.dispatcher
const emitter = Store.emitter
const store = Store.store

const styles = theme => ({
  root: {
    maxWidth: '400px'
  },
  container: {
    display: 'flex',
    alignItems: 'flex-end'
  }
});


class AssetSelection extends Component {
  state = {
    tokens: null,
    tokenOptions: [],
    token: 'Harmoy ONE Token',
  };

  componentWillMount() {
    // emitter.on(TOKENS_UPDATED, this.tokensUpdated);
    // dispatcher.dispatch({type: GET_TOKENS, content: {} })
  };

  componentWillUnmount() {
    // emitter.removeListener(TOKENS_UPDATED, this.tokensUpdated);
  };

  tokensUpdated = () => {
    const tokens = store.getStore('tokens')
    const tokenOptions = tokens.map((token) => {
      return {
        value: token.uuid,
        description: token.name + " ("+token.symbol+")"
      }
    })

    let selectedToken = null

    if(window.location.pathname !== "" && window.location.pathname !== "/") {
      const symbolToken = window.location.pathname.substr(1)
      let filteredTokens = tokens.filter((token) => {
        return token.symbol === symbolToken || token.name === symbolToken
      })

      if(filteredTokens.length > 0) {
        selectedToken = filteredTokens[0].uuid
        this.props.onTokenSelected(selectedToken)
      }
    }

    this.setState({
      tokens: tokens,
      tokenOptions: tokenOptions,
      token: selectedToken
    })
  };

  onSelectChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)

    if(event.target.id === 'token') {
      this.props.onTokenSelected(event.target.value)
    }
  };

  render() {
    const {
      classes,
      disabled
    } = this.props

    const {
      tokenOptions,
      token,
      tokenError
    } = this.state

    console.log('minh asset', token)

    return (
      <Grid container className={ classes.root }>
        <Grid item xs={ 12 }>
          <Select
            id="token"
            fullWidth={ true }
            label="Token"
            placeholder="Select Token"
            options={ tokenOptions }
            value={ token }
            error={ tokenError }
            handleChange={ this.onSelectChange }
            disabled={ disabled }
          />
        </Grid>
        {/*<Grid item xs={ 3 } className={ classes.container }>
          <Button
            label="Issue"
            disabled={ disabled }
            onClick={ onIssue }
          />
        </Grid>*/}
      </Grid>
    )
  }
}

AssetSelection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssetSelection);
