import Router from "@/router"
import { RecoilRoot } from 'recoil'

import './App.scss'

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <Router />
      </div>
    </RecoilRoot>
  )
}

export default App
