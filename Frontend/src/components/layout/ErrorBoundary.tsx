import { Component, type ErrorInfo, type ReactNode } from "react";
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  private handleReload = () => {
    window.location.href = "/";
  };
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF0F6] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(255,107,157,0.15)] max-w-md w-full border border-pink-100 animate-[fade-in_0.4s_ease-out_forwards]">
            <span className="text-6xl mb-4 block">😿</span>
            <h1 className="text-2xl font-bold text-[#1A0A10] mb-2">Something went wrong</h1>
            <p className="text-sm text-gray-500 mb-6">
              Even the best cats trip sometimes. We encountered an unexpected error.
            </p>
            {this.state.error && (
              <div className="bg-pink-50 text-xs text-left p-3 rounded-lg overflow-x-auto font-mono text-[#C9184A] mb-6 max-h-32 border border-pink-100">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="w-full bg-[#FF6B9D] hover:bg-[#C9184A] text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              Take Me Back Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
