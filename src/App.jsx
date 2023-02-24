import React from 'react';
import './App.css';
import smallImg from './assets/5kb.png';
import bigImg from './assets/22kb.png';
import './fonts/font.css';


function App() {
    return <div className='main-container'>
          <h2>hello webpack123</h2>
          <h3 className='no-thin'>这是No-Thin字体</h3>
          <h3 className='no-bold'>这是No-Bold字体</h3>
          <h3 className='no-black'>这是No-Black字体</h3>
          <img src={smallImg} alt="小于10kb的图片" />           
          <img src={bigImg} alt="大于10kb的图片" />
        </div>

}

export default App;