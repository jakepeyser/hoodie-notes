import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { addNote } from '../store/redux';

class App extends Component {
  render() {
    return (
      <div className="notes">
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // addNote: (newStatus) => dispatch(addNote(newStatus))
})

export default connect(null, mapDispatchToProps)(App)
