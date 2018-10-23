const Card = (props) => {
	return (
  	<div style = {{ margin:'1em' }} >
  	  <img width='75' src = { props.avatar_url }/>
      <div style = {{ display:'inline-block', marginLeft: 10 }}>
        <div style = {{ fontSize: '1.5em', fontWeight: 'bold' }} >{ props.name }</div>
        <div>{ props.company }</div>
      </div>
  	</div>
  );
};



class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then((resp) => {
      	this.props.onSubmit(resp.data);
      })
      .catch((err) => {
      	console.log(err);
      });
  };
	render(){
  	return(
    	<form onSubmit = {this.handleSubmit}>
    	  <input value = { this.state.userName }
        	onChange = { (event) => this.setState({ userName: event.target.value }) }
        	type="text" placeholder = "Github Username" required />
        <input type="submit" value = "Add Card"/>
    	</form>
    );
  }
}

const CardList = (props) => {
	return(
  	<div>
    	{ props.cards.map(card => <Card { ...card }/>) }
    </div>
  );
};

class App extends React.Component {
	state = {
  	cards:[
      {
        name:"Ricky Nyairo",
        avatar_url: avatar_url = "https://avatars0.githubusercontent.com/u/20772882?v=4",
        company:"Andela"
      },
      {
        name:"Paul O'Shannesy",
        avatar_url: avatar_url = "https://avatars0.githubusercontent.com/u/8445?v=3",
        company:"Facebook"
      },
      {
        name:"Ben Alpert",
        avatar_url: avatar_url = "https://avatars0.githubusercontent.com/u/6820?v=3",
        company:"Facebook"
      }
		]
  }
  addNewCard = (cardInfo) => {
  	this.setState((prevState) => {
    	return {
      	cards: prevState.cards.concat(cardInfo)
      };
    });
  };
	render () {
  	return (
    	<div>
    	  <Form onSubmit = { this.addNewCard }/>
      	<CardList cards = { this.state.cards } />
    	</div>
    );
  }
}
ReactDOM.render(<App />, mountNode);