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
import React, { useEffect, useReducer, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import './Basket.css'
function App (props) {
  let payPage;
  const navigate = useNavigate()
  const reducer = (state, action) => {
    if (action.type == 'plus') {
      return {name: state.name, price: state.price + state.staticPrise, quantity: state.quantity + 1, staticPrise: state.staticPrise}
    } else if (action.type == 'minus') {
      return {name: state.name, price: state.price - state.staticPrise, quantity: state.quantity - 1, staticPrise: state.staticPrise}
    }
  };
  const [resOne, setResOne] = useState(null)
  const [resTwo, setResTwo] = useState(null)
  const [resThree, setResThree] = useState(null)
  const [resFour, setResFour] = useState(null)
  const milk = {name: 'Молоко', price: 60, quantity: 1, staticPrise: 60}; 
  const meat = {name: 'Мясо', price: 300, quantity: 1, staticPrise: 300}; 
  const watermelon = {name: 'Арбуз', price: 250, quantity: 1, staticPrise: 250}; 
  const juice = {name: 'Сок', price: 80, quantity: 1, staticPrise: 80}; 
  const [stateOne, dispatchOne] = useReducer(reducer, milk); 
  const [stateTwo, dispatchTwo] = useReducer(reducer, meat); 
  const [stateThree, dispatchThree] = useReducer(reducer, watermelon); 
  const [stateFour, dispatchFour] = useReducer(reducer, juice); 
  const [pay, setPay] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [payment, setPayment] = useState(null)
  const [basket, setBasket] = useState('Здесь пока пусто')
  let delOne;
  let res;
  if (resOne !== null) {
    delOne = <button onClick={() => {
      setResOne(null)
      props.setResultPrice(props.resultPrice - stateOne.price)
    }
    } className="delete-btn">Удалить товар</button>
  }
  let delTwo;
  if (resTwo !== null) {
    delTwo = <button onClick={() => {
      setResTwo(null)
      props.setResultPrice(props.resultPrice - stateTwo.price)
    }} className="delete-btn">Удалить товар</button>
  }
  let delThree;
  if (resThree !== null) {
    delThree = <button onClick={() => {
      setResThree(null)
      props.setResultPrice(props.resultPrice - stateThree.price)
    }} className="delete-btn">Удалить товар</button>
  }
  let delFour;
  if (resFour !== null) {
    delFour = <button onClick={() => {
      setResFour(null)
      props.setResultPrice(props.resultPrice - stateFour.price)
    }} className="delete-btn">Удалить товар</button>
  }
  let baskett;
  if (props.select == 'Москва') {
    baskett = <div className="basket">
    <h2 className="basket-head">Корзина </h2>
    <h3 className="basket-none">{basket}</h3>
    <div className="basket-list">
    <h3 className="product-in-basket">{resOne}</h3>
    {delOne}
    <h3 className="product-in-basket">{resTwo}</h3>
    {delTwo}
    <h3 className="product-in-basket">{resThree}</h3>
    {delThree}
    <h3 className="product-in-basket">{resFour}</h3>
    {delFour}
    </div>
    {res}
    </div>
  } else if (props.select == 'Челябинск') {
    baskett = <div className="basket-for-Chelyabinsk">
    <h2 className="basket-head">Корзина </h2>
    <h3 className="basket-none">{basket}</h3>
    <div className="basket-list">
    <h3 className="product-in-basket">{resOne}</h3>
    {delOne}
    <h3 className="product-in-basket">{resTwo}</h3>
    {delTwo}
    <h3 className="product-in-basket">{resThree}</h3>
    {delThree}
    <h3 className="product-in-basket">{resFour}</h3>
    {delFour}
    </div>
    </div>
  }
  if (showResult == true) {
    res = <div className="result-price-contain">
    <h2><span className="result_price_span">Итого:</span> <h3 className="result_price">{props.resultPrice}</h3></h2>
    <button onClick={() => {
     setPayment('Подождите, идет оплата...')
     setTimeout(() => {
      if (props.balance >= props.resultPrice && props.balance !== 0) {
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
    }} className="pay_btn">Оплатить</button>
    <h3 className="payment">{payment}</h3>
    </div>
  }

  if (pay == true) {
    payPage = <button onClick={() => {
    navigate('pay')
    }}>Перейти к оплате</button>
  }
  
  
  let products;
  if (props.select == 'Москва') {
 products = <div>
  <ul className="products-cards"> 
        <li className="product-card"><h3 className="product">{stateOne.name}</h3> цена: {stateOne.price}, количество: {stateOne.quantity}</li>
        <button onClick={() => dispatchOne({type: 'plus'})} className="plus-product">+</button>
        <button onClick={() => {
          if (stateOne.quantity > 1) {
            dispatchOne({type: 'minus'})
          }
        }} className="minus-product">-</button>
        <button onClick={() => {setResOne(`${stateOne.name}, ${stateOne.quantity}`)
      props.setResultPrice(props.resultPrice + stateOne.price)
      setPay(true)
      setShowResult(true)
      setBasket(null)
      }} className="add-product">Добавить в корзину</button>
        <li className="product-card"><h3 className="product">{stateTwo.name}</h3> цена: {stateTwo.price}, количество: {stateTwo.quantity}</li>
        <button onClick={() => dispatchTwo({type: 'plus'})} className="plus-product">+</button>
        <button onClick={() => {
          if (stateTwo.quantity > 1) {
            dispatchTwo({type: 'minus'})
          }
        }} className="minus-product">-</button> 
        <button onClick={() => {setResTwo(`${stateTwo.name}, ${stateTwo.quantity}`)
      props.setResultPrice(props.resultPrice + stateTwo.price)
      setPay(true)
      setShowResult(true)
      setBasket(null)
      }} className="add-product">Добавить в корзину</button>
        <li className="product-card"><h3 className="product">{stateThree.name}</h3> цена: {stateThree.price}, количество: {stateThree.quantity}</li>
        <button onClick={() => dispatchThree({type: 'plus'})} className="plus-product">+</button>
        <button onClick={() => {
          if (stateThree.quantity > 1) {
            dispatchThree({type: 'minus'})
          }
        }} className="minus-product">-</button> 
        <button onClick={() => {setResThree(`${stateThree.name}, ${stateThree.quantity}`)
      props.setResultPrice(props.resultPrice + stateThree.price)
      setPay(true)
      setShowResult(true)
      setBasket(null)
      }} className="add-product">Добавить в корзину</button>
        <li className="product-card"><h3 className="product">{stateFour.name}</h3> цена: {stateFour.price}, количество: {stateFour.quantity}</li>
        <button onClick={() => dispatchFour({type: 'plus'})} className="plus-product">+</button>
        <button onClick={() => {
          if (stateFour.quantity > 1) {
            dispatchFour({type: 'minus'})
          }
        }} className="minus-product">-</button>  
        <button onClick={() => {setResFour(`${stateFour.name}, ${stateFour.quantity}`)
      props.setResultPrice(props.resultPrice + stateFour.price)
      setPay(true)
      setShowResult(true)
      setBasket(null)
      }} className="add-product">Добавить в корзину</button>
      </ul>
 </div>
  } else if (props.select == 'Челябинск') {
    products = <div>
    <ul className="products-cards"> 
          <li className="product-card"><h3 className="product">{stateOne.name}</h3> цена: {stateOne.price}, количество: {stateOne.quantity}</li>
          <button onClick={() => dispatchOne({type: 'plus'})} className="plus-product">+</button>
          <button onClick={() => {
            if (stateOne.quantity > 1) {
              dispatchOne({type: 'minus'})
            }
          }} className="minus-product">-</button> 
          <button onClick={() => {setResOne(`${stateOne.name}, ${stateOne.quantity}`)
        props.setResultPrice(props.resultPrice + stateOne.price)
        setPay(true)
        setShowResult(true)
        setBasket(null)
        }} className="add-product">Добавить в корзину</button>
          <li className="product-card"><h3 className="product">{stateTwo.name}</h3> цена: {stateTwo.price}, количество: {stateTwo.quantity}</li>
          <button onClick={() => dispatchTwo({type: 'plus'})} className="plus-product">+</button>
          <button onClick={() => {
            if (stateTwo.quantity > 1) {
              dispatchTwo({type: 'minus'})
            }
          }} className="minus-product">-</button> 
          <button onClick={() => {setResTwo(`${stateTwo.name}, ${stateTwo.quantity}`)
        props.setResultPrice(props.resultPrice + stateTwo.price)
        setPay(true)
        setShowResult(true)
        setBasket(null)
        }} className="add-product">Добавить в корзину</button>
          <li className="product-card"><h3 className="product-no">{stateThree.name}</h3></li><h4 className="no-assortiment-product">Товара нет в наличии</h4>
          <li className="product-card"><h3 className="product">{stateFour.name}</h3> цена: {stateFour.price}, количество: {stateFour.quantity}</li>
          <button onClick={() => dispatchFour({type: 'plus'})} className="plus-product">+</button>
          <button onClick={() => {
            if (stateFour.quantity > 1) {
              dispatchFour({type: 'minus'})
            }
          }} className="minus-product">-</button>  
          <button onClick={() => {setResFour(`${stateFour.name}, ${stateFour.quantity}`)
        props.setResultPrice(props.resultPrice + stateFour.price)
        setPay(true)
        setShowResult(true)
        setBasket(null)
        }} className="add-product">Добавить в корзину</button>
        </ul>
   </div>
  }
  useEffect(() => {
   if (resOne == null && resTwo == null && resThree == null && resFour == null && payment == null) {
    setShowResult(false)
    setBasket('Здесь пока пусто')
   }
  }, [resOne, resTwo, resThree, resFour, payment])
  return ( 
    <div className="app"> 
      <h2 className="product_list">Список товаров</h2> 
 {products}
 {baskett}
 {res}
    </div> 
  ); 
} 

export default App;
