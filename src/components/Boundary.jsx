import React from 'react';

/**
 * Catches any crash inside a game so the child never sees a blank screen.
 * Shows a friendly message and a button that starts the activity again.
 */
export default class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, detail: '' };
  }

  static getDerivedStateFromError(error) {
    return { failed: true, detail: String((error && error.message) || error) };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Activity crashed:', error, info);
  }

  componentDidUpdate(prev) {
    // a new activity or subject clears the error
    if (prev.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false, detail: '' });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="stage">
        <div className="picture">🙂</div>
        <div className="prompt">Let us try that again</div>
        <div className="word">Something went wrong in this game.</div>
        <div className="row">
          <button className="btn on" onClick={() => this.setState({ failed: false, detail: '' })}>
            🔄 Try again
          </button>
          {this.props.onHome && (
            <button className="btn" onClick={this.props.onHome}>🏠 Choose class</button>
          )}
        </div>
        <details className="detail">
          <summary>For a grown-up</summary>
          <code>{this.state.detail}</code>
        </details>
      </div>
    );
  }
}
