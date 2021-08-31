import React, { Component } from 'react'
import { Button, Card, CardBody, CardText, CardGroup, CardTitle } from 'reactstrap';
import { TextInput } from "react-native"
import Typography from '@material-ui/core/Typography';
/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
  
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: '',
      title: '',
      tag: '',
      saveTag: '',
      cards: [],
      items: [],
      done: false,
      due: false
    };
    this.createCard = this.createCard.bind(this);
    this.newTag = this.newTag.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.create = this.create.bind(this);
  }
  createCard() {
    this.state.cards.push(this.state.tag);
    this.setState({
      cards: this.state.cards,
      saveTag: this.state.tag
    })
  }
  removeCard(index) {
    var newCards = this.state.cards.filter(card => card !== this.state.cards[index]);
    this.setState({
      cards: newCards,
    })
  }
  newTag(index) {
    return (
      <Card variant="outlined" onClick={(e)=>{this.removeCard(index)}}>
        <CardBody>
          <CardTitle>
            X
          </CardTitle>
          <CardText>{this.state.cards[index]}</CardText>
        </CardBody>
      </Card>
    );
  }
  create() {
    if(this.state.title !== '' && !isNaN(Date.parse(this.state.date))) {
      this.state.items.push({title: this.state.title, tags: this.state.cards, dueDate: this.state.date, color: 'green'});
      this.sort('')
      this.setState({
        tag: '',
        title: '',
        date: '',
        cards: []
      })
    } else {
      alert('Missing Title or Invalid Date')
    }
  }
  sort(btn) {
    if ((btn === "done" && this.state.due && !this.state.done) || (btn === "date" && this.state.done && !this.state.due) || (btn === '' && this.state.done && this.state.due)) {
      this.dateSort()
      this.doneSort()
    } else if ((btn === "done" && !this.state.done && !this.state.due) || (btn === "date" && this.state.done && this.state.due) || (btn === '' && this.state.done && !this.state.due)) {
      this.doneSort()
    } else if ((btn === "done" && this.state.done && this.state.due) || (btn === "date" && !this.state.done && !this.state.due) || (btn === '' && !this.state.done && this.state.due)) {
      this.dateSort()
    }
    if (btn === "done") {
      this.setState({
        done: !this.state.done
      })
    } else if (btn === "date") {
      this.setState({
        due: !this.state.due
      })
    }
  }
  doneSort() {
    const complete = this.state.items.filter(item => item.color === 'green')
    const incomplete = this.state.items.filter(item => item.color === 'grey')
    const temp = []
    complete.forEach(element => temp.push(element))
    incomplete.forEach(element => temp.push(element))
    console.log(temp)
    this.setState({
      items: temp
    })
  }
  dateSort() {
    var temp = this.state.items
    temp = temp.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))
    console.log(temp)
    this.setState({
      items: temp
    })
  }
  changeColor (index) {
    if (this.state.items[index].color === 'grey') {
      this.state.items[index].color = 'green'
    } else {
      this.state.items[index].color = 'grey'
    }
    this.setState ({
      items: this.state.items
    })
  }
  tags(arr) {
    var myStr = ''
    if (arr !== undefined) {
      for (var i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          myStr = myStr + arr[i]
        } else {
          myStr = myStr + arr[i] + ", "
        }
      }
    }
    return (
      myStr
    )
  }
  todo(index) {
    return(
      <Card variant="outlined" style={{flex:1, backgroundColor: this.state.items[index].color}} onClick={(e)=>{this.changeColor(index)}}>
        <CardBody>
          <CardTitle>
            {this.state.items[index].title}
          </CardTitle>
          <Typography>
            tags: {this.tags(this.state.items[index].tags)}
          </Typography>
          <Typography>
            due by: {this.state.items[index].dueDate}
          </Typography>
        </CardBody>
      </Card>
    )
  }
  
  render(){
    return (
      <div>
        <div>
          {'Title:'}
          <TextInput
            style={{height: 40}}
            placeholder="Click to Type"
            onChangeText={title => this.setState({title})}
            value={this.state.title}
          />
        </div>
        <div>
          {'Tags:'}
          <TextInput
            style={{height: 40}}
            placeholder="Click to Type"
            onChangeText={tag => this.setState({tag})}
            value={this.state.tag}
          />
          <Button onClick={this.createCard} color="secondary">Create New Tag</Button>
        </div>
        <div>
        <CardGroup>
          {this.state.cards.map((card, index) => this.newTag(index))}
        </CardGroup>
        </div>
        <div>
          {'Due Date:'}
          <TextInput
            style={{height: 40}}
            placeholder="mm/dd/yyyy"
            onChangeText={date => this.setState({date})}
            value={this.state.date}
          />
        </div>
        <div>
          <Button onClick={this.create} color="secondary">Create</Button>{' '}
        </div>
        <div>
          <Button className={this.state.done ? "App-Button-Active" : "App-Button-Default"} onClick={()=> this.sort('done')}>Sort by Done</Button>
          <Button className={this.state.due ? "App-Button-Active" : "App-Button-Default"} onClick={()=> this.sort('date')}>Sort by Date</Button>
        </div>
        <div>
        <CardGroup>
          {this.state.items.map((card, index) => this.todo(index))}
        </CardGroup>
        </div>
      </div>
    )
  }
}


