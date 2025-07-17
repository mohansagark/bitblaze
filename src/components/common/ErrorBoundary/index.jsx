import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and external service in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Report to error tracking service and call onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='error-boundary p-8 text-center bg-red-50 border border-red-200 rounded-lg m-4'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>Something went wrong</h2>
          <p className='text-red-700 mb-4'>
            An unexpected error occurred. Please try refreshing the page.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className='text-left bg-gray-100 p-4 rounded mt-4'>
              <summary className='cursor-pointer font-semibold mb-2'>
                Error Details (Development Only)
              </summary>
              <pre className='text-sm text-red-800 whitespace-pre-wrap'>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  fallback: null,
  onError: null,
};

export default ErrorBoundary;
