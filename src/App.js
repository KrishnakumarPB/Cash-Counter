
import './App.css';
import React,{Component} from 'react'
import Results from './Result';
import "./style.css"
const currencyarr=[2000,500,200,100,20,10,5,2,1];
let denominations={};
let quotient;
let reminder="";
let currentamount;
let i="";
var value="";
let keys="";
let values="";

currencyarr.sort( function( b,a){
  if(a > b) return 1;
  if(a < b) return -1;
  return 0;
});
class App extends Component {
  constructor(){
    super()
      this.state={
        amount:""
      }
      this.handleChange=this.handleChange.bind(this);
    
  }
handleChange(event){
    denominations={};
    quotient="";
    reminder="";
    currentamount="";
    i="";
    value="";
    keys="";
    values="";
    console.log(event.target);
    value=event.target.value;
    this.setState({
      amount:value,
      currencydenominations:""
    })
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
//************************Logic****************************************
handleSubmit(){
currentamount=value;
currentamount=Math.floor(currentamount)
for (i=0;i<currencyarr.length;i++)
{
if (currencyarr[i]<= currentamount && (reminder ==="" || reminder !==0))
{
  console.log(`before reminder${reminder}`)
  quotient=Math.floor(currentamount/currencyarr[i]);
  denominations[currencyarr[i]]=quotient;
  reminder=Math.floor(currentamount%currencyarr[i]);
  console.log(`reminder${reminder}`)
  if (reminder !== 0)
  {
    currentamount=reminder;
    // console.log(`reminder${reminder}`)
  }
  else{
    break;
  }
  console.log(`i=${i} and quotient =${quotient} and reminder=${reminder} /currency=${currencyarr[i]}`)
}

}
console.log(denominations)
keys=Object.keys(denominations);
values=Object.values(denominations);
this.setState({
  currencydenominations:Object.entries(denominations).map(([key,value])=>{
         return (  <Results currency={key} number= {value.toString()}/>)
    
  })
})
}
  render(){
  

  return (
    <div className="App">
      <div className="container-center">
        <div className="interface">
          <h1>The Cash Counter</h1>
          <input className="input"  type="number" onChange={this.handleChange} name="amount" value={this.state.amount}></input>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          <div className="result-container">
          {this.state.currencydenominations}
          </div>
        </div>
      </div>
    </div>
  )}
}

export default App;
