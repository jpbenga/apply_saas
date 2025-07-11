import React, { Component } from 'react';
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur capturée :', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oups ! Quelque chose s'est mal passé
            </h2>
            <p className="text-gray-700 mb-4">
              Nous sommes désolés, une erreur s'est produite lors du chargement
              de l'application.
            </p>
            <div className="bg-gray-100 p-3 rounded-md mb-4 overflow-auto max-h-40">
              <code className="text-sm text-gray-800">
                {this.state.error?.toString()}
              </code>
            </div>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Rafraîchir la page
            </button>
          </div>
        </div>;
    }
    return this.props.children;
  }
}