import React, { PureComponent } from 'react';
import { getDisplayName } from './helpers';

const valuesParser = (mapValues) => (WrappedComponent) => {
  class ValuesParser extends PureComponent { // eslint-disable-line
    render() {
      const props = mapValues ? mapValues(this.props) : this.props;
      return <WrappedComponent {...props} />;
    }
  }

  ValuesParser.displayName = getDisplayName(WrappedComponent);

  return ValuesParser;
};

export default valuesParser;
