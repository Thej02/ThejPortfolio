import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 my-4 bg-red-500/10 border border-red-500/25 rounded-2xl text-center text-pastel-text">
          <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
          <p className="text-sm text-pastel-muted mb-4">
            {this.state.error?.message || "Failed to load this section."}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })} 
            className="px-4 py-2 bg-gradient-to-r from-pastel-primary to-pastel-tertiary text-white rounded-lg text-xs font-bold shadow-md hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
