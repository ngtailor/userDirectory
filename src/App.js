
import './App.css';
import CardList from './component/CardList';
import UserDetailsPage from './component/UserDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy,Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const Userdetail = lazy(()=>import('./component/UserDetails'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback='<div>Post Loading....</div>'>
    <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/details" element={<Userdetail />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
