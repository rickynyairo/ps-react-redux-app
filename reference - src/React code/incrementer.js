class Button extends React.Component {
	
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementalValue);
    }
      render () {
        return (
          <button onClick = { this.handleClick }>
            +{ this.props.incrementalValue}
        </button>
      );
    }
  }
  class Result extends React.Component {
      render () {
        return (
          <div> {this.props.counter} </div>
      );
    }
  }
  
  class App extends React.Component {
      state = {
      counter: 9
    };
    
    incrementalCounter = (incrementalVal) => {
        this.setState((prevState) => ({ counter: prevState.counter + incrementalVal }));
    };
      render () {
        return (
          <div>
            <Button incrementalValue = {1} onClickFunction = { this.incrementalCounter }/>
          <Button incrementalValue = {10} onClickFunction = { this.incrementalCounter }/>
          <Button incrementalValue = {200} onClickFunction = { this.incrementalCounter }/>
          <Button incrementalValue = {5000} onClickFunction = { this.incrementalCounter }/>
          <Result counter = { this.state.counter } />
          </div>
      );
    }
  }
  
  ReactDOM.render(<App />, mountNode);