
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FC } from 'react'

import Landing from '@/views/Landing'
import Navbar from '@/components/Navbar'

export interface RouteItem {
  path: string
  Component: FC
}

export const RouteItems: RouteItem[] = [
  {
    path: '*',
    Component: Landing,
  }
]

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {RouteItems.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              <>
                <Navbar />
                <route.Component />
              </>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
