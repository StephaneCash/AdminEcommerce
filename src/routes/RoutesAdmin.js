import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "../view/Dashboard";
import Login from "../view/Login";
import Products from "../view/Products";
import AddProduct from "../components/AddProduct"
import EditProduct from '../components/EditProduct';
import AddCat from '../components/AddCat';
import Categories from "../view/Categories";
import Commandes from "../view/Commandes";

const RoutesAdmin = () => {

    //let name = localStorage.getItem("userAuth");
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/produits' element={<Products />} />
                    <Route path='/commandes' element={<Commandes />} />
                    <Route path='/categories' element={<Categories />} />

                    <Route path='/addProduct' element={<AddProduct />} />
                    <Route path='/editProduct' element={<EditProduct />} />
                    <Route path="/addCat" element={<AddCat />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RoutesAdmin;

