import React from 'react'
import Card from './Card'
import { Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

const Slider = ({cards, deleteCard}) => {
  const [selected, setSelected] = React.useState(0)
  React.useEffect(()=>{
    setSelected(0)
  },[cards])
  return (
    <>
      {
        cards.length ?(
          <div className="slider">
            <div className="slider-content">
              {
                cards?.map((card, index) => (
                  <Card 
                    deleteCard={deleteCard}
                    selected={selected}
                    index={index}
                    key={card._id} 
                    card={card} 
                  />
                ))
              }
            </div>
            <div className="slider-nav">
              <Button onClick={() => setSelected(s => s-1)} disabled={selected === 0} type="primary" shape="circle">
                <CaretLeftOutlined />
              </Button>
              <span>{selected+1} / {cards.length}</span>
              <Button onClick={() => setSelected(s => s+1)} disabled={selected === cards.length-1} type="primary" shape="circle">
                <CaretRightOutlined />
              </Button>
            </div>
          </div>
        )
        :(
          <span className='not-selected'>Cards not found</span>
        )
      }
    </>
  )
}

export default Slider
