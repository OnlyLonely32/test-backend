import React from 'react'
import clsx from 'clsx'
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal } from 'antd';
const { confirm } = Modal;

const Card = ({card, selected, index, deleteCard}) => {
  const [flip, setFlit] = React.useState(false)
  const deleteAction = () => {
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: "you are shoor wont to delete?",
        onOk() {
          deleteCard(card._id)
        },
      });
  }
  return (
    <div 
      className={
        clsx(
          'scene',
          (selected < index) && 'next-card',
          (selected > index) && 'prev-card',
        )
      }
    >
      <div 
        onClick={deleteAction}
        className="cross"
      >
        <CloseOutlined />
      </div>
      <div className={
          clsx(
            "card",
            flip && "is-flipped"
          )
        }
        onClick={() => setFlit(s => !s)}
      >
        <div className="card__face card__face--front">{card.word}</div>
        <div className="card__face card__face--back">{card.translate}</div>
      </div>
    </div>
  )
}

export default Card
