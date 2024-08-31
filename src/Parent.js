import React from "react";
import App from "./App";
import './Basket.css'
import PayPage from "./PayPage";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Parent () {
    const balanceNavigate = useNavigate()
    const [resultPrice, setResultPrice] = useState(0)
    const [balance, setBalance] = useState(0)
    const [showBalance, setShowBalance] = useState(true)
    let showB;
    if (showBalance == true) {
        showB = <div>
            <h3 className="balance">Ваш баланс: {balance}</h3>
            <button className="pay_balance" onClick={() => {
                setShowBalance(false)
                balanceNavigate('/pay')
            }}>Пополнить баланс</button>
        </div>
    }
    return (
        <div>
            {showB}
            <Routes>
                <Route path="/pay" element = {<PayPage resultPrice = {resultPrice} setResultPrice = {setResultPrice} balance = {balance} setBalance = {setBalance} showBalance = {showBalance} setShowBalance = {setShowBalance}/>}/>
                <Route path="/" element = {<App resultPrice = {resultPrice} setResultPrice = {setResultPrice}/>} balance = {balance} setBalance = {setBalance}/>
            </Routes>
        </div>
    )
}
export default Parent