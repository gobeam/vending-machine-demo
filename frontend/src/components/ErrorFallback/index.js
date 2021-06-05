import React from 'react';
import PropTypes from 'prop-types';

const ErrorFallback = (props) => {
  const { error, resetErrorBoundary, intl } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
          Try again
      </button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

export default ErrorFallback;
