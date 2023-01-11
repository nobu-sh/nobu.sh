import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import { Main } from '@/pages/Main'

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main/>}/>
    </Routes>
  </BrowserRouter>
)
