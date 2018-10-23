import React from 'react';

let possibleCombinationSum = (arr, n) => {
    if (arr.includes(n)) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
  
  const Stars = (props) => {
      return (
        <div className="col-5" >
          { _.range(props.numberOfStars).map( i => 
            <i key = {i} className="fa fa-star" ></i>
        ) }
        </div>
    );
  };
  
  const Button = (props) => {
      let button; 
    switch(props.answerIsCorrect){
        case true:
          button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                   <i className="fa fa-check"></i>
                 </button>;
          break;
      case false:
          button = <button className="btn btn-danger">
                   <i className="fa fa-times"></i>
                 </button>;
              break;
      default:
        button = <button className="btn btn-dark" disabled = 
            {props.selectedNumbers.length === 0 }
          onClick={props.checkAnswer}
            >=</button>;
          break;
      
    }
      return (
        <div className="col-2 text-center" >
          { button }
        <br/><br/>
        <button className="btn btn-warning btn-sm" onClick={props.redraw}
                        disabled={props.doneStatus || props.redraws === 0}
        >
            <i className="fa fa-circle"></i>{props.redraws}
        </button>
        </div>
    );
  };
  
  const Answer = (props) => {
      return (
        <div className="col-5" >
          {
            props.selectedNumbers.map((number, i) => 
              <span key={i} onClick={()=>props.unselectNumber(number)}>{number}</span>
          )
        }
        </div>
    );
  };
  
  const Numbers = (props) => {
      const numberClassName = (number) => {
        if (props.usedNumbers.includes(number))
          return "used";
        if (props.selectedNumbers.includes(number))
          return "selected";
    };
      return (
        <div className="card text-center" >
          <div>
            {
              Numbers.list.map((number, i) => 
                <span key = {i} className={numberClassName(number)}
                        onClick = {() => props.selectNumber(number)}>
                  {number}
              </span>
            )
          }
          </div>
        </div>
    );
  };
  Numbers.list = _.range(1, 10);
  
  const DoneFrame = (props) => {
      return (
        <div className="text-center">
          <h2>{props.doneStatus}</h2>
        <button class="btn btn-secondary" onClick={props.resetGame}>Play Again?</button>
        </div>
    );
  };
  class Game extends React.Component {
      static randomNumber = () => 1 + Math.floor(Math.random()*9); 
      static initialState = () => ({
      selectedNumbers:[],
      randomNumberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      usedNumbers: [],
      redraws:5,
      doneStatus: null
    });
    resetGame = () => {
        this.setState(Game.initialState());
    };
    state = Game.initialState();
    selectNumber = (clickedNumber) => {
        if (!this.state.selectedNumbers.includes(clickedNumber)){
          this.setState(prevState => ({
            answerIsCorrect: null,
              selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
          }));
      }
    };
    unselectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.includes(clickedNumber)){
          this.setState(prevState => ({
            answerIsCorrect: null,
              selectedNumbers: prevState.selectedNumbers
          .filter(number => number !== clickedNumber)
          }));
      }
    };
    checkAnswer = () => {
        this.setState((prevState) => ({
          answerIsCorrect: prevState.randomNumberOfStars === 
            prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
      }));
    };
    acceptAnswer = () => {
        this.setState((prevState) => ({
          usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber()
      }), this.updateDoneStatus);
    };
    redraw = () => {
        // if (this.state.redraws === 0 ) { return; }
        this.setState((prevState) => ({
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber(),
        redraws: prevState.redraws - 1
      }), this.updateDoneStatus);
    };
    possibleSolutions = (state) => {
        const { randomNumberOfStars, usedNumbers } = state;
      const unUsedNumbers = _.range(1, 10).filter(number => !usedNumbers.includes(number));
          return possibleCombinationSum(unUsedNumbers, randomNumberOfStars)    
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
          if (prevState.usedNumbers.length === 9){
            return { doneStatus: 'Done, Nice!' };
        }
        if (prevState.redraws === 0 && !this.possibleSolutions(prevState)){
            return { doneStatus: 'Game Over!' };
        }
      });
    };
    resetFame = () => {
        
    };
      render(){
      const {
        randomNumberOfStars,
        selectedNumbers,
        answerIsCorrect,
        usedNumbers,
        redraws,
        doneStatus
      } = this.state
        return (
          <div className="container" >
            <h3>Play Nine</h3>
          <div className="row">
            <Stars numberOfStars = { randomNumberOfStars }/>
            <Button selectedNumbers = {selectedNumbers}
                            checkAnswer = {this.checkAnswer}
                    answerIsCorrect = {answerIsCorrect}
                    acceptAnswer = {this.acceptAnswer}
                    redraw = {this.redraw}
                    redraws = {redraws}
                    doneStatus={doneStatus}
            />
            <Answer selectedNumbers = {selectedNumbers}
                            unselectNumber = { this.unselectNumber }		   
            />
          </div>
          <br />
          {
              doneStatus ?
                <DoneFrame doneStatus={doneStatus} resetGame = {this.resetGame}/> :
              <Numbers selectedNumbers = {selectedNumbers}
                           selectNumber = { this.selectNumber }
                   usedNumbers = { usedNumbers }
                  />
          }
          </div>
      );
    }
  }
  
  
  class App extends React.Component {
      render(){
        return (
          <div>
            <Game />
          </div>
      );
    }
  }
  
  ReactDOM.render(<App />, mountNode);