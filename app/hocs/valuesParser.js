import React, { PureComponent } from 'react';

const valuesParser = (mapValues) => (WrappedComponent) => {
  class ValuesParser extends PureComponent { // eslint-disable-line
    render() {
      const props = mapValues ? mapValues(this.props) : this.props;
      return <WrappedComponent {...props} />;
    }
  }

  return ValuesParser;
};

export default valuesParser;
