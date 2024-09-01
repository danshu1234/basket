// import React, { useRef, useState } from "react";
// function App () {
// let users = [
// {name: 'Danya', age: 17},
// {name: 'Darya', age: 16},
// {name: 'Vanya', age: 19},
// {name: 'Alice', age: 15},
// ]
// const [state, setState] = useState(null)
// const ref = useRef(null)
//   return (
//     <div>
// <h2>Список пользователей: </h2>
// <ul>
//   {users.map((item, index) => {
//     return <li key={index}>Имя: {item.name}, возраст: {item.age}</li>
//   })}
// </ul>
// <input placeholder="Найдите пользователя" onChange={(event) => {
// const user = users.find((item) => {
//   return item.name == event.target.value
// })
// if (user !== undefined) {
//   ref.current = `Имя: ${user.name}, возраст: ${user.age}`
// } else {
//   ref.current = 'Ничего не найдено!'
// }

// }}/><br/>
// <button onClick={() => {
//   setState(state + 1)
// }}>Поиск</button>
// <h2>{ref.current}</h2>
//     </div>
//   )
// }
// export default App
import React, { useReducer, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import './Basket.css'
function App (props) {
  const navigate = useNavigate()

  const [resOne, setResOne] = useState(null)
  const [resTwo, setResTwo] = useState(null)
  const [resThree, setResThree] = useState(null)
  const [resFour, setResFour] = useState(null)
  let payPage;
  const [pay, setPay] = useState(false)
  const reducer = (state, action) => {
    if (action.type == 'plus') {
      return {name: state.name, price: state.price + state.staticPrise, quantity: state.quantity + 1, staticPrise: state.staticPrise}
    } else if (action.type == 'minus') {
      return {name: state.name, price: state.price - state.staticPrise, quantity: state.quantity - 1, staticPrise: state.staticPrise}
    }
  };

  const milk = {name: 'Молоко', price: 60, quantity: 1, staticPrise: 60}; 
  const meat = {name: 'Мясо', price: 300, quantity: 1, staticPrise: 300}; 
  const watermelon = {name: 'Арбуз', price: 250, quantity: 1, staticPrise: 250}; 
  const juice = {name: 'Сок', price: 80, quantity: 1, staticPrise: 80}; 

  const [stateOne, dispatchOne] = useReducer(reducer, milk); 
  const [stateTwo, dispatchTwo] = useReducer(reducer, meat); 
  const [stateThree, dispatchThree] = useReducer(reducer, watermelon); 
  const [stateFour, dispatchFour] = useReducer(reducer, juice); 
  const [payment, setPayment] = useState(null)
  if (pay == true) {
    payPage = <button onClick={() => {
    navigate('pay')
    }}>Перейти к оплате</button>
  }
  
  return ( 
    <div className="app"> 
      <h2>Список товаров:</h2> 
      <ul> 
        <li>Товар: {stateOne.name}, цена: {stateOne.price}, количество: {stateOne.quantity}</li>
        <button onClick={() => dispatchOne({type: 'plus'})}>+</button>
        <button onClick={() => {
          if (stateOne.quantity > 1) {
            dispatchOne({type: 'minus'})
          }
        }}>-</button> 
        <button onClick={() => {setResOne(`Товар: ${stateOne.name}, количество ${stateOne.quantity}`)
      props.setResultPrice(props.resultPrice + stateOne.price)
      setPay(true)
      }}>Добавить в корзину</button>
        <li>Товар: {stateTwo.name}, цена: {stateTwo.price}, количество: {stateTwo.quantity}</li>
        <button onClick={() => dispatchTwo({type: 'plus'})}>+</button>
        <button onClick={() => {
          if (stateTwo.quantity > 1) {
            dispatchTwo({type: 'minus'})
          }
        }}>-</button> 
        <button onClick={() => {setResTwo(`Товар: ${stateTwo.name}, количество ${stateTwo.quantity}`)
      props.setResultPrice(props.resultPrice + stateTwo.price)
      setPay(true)
      }}>Добавить в корзину</button>
        <li>Товар: {stateThree.name}, цена: {stateThree.price}, количество: {stateThree.quantity}</li>
        <button onClick={() => dispatchThree({type: 'plus'})}>+</button>
        <button onClick={() => {
          if (stateThree.quantity > 1) {
            dispatchThree({type: 'minus'})
          }
        }}>-</button> 
        <button onClick={() => {setResThree(`Товар: ${stateThree.name}, количество ${stateThree.quantity}`)
      props.setResultPrice(props.resultPrice + stateThree.price)
      setPay(true)
      }}>Добавить в корзину</button>
        <li>Товар: {stateFour.name}, цена: {stateFour.price}, количество: {stateFour.quantity}</li>
        <button onClick={() => dispatchFour({type: 'plus'})}>+</button>
        <button onClick={() => {
          if (stateFour.quantity > 1) {
            dispatchFour({type: 'minus'})
          }
        }}>-</button>  
        <button onClick={() => {setResFour(`Товар: ${stateFour.name}, количество ${stateFour.quantity}`)
      props.setResultPrice(props.resultPrice + stateFour.price)
      setPay(true)
      }}>Добавить в корзину</button>
      </ul> 
      <h2>Корзина: </h2>
      <h3>{resOne}</h3>
      <h3>{resTwo}</h3>
      <h3>{resThree}</h3>
      <h3>{resFour}</h3>
      <h2>Итого: {props.resultPrice}</h2>
      <button onClick={() => {
       setPayment('Подождите, идет оплата...')
       setTimeout(() => {
        if (props.balance >= props.resultPrice) {
          props.setBalance(props.balance - props.resultPrice)
          setPayment('Оплата прошла успешно!')
          props.setResultPrice(0)
          setResOne(null)
          setResTwo(null)
          setResThree(null)
          setResFour(null)
          setTimeout(() => {
            setPayment(null)
         }, 2000);
         } else {
           setPayment('На вашем балансе недостаточно средств')
           props.setResultPrice(0)
          setResOne(null)
          setResTwo(null)
          setResThree(null)
          setResFour(null)
          setTimeout(() => {
            setPayment(null)
         }, 2000);
         }
       }, 2000)
      }}>Оплатить</button>
      <h3>{payment}</h3>
    </div> 
  ); 
} 

export default App;
