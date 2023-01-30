import { FC, useEffect, useRef, useState } from "react"
import { context } from "../../store"
import styles from '../../styles/components/CustomModal/index.module.scss'
import NextImage from 'next/image'

const CustomModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ctx = context()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState<boolean>(false)

  const closeModal = (callback?: () => void) => {
    setIsOpen(false)
    setTimeout(()=>{
      ctx.dispatch({
        isModal: undefined
      })
      if(callback) callback()
    },300)
  }
  
  const getModalImage = () => {
    if(ctx.state.isModal?.icon) return <ctx.state.isModal.icon />
    else return null
  }

  const heightModalListener = () => {
    if((modalRef.current?.offsetHeight || 0) > ctx.state.innerHeight) setIsScrollable(true)
    else setIsScrollable(false)
  }

  const isModalListener = () => {
    if(ctx.state.isModal) setIsOpen(true)
  }

  useEffect(heightModalListener, [modalRef, ctx.state.isModal])
  useEffect(isModalListener, [ctx.state.isModal])

  const closeBtnRenderer = () => {
    if(ctx.state.isModal?.closable) return (
      <svg onClick={()=>closeModal()} className={styles.wrapper_modal_inside__close_btn} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.15164 1.1515C1.37667 0.926537 1.68184 0.800158 2.00004 0.800158C2.31823 0.800158 2.6234 0.926537 2.84844 1.1515L8.00004 6.3031L13.1516 1.1515C13.2623 1.03689 13.3947 0.945471 13.5412 0.88258C13.6876 0.81969 13.845 0.786586 14.0044 0.785202C14.1637 0.783817 14.3217 0.814179 14.4692 0.874516C14.6167 0.934853 14.7506 1.02396 14.8633 1.13663C14.976 1.2493 15.0651 1.38328 15.1254 1.53076C15.1858 1.67823 15.2161 1.83625 15.2147 1.99558C15.2134 2.15492 15.1803 2.31238 15.1174 2.45879C15.0545 2.60519 14.963 2.73761 14.8484 2.8483L9.69684 7.9999L14.8484 13.1515C15.067 13.3778 15.188 13.6809 15.1852 13.9956C15.1825 14.3102 15.0563 14.6112 14.8338 14.8337C14.6113 15.0562 14.3104 15.1824 13.9957 15.1851C13.6811 15.1878 13.378 15.0669 13.1516 14.8483L8.00004 9.6967L2.84844 14.8483C2.62211 15.0669 2.31899 15.1878 2.00436 15.1851C1.68972 15.1824 1.38874 15.0562 1.16625 14.8337C0.943765 14.6112 0.817562 14.3102 0.814828 13.9956C0.812093 13.6809 0.933047 13.3778 1.15164 13.1515L6.30324 7.9999L1.15164 2.8483C0.926672 2.62327 0.800293 2.3181 0.800293 1.9999C0.800293 1.68171 0.926672 1.37654 1.15164 1.1515Z" fill="#5C6778"/>
      </svg>
    )
  }

  return (
    <div 
      className={`${styles.wrapper_modal} ${isScrollable ? styles.wrapper_modal_justify_content_default : styles.wrapper_modal_justify_content_center}`}
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        padding: ctx.state.isModal?.isFullSize ? 0 : undefined,
      }}
    >
      <div 
        ref={modalRef}
        className={styles.wrapper_modal_inside}
        style={{
          height: ctx.state.isModal?.isFullSize ? "100%" : undefined,
          width: ctx.state.isModal?.isFullSize ? "100%" : undefined,
          borderRadius: ctx.state.isModal?.isFullSize ? 0 : undefined,
        }}
      >
        {closeBtnRenderer()}
        {getModalImage()}
        {ctx.state.isModal?.imgIcon &&
          <div className={styles.wrapper_modal_inside__img}>
            <NextImage 
              src={ctx.state.isModal.imgIcon}
              alt="img_icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
        }
        {ctx.state.isModal?.title && <div className={styles.wrapper_modal__title}>{ctx.state.isModal.title}</div>}
        {ctx.state.isModal?.desc && <div className={styles.wrapper_modal__description}>{ctx.state.isModal.desc}</div>}
        {ctx.state.isModal?.customContent}
        {!ctx.state.isModal?.isWithoutTriggerBtn &&
          <div className={styles.wrapper_modal__action_btn_wrapper}>
            {ctx.state.isModal?.onCancel &&
              <button 
                onClick={() => closeModal(ctx.state.isModal?.onCancel)} 
                className={styles.wrapper_modal__cancel_btn} 
                type="button"
              >
                {ctx.state.isModal.cancelLabel || "Cancel"}
              </button>
            }
            <button 
              onClick={() => closeModal(ctx.state.isModal?.onOk)} 
              className={styles.wrapper_modal__ok_btn} 
              type="button"
              disabled={ctx.state.isModal?.disableOkLabel}
              style={{
                opacity: ctx.state.isModal?.disableOkLabel ? 0.7 : 1
              }}
            >
              {ctx.state.isModal?.okLabel || "OK"}
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default CustomModal