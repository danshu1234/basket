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
    <div>
        <h2>Ваше имя: {props.user}</h2>
        <h4>{entrance}</h4>
        <input placeholder="Ваше имя" onChange={(event) => {
            setInput(event.target.value)
        }}/>
        <button onClick={() => {
            if (input !== null && input !== '') {
                props.setUser(input)
                setWarning(null)
                setShowEntrance(false)
            } else {
                 setWarning('Введите свое имя')
            }
        }}>Сохранить</button><br/>
        <button onClick={() => {
            navigate('/')
            props.showRegion(true)
            props.setShowUser(true)
            props.setShowBalance(true)
        }}>На домашнюю</button>
        <h5>{warning}</h5>
    </div>
)
}
export default Account