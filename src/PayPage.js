import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btnhome from "./Btnhome";
import './Basket.css'
function PayPage (props) {
    const payNavigate = useNavigate()
    const [succesPay, setSuccesPay] = useState(null)
    const [num, setNum] = useState(null)
    const [card, setCard] = useState(null)
    const [updateBalance, setUpdateBalance] = useState(0)
    let check;
    if (succesPay == 'Пожалуйста, проверьте введенные данные'){
        check = <h3 className="succes-pay">Пожалуйста, проверьте введенные данные</h3>
    } else if (succesPay == 'Пожалуйста, проверьте сумму'){
        check = <h3 className="check-summ">Пожалуйста, проверьте сумму</h3>
    } else if (succesPay == 'Пожалуйста, введите данные карты'){
        check = <h3 className="check-card">Пожалуйста, введите данные карты</h3>
    }
    let loading;
    if (succesPay == 'Подождите, идет пополнение...'){
        loading = <div className="contain">
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="fourty"></div>
        </div>
    }
    useEffect(() => {
        localStorage.setItem('card', num)
    }, [num])
    let backToHomePage;
    if (succesPay == 'Пополнение прошло успешно!') {
        backToHomePage = <button onClick={() => {
        payNavigate('/')
        props.setShowBalance(true)
        setUpdateBalance(0)
        }} className="back-to-shopping">Вернуться к покупкам</button>
    }
    return (
        <div className="pay">
            <input placeholder="Введите номер карты" onChange={(event) => {
            let arr = event.target.value.split('')
            let newArr = arr.slice(0, 2)
            let result = newArr.join('')
            if (result == '22') {
                setCard('Мир')
            } else if (result == '40') {
                setCard('Visa')
            } else if (result == '54') {
                setCard('Mastercard')
            } else if (result == '') {
                setCard(null)
            }
            setNum(event.target.value)
            }} className="card-input"/><span className="card-visible">{card}</span><br/>
            <input placeholder="Введите сумму" onChange={(event) => {
                 const amount = +event.target.value
                setUpdateBalance(amount)
            }} className="summ-input"/><br/>
            <button onClick={() => {
             setSuccesPay('Подождите, идет пополнение...')
             setTimeout(() => {
                if (num !== null & num !== '') {
                    let superArr = num.split('')
                    if (superArr.length === 16 && updateBalance !== 0) {    
                        setSuccesPay('Пополнение прошло успешно!')
                        props.setBalance(props.balance + updateBalance)
                        props.setResultPrice(0)
                   } else if (updateBalance == 0) {
                       setSuccesPay('Пожалуйста, проверьте сумму')
                   }
                    else {
                       setSuccesPay('Пожалуйста, проверьте введенные данные')
                   }
                } else {
                    setSuccesPay('Пожалуйста, введите данные карты')
                }     
        }, 3500)    
            }} className="card-btn">Пополнить</button>
            {loading}
            <Btnhome onClick={() => {
                payNavigate('/')
                props.showRegion(true)
                props.setShowBalance(true)
            }}>На домашнюю</Btnhome>
            {check}
            {backToHomePage}
        </div>
    )
}
export default PayPage