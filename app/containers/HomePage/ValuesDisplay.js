import React, { PropTypes } from 'react';
import { valuesParser } from 'hocs';

const ValuesDisplay = ({
  amount,
}) => (
  <div>
    {amount}
  </div>
);

ValuesDisplay.propTypes = {
  amount: PropTypes.string.isRequired,
};

const mapValues = (ownProps) => ({
  amount: `${ownProps.totalAmount}%`,
});

export default valuesParser(mapValues)(ValuesDisplay);
