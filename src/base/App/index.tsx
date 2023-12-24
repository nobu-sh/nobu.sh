import Router from "@/router"
import { RecoilRoot } from 'recoil'

import './App.scss'

const App = () => {
  return (
    <RecoilRoot>
      <div className="App" id="silly-inject-point">
        <Router />
      </div>
    </RecoilRoot>
  )
}

export default App
