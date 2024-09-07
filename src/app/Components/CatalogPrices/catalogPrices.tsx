import { useState } from 'react'
import Card from '../Card/card'
import './CatalogPrices.css'


export default function CatalogPrices(){

    const [card, setCard] = useState([])

    const addCard = () => {

        setCard([...card, card.length + 1]);

    }

    return (

        <div className="CatalogPricesContainer"> 
            <div className="CatalogEditCards">
                {card.map((card, index) => (
                    <Card key={index} />
                ))}
            </div>
           <button className="BtnAddCar" onClick={addCard}>Adicionar Carro</button>
        </div>
          
    )

}