import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Basket.css'
function Account (props) {
    const navigate = useNavigate()
let entrance;
const [warning, setWarning] = useState(null)
const [input, setInput] = useState(null)
const [showEntrence, setShowEntrance] = useState(true)
if (showEntrence == true) {
    entrance = 'Введите свое имя, чтобы мы могли к вам обращаться!'
}
return (
    <div className="user-container">
        <h1 className="name">Ваше имя: <span className="name-user">{props.user}</span></h1>
        <h2 className="enter-name">{entrance}</h2>
        <input placeholder="Ваше имя" onChange={(event) => {
            setInput(event.target.value)
        }} className="name-input"/>
        <button onClick={() => {
            if (input !== null && input !== '') {
                props.setUser(input)
                setWarning(null)
                setShowEntrance(false)
            } else {
                 setWarning('Введите свое имя')
            }
        }} className="save-name">Сохранить</button><br/>
        <button onClick={() => {
            navigate('/')
            props.showRegion(true)
            props.setShowUser(true)
            props.setShowBalance(true)
        }} className="to-home-name">На домашнюю</button>
        <h5>{warning}</h5>
    </div>
)
}
export default Account