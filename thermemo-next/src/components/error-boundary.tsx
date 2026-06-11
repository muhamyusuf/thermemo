"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
          <div
            className="text-4xl"
            style={{ fontFamily: "var(--font-jp)", color: "var(--primary)" }}
          >
            記片
          </div>
          <h2 className="text-2xl font-bold">Something went wrong.</h2>
          <p className="text-muted-foreground max-w-md">
            halaman ini mengalami masalah teknis. coba refresh halaman atau
            hubungi kami jika masalah berlanjut.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Refresh halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
