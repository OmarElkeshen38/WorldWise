import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>المدن نار</p>} />
            <Route path="cities" element={<p>المدن نار</p>} />
            <Route path="countries" element={<p>الدول نار</p>} />
            <Route path="form" element={<p>الفورم نار</p>} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
