import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function PayPage (props) {
    const payNavigate = useNavigate()
    const [succesPay, setSuccesPay] = useState(null)
    const [num, setNum] = useState(null)
    const [card, setCard] = useState(null)
    const [updateBalance, setUpdateBalance] = useState(0)
    useEffect(() => {
        localStorage.setItem('card', num)
    }, [num])
    let backToHomePage;
    if (succesPay == 'Пополнение прошло успешно!') {
        backToHomePage = <button onClick={() => {
        payNavigate('/')
        props.setShowBalance(true)
        setUpdateBalance(0)
        }}>Вернуться к покупкам</button>
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
            } else if (result == '56'){
                setCard('Mastercard')
            }
            setNum(event.target.value)
            }}/><span>{card}</span><br/>
            <input placeholder="Введите сумму" onChange={(event) => {
                 const amount = +event.target.value
                setUpdateBalance(amount)
            }}/><br/>
            <button onClick={() => {
             setSuccesPay('Подождите, идет пополнение...')
             setTimeout(() => {
                if (num !== '') {
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
        }, 2000)    
            }}>Пополнить</button>
            <h4>{succesPay}</h4>
            {backToHomePage}
        </div>
    )
}
export default PayPage