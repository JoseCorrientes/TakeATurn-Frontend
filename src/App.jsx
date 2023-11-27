import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Header from './components/Header/Header';
import ShowMonth from './components/ShowMonth/ShowMonth';

function App() {

  return (
    <BrowserRouter>
        <div
            className='w-auto h-screen sm:h-screen '
        >
            <Header/>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/month'element={<ShowMonth/>}/>

            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
