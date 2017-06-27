import React, { Component } from 'react'
import { connect } from 'react-redux';
import { retrieveNotes } from '../store/reducers/notes';

class Notebook extends Component {
  componentDidMount() {
    this.props.retrieveNotes()
  }

  render() {
    return (
      <div className="notebook">
      </div>
    );
  }
}

const mapStateToProps = ({ notes }) => ({ notes })

const mapDispatchToProps = dispatch => ({
  retrieveNotes: () => dispatch(retrieveNotes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Notebook)
