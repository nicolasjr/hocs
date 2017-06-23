import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FunctionalContentList from './FunctionalContentList';
import ComponentContentList from './ComponentContentList';
import { fetchMoreEntries } from './actions';


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 100px 200px;
  background-color: powderblue;
  display: flex;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previousAmountOfEntries: 0 };

    this.handleFetchEntries = this.handleFetchEntries.bind(this);
  }

  handleFetchEntries() {
    const { entries, fetchEntries } = this.props;
    if (entries.size > this.state.previousAmountOfEntries) {
      this.setState({ previousAmountOfEntries: entries.size });
      fetchEntries();
    }
  }

  render() {
    return (
      <Wrapper>
        <FunctionalContentList entries={this.props.entries} fetchEntries={this.handleFetchEntries} />
        <ComponentContentList entries={this.props.entries} fetchEntries={this.handleFetchEntries} />
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  entries: ImmutablePropTypes.list,
  fetchEntries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  entries: state.get('entries'),
});

const mapDispatchToProps = {
  fetchEntries: fetchMoreEntries,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
