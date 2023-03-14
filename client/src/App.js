import { Routes, Route } from "react-router-dom"

import Header from "./components/Header";
import Home from "./components/Home";
import Invoices from "./components/Invoices";
import Success from "./components/Success";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/invoices" element={<Invoices />}></Route>
        <Route exact path="/success" element={<Success />}></Route>
      </Routes>
    </>
  );
}

export default App;
