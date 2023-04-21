import React from 'react';
import errorImg from './error.png';

const ErrorMessage = ({children}) => {
  console.log(window.console)
  return (
   <>
      <h1 style={{textAlign: 'center', marginTop: 50}}>Error!</h1>    
      <img src={errorImg} alt='error' style={{display: 'block', margin: '0 auto'}}/>
      {/* <h2>{error.status}</h2>
      <h2>{error.statusText || error.data.message}</h2> */}
      {children}
   </>
  )
}

export default ErrorMessage;