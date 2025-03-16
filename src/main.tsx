import { StrictMode } from 'react'
import { Provider } from './components/ui/provider'
import { createRoot } from 'react-dom/client'
import NewRecording from './NewRec/App.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './landing-page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <Provider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/NewRec" element={<NewRecording />} />
      </Routes>
    </Provider>
    </Router>
  </StrictMode>,
)
