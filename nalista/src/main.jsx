import React from 'react'
import { createRoot } from 'react-dom/client'
import { default as Root } from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
