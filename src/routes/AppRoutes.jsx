import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from '../components/js/Footer'
import { Navigation } from '../components/js/Navigation'
import { AdminsPage } from '../pages/js/AdminsPage'
import { Carrito } from '../pages/js/Carrito'
import { EdicionDeProducto } from '../pages/js/EdicionDeProducto'
import { EditarCategorys } from '../pages/js/EditarCategorys'
import { FormDeConfirmacionDePedido } from '../pages/js/FormDeConfirmacionDePedido'
import { HomePage } from '../pages/js/HomePage'
import { NewProduct } from '../pages/js/NewProduct'
import { OneCategory } from '../pages/js/OneCategory'
import { ProductosUsuarios } from '../pages/js/ProductosUsuarios'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/admins' element={<AdminsPage />} />
                <Route exact path='/editar-producto/:id' element={<EdicionDeProducto />} />
                <Route exact path='/category/:cat' element={<OneCategory />} />
                <Route exact path='/editar-categorys' element={<EditarCategorys />} />
                <Route exact path='/productos' element={<ProductosUsuarios />} />
                <Route exact path='/carrito' element={<Carrito />} />
                <Route exact path='/confirmacionPedido' element={<FormDeConfirmacionDePedido />} />
                <Route exact path='/nuevo-producto' element={<NewProduct />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}
