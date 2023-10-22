import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Questions from "../Pages/Questions";
import Result from "../Pages/Result";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/question" element={<Questions/>}/>
      <Route path="/result" element={<Result/>} />
    </Routes>
  );
}