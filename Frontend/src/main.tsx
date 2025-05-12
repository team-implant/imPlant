import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <App />
  </>
)