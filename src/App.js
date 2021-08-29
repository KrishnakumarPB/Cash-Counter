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
handleSubmit(e){
  
  e.preventDefault();
  // document.getElementById("backdrop").style.display = "block";
  document.getElementById("myModal").style.display = "block";
  document.getElementById("myModal").classList.add("show")
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
        <tr>
              <td>
              <label for="receivedamount">Enter the Received Amount:</label>
              </td>
              <td>
              <input className="form-control" id="receivedamount" type="number" name="receivedamount" 
               ref={props.receivedInput} required
               ></input>
              </td>
              
              
        </tr>
    )
  }
}
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center ">
      <div className="row ">
      <form onSubmit={this.handleSubmit} className="form-group inputs p-3 ">
        <h3>Inputs</h3>
        <table className="table  table-striped"> 
          <thead>
              <tr>
                <td>
                <label for="billamount">Enter the Total Bill Amount</label>
                </td>
                <td align="left">
                <input className="form-control" id="billamount" type="number" onChange={this.handleChange} name="billamount" value={this.state.billamount} required></input>
                </td>
              </tr>
                <RcvdAmountContainer 
                  amountbilled={this.state.billamount} 
                  handleSubmit={this.handleSubmit}
                  receivedamount={this.state.receivedamount}
                  />
                  <tr>
                  <button className="btn btn-primary ml-3" >Submit</button>
                  </tr>
          </thead>
        </table>
      </form>
      <div className="results  p-3">
        <h3>Denominations</h3>
        <table className="table table-striped">
          <tbody>
          {this.state.currencydenominations}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      
      
    
      </div>
   
  )}
    };
export default App