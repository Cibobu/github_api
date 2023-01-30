import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreContextWrapper } from '../store'
import { useReducer } from 'react'
import reducer from '../store/reducer'
import { globalState } from '../store/state'
import CustomModal from '../components/CustomModal'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, globalState)
  
  return (
    <StoreContextWrapper.Provider value={{state, dispatch}}>
      <Component {...pageProps} />
      <CustomModal />
    </StoreContextWrapper.Provider>
  )
}
export default MyApp
