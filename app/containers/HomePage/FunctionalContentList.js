import React from 'react';
import styled from 'styled-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { infiniteListDisplay } from 'hocs';

const Wrapper = styled.div`
  overflow: hidden;
  width: 50%;
  height: 100%;
  border-radius: 4px;
  border: 2px solid #aeaeae;
  background-color: #dfdfdf;
`;

const FunctionalContentList = () => (
  <Wrapper />
);

FunctionalContentList.propTypes = {
  entries: ImmutablePropTypes.list,
};

const mapLoaderCallback = (ownProps) => ownProps.fetchEntries;

const mapListToState = (ownProps) => ({
  totalEntries: ownProps.entries.size,
  entryHeight: 24,
  renderEntry({ index, key }) { // eslint-disable-line
    return (
      <li key={key}>
        {ownProps.entries.get(index)}
      </li>
    );
  },
});

export default infiniteListDisplay(mapLoaderCallback, mapListToState)(FunctionalContentList);
