import React from 'react';
import styled from 'styled-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { infiniteScroller } from 'hocs';

const Wrapper = styled.div`
  overflow: hidden;
  width: 50%;
  height: 100%;
  border-radius: 4px;
  border: 2px solid #aeaeae;
  background-color: #dfdfdf;
`;

const FunctionalContentList = ({ entries }) => (
  <Wrapper>
    <ul>
      {entries.map((e) => <li key={e}>{e}</li>)}
    </ul>
  </Wrapper>
);

FunctionalContentList.propTypes = {
  entries: ImmutablePropTypes.list,
};

const mapLoaderCallback = (ownProps) => ownProps.fetchEntries;

export default infiniteScroller(mapLoaderCallback)(FunctionalContentList);
