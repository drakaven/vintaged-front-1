import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../store'

// Import components
import Header from './Home/Header'
import Wrapper from './Home/Wrapper'
import HomeContent from './Home/HomeContent'

// Import actions
import { uiActions } from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winesFetched: props.common.wines.length,
    }
    this.toggleNav = this.toggleNav.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.common.wines !== prevProps.common.wines) {
      if (this.props.common.wines.length) {
        this.setState({
          winesFetched: true
        })
      }
    }
  }

  toggleNav() {
    store.dispatch(uiActions.toggleNav(!this.props.ui.openNav))
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <HomeContent
          wines={this.props.common.wines}
          winesFetched={this.state.winesFetched}
          toggleNav={this.toggleNav}
          openNav={this.props.ui.openNav}
        />
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

// Static type checking for props
Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  common: PropTypes.object,
  ui: PropTypes.object.isRequired,
}

// Set default value for prop if not required and not present
Home.defaultProps = {
  common: {}
}

export default connect(mapStateToProps)(Home)