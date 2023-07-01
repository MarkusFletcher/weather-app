import React, { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import s from './Modal.module.scss'
import { TfiClose } from 'react-icons/tfi'

interface Props extends PropsWithChildren {
  isOpen: boolean
  close: () => void
}

export const Modal: React.FC<Props> = ({ children, isOpen, close }) => {
  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div className={s.modal}>
          <div className={s.head}>
            <button className={s.close} onClick={close}>
              <TfiClose fontSize={24}></TfiClose>
            </button>
          </div>
          {children}
        </div>
      )}
    </>,
    document.getElementById('root-modal') as HTMLElement,
  )
}
