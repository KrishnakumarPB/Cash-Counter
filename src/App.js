
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
var label="";
let amountreceived=""
let differenceamount="";

currencyarr.sort( function( b,a){
  if(a > b) return 1;
  if(a < b) return -1;
  return 0;
});
class App extends Component {
  constructor(){
    super()
      this.state={
        billamount:"",
        receivedamount:"",
        currencydenominations:""
      }
      this.receivedInput = React.createRef();
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this)
  }
handleChange(event){
    value=event.target.value;
    label=event.target.name;
    this.setState({
      [label]:value ,
      currencydenominations:""
    })
    if(label=="receivedamount")
    {
      this.receivedInput.current.focus();
    }
    denominations={};
    quotient="";
    reminder="";
    currentamount="";
    i="";
    
  }
//****************************************Logic Start*********************************************************
handleSubmit(){
  denominations={};
  quotient="";
    reminder="";
    currentamount="";
    i="";
  amountreceived=document.getElementById("receivedamount").value;
  amountreceived=Math.floor(amountreceived)
  if(amountreceived != "")
  {
    console.log(value);
    value=Math.floor(value)
    currentamount=amountreceived-value;
    differenceamount=currentamount;
    console.log(currentamount);
    if (currentamount>0)
    {
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
      this.setState({
        currencydenominations:Object.entries(denominations).map(([key,value])=>{
              return (  <Results currency={key} number= {value.toString()}/>)
          
        })
      })
      console.log(denominations);
    }
  }
  const element=document.getElementById("receivedamount")
  element.value=28;
  // console.log(element.value={amountreceived})
}
//*****************************************Logic Finished************************************************* */
render(){
function RcvdAmountContainer(props){ 
  const amountbilled=props.amountbilled;
  if(amountbilled=="")
  {
    return(
      <div></div>
    )
  }
  else{
    return(
        <div>

              <label for="receivedamount">Enter the Received Amount:</label>
              <input className="input" id="receivedamount" type="number" name="receivedamount" 
               ref={props.receivedInput} 
               ></input>
              <button className="btn btn-primary" onClick={props.handleSubmit}>Submit</button>
              
        </div>
    )
  }
}
  return (
    <div className="App">
      <div className="container-center">
        <div className="interface">
          <h1>The Cash Counter</h1>
          <table className="input-table">
            <tr>
              <td >
                <label for="billamount">Enter the Total Bill Amount:</label>
                <input className="input" id="billamount" type="number" onChange={this.handleChange} name="billamount" value={this.state.billamount}></input>               
              </td>
              <td >
                <RcvdAmountContainer 
                amountbilled={this.state.billamount} 
                handleSubmit={this.handleSubmit}
                receivedamount={this.state.receivedamount}
                />
              </td>
            </tr>
              
                Remaining Amount={differenceamount}
    
          </table>      
          <h1>{this.state.receivedamount}</h1>
          <div className="result-container">
          {this.state.currencydenominations}
          </div>
        </div>
      </div>
    </div>
  )}
}

export default App;
