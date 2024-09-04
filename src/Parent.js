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
    const [showRegion, setShowRegion] = useState(true)
    let reg;
    if (showRegion == true) {
    reg = <div>
<select onChange={(event) => {
               setSelect(event.target.value)
            }} className="select-region">
                <option>Москва</option>
                <option>Челябинск</option>
            </select>
    </div>
    }
    const [user, setUser] = useState('Гость')
    const [showUser, setShowUser] = useState(true)
    let account;
    if (showUser == true) {
       account = <h3 onClick={() => {
        navigate('/account')
        setShowUser(false)
        setShowRegion(false)
        setShowBalance(false)
       }} className="account">Личный кабинет</h3>
    }
    let showB;
    if (showBalance == true) {
        showB = <div>
            <h3 className="balance">Ваш баланс: {balance}</h3>
            <button className="pay_balance" onClick={() => {
                setShowBalance(false)
                navigate('/pay')
                setShowRegion(false)
            }}>Пополнить баланс</button>
        </div>
    }
    return (
        <div className="parent-contain">
            <header className="header">
            {account}
            <h2 className="market">MiniMarket</h2>
            <h2 className="user-parent">{user}</h2>
            </header>
            {reg}
            {showB}
            <Routes>
                <Route path="/pay" element = {<PayPage resultPrice = {resultPrice} setResultPrice = {setResultPrice} balance = {balance} setBalance = {setBalance} showBalance = {showBalance} setShowBalance = {setShowBalance} showRegion = {setShowRegion}/>}/>
                <Route path="/" element = {<App resultPrice = {resultPrice} setResultPrice = {setResultPrice} balance = {balance} setBalance = {setBalance} select = {select} setSelect = {setSelect} showRegion = {setShowRegion}/>}/>
                <Route path="account" element = {<Account user = {user} setUser = {setUser} setShowUser = {setShowUser} state = {state} setState = {setState} showRegion = {setShowRegion} showBalance = {showBalance} setShowBalance = {setShowBalance}/>}/>
            </Routes>
        </div>
    )
}
export default Parent