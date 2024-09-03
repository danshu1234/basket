import React, { useRef } from "react";
import App from "./App";
import './Basket.css'
import PayPage from "./PayPage";
import Account from "./Account";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Parent () {
    const navigate = useNavigate()
    const [resultPrice, setResultPrice] = useState(0)
    const [balance, setBalance] = useState(0)
    const [showBalance, setShowBalance] = useState(true)
    const [state, setState] = useState(0)
    const [select, setSelect] = useState('Москва')
    let user = useRef('User')
    const [showUser, setShowUser] = useState(true)
    let account;
    if (showUser == true) {
       account = <button onClick={() => {
        navigate('/account')
        setShowUser(false)
       }}>Личный кабинет</button>
    }
    let showB;
    if (showBalance == true) {
        showB = <div>
            <h3 className="balance">Ваш баланс: {balance}</h3>
            <button className="pay_balance" onClick={() => {
                setShowBalance(false)
                navigate('/pay')
            }}>Пополнить баланс</button>
        </div>
    }
    return (
        <div>
            {account}
            <h2>{user.current}</h2>
            <select onChange={(event) => {
               setSelect(event.target.value)
            }}>
                <option>Москва</option>
                <option>Челябинск</option>
            </select>
            {showB}
            <Routes>
                <Route path="/pay" element = {<PayPage resultPrice = {resultPrice} setResultPrice = {setResultPrice} balance = {balance} setBalance = {setBalance} showBalance = {showBalance} setShowBalance = {setShowBalance}/>}/>
                <Route path="/" element = {<App resultPrice = {resultPrice} setResultPrice = {setResultPrice} balance = {balance} setBalance = {setBalance} select = {select} setSelect = {setSelect}/>}/>
                <Route path="account" element = {<Account user = {user} state = {state} setState = {setState}/>}/>
            </Routes>
        </div>
    )
}
export default Parent