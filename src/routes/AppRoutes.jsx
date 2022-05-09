import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from '../components/js/Footer'
import { Navigation } from '../components/js/Navigation'
import OrderBy from '../components/js/OrderBy'
import { Carrito } from '../pages/js/Carrito'
import { FormDeConfirmacionDePedido } from '../pages/js/FormDeConfirmacionDePedido'
import { HomePage } from '../pages/js/HomePage'
import { OneCategory } from '../pages/js/OneCategory'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/category/:cat' element={<OneCategory />} />
                <Route exact path='/productos/:order' element={<OrderBy />} />
                <Route exact path='/carrito' element={<Carrito />} />
                <Route exact path='/confirmacionPedido' element={<FormDeConfirmacionDePedido />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}
