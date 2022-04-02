import React,{useState} from 'react'
import Icon from './components/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button,Card,CardBody,Container,Col,Row} from 'reactstrap';
import "./App.css";
const itemArray = new Array(9).fill("empty");

const  App = ()  => {
  
  const [isCross,setIsCross] = useState(false)
  const [winMessage,setWinMessage] = useState("")
  const [filled,setFilled] = useState(0)

  const reload =()=>{
      setIsCross(false)
      setWinMessage("");
      setFilled(0);
      itemArray.fill("empty",0,9);
  }

  const checkWinner= ()=>{
    if(itemArray[0] !== "empty" && itemArray[0] === itemArray[1] && itemArray[0] === itemArray[2])
    {
      setWinMessage(`${itemArray[0]} won`)
    }
    else if(itemArray[3] !== "empty" && itemArray[3] === itemArray[4] && itemArray[3] === itemArray[5])
    {
      setWinMessage(`${itemArray[3]} won`)
    }
    else if(itemArray[6] !== "empty" && itemArray[6] === itemArray[7] && itemArray[6] === itemArray[8])
    {
      setWinMessage(`${itemArray[6]} won`)
    }
    else if(itemArray[0] !== "empty" && itemArray[0] === itemArray[3] && itemArray[3] === itemArray[6])
    {
      setWinMessage(`${itemArray[0]} won`)
    }
    else if(itemArray[1] !== "empty" && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7])
    {
      setWinMessage(`${itemArray[1]} won`)
    }
    else if(itemArray[2] !== "empty" && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8])
    {
      setWinMessage(`${itemArray[2]} won`)
    }
    else if(itemArray[0] !== "empty" && itemArray[0] === itemArray[4] && itemArray[4] ===itemArray[8])
    {
      setWinMessage(`${itemArray[0]} won`)
    }
    else if(itemArray[2] !== "empty" && itemArray[2] === itemArray[4] && itemArray[4] === itemArray[6])
    {
      setWinMessage(`${itemArray[2]} won`)
    }
    else if(filled === 8){
      setWinMessage(`draw`)
    }
  }

  const changeItem = itemNumber => {
    
    if(winMessage){
      if(winMessage === "draw"){
        return toast("Match Drawn",{type:"warning"})
      }else{
      return toast(winMessage,{type:"success"})
      }
    }

    if(itemArray[itemNumber] === "empty"){
      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setIsCross(!isCross)
      
    }else{
      return toast("Filled",{type:"error"})
    }
    checkWinner();
  }
  //console.log(winMessage)
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md ={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-3">
            <h1 className='text-success text-uppercase text-center'>
              {winMessage}
            </h1>
            <Button color='success' block onClick={reload}>
              Relaod Game
            </Button>
            </div>
          ):(
            <h1 className='text-center text-warning'>
              {isCross ? "Cross" : "Circle"} Turn
            </h1>
          )}
          <div className="grid">
          {itemArray.map((item, index)=>(
            <Card onClick={()=>{
              changeItem(index)
              setFilled(filled+1)
            }}>
              <CardBody className="box">  
                <Icon name = {item}/>
              </CardBody>
            </Card>
          ))}
          </div>
        </Col>
      </Row>
    </Container>
  );

}

export default App;
