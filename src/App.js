import React from 'react'
import { Router } from "@reach/router"
import Navbar from "./components/Navbar"
import Herodata from './components/HeroData'
import FeatureData from './components/FeatureData'
import CardData from './components/CardData'
import ContactData from './components/ContactData'
import Main from './components/Main'
const App = () => {
    return (
        <div>
             <Router>
                <Main path="/main"/>    
             </Router>
          <Navbar/>
            <Router>
                <Herodata path="/" />
                <FeatureData path="/featuredata" />
                <CardData path="/carddata" />
                <ContactData path="/contactdata" />
            </Router>
        </div>
    )
}

export default App