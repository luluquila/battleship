import { useState } from 'react'
import './App.css'
import MyRoot from './components/MyRoot';
import TargetGrid from './components/TargetGrid';
import Header from './components/Header';

function App() {

  return (
    <> 
    <MyRoot>

    <Header></Header>

    <TargetGrid></TargetGrid>


    </MyRoot>  
    </>
  )
}

export default App
