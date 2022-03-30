import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import styles from '../css/NewProduct.module.css'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import ProductoAgregado from "../../components/js/ProductoAgregado";
const URIs = require('../../URIs')

export const NewProduct = () => {

    useEffect(() => {
        document.title = `Administración de productos`;
    });

    // HEROKU
    // const URIAgregarProd = 'https://alm-nat-kiara-v1-back.herokuapp.com/admins/productos'


    // LOCAL
    const URIAgregarProd = URIs.productosAdmins

    // Fetch de las categorías
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
        })()
    }, [])

    const animarComponentes = makeAnimated()

    let [inputCategory, setInputCategory] = useState()
    const handleCategoryChange = (e) => {
        let valoresSeleccionados = JSON.stringify(e)
        setInputCategory(valoresSeleccionados)
    }

    const [productoAgregado, setProductoAgregado] = useState(false)

    const avisoDeProductoAgregado = () => {
        setProductoAgregado(false)
    }
    useEffect(() => {
        if (productoAgregado === true) {
            setTimeout(() => {
                setProductoAgregado(false)
            }, 4000);
        }
    }, [productoAgregado])

    return (
        <div className={styles.containerNewProduct}>
            <ProductoAgregado
                avisoDeProductoAgreagado={avisoDeProductoAgregado}
                oculto={productoAgregado === false
                    ? false
                    : true
                }
            />
            <div className={styles.containerVolverAtras}>
                <Link to='/admins'>
                    ⮪ Volver al listado de productos
                </Link>
            </div>
            <h2 style={{ textAlign: 'center' }}>Formulario de nuevo producto</h2>
            <div className="containerForm">
                <Formik
                    initialValues={{ name: '', description: '', quantity: '', price: '', image: '', unity: '', categorys: inputCategory }}
                    onSubmit={async (values, { resetForm }) => {
                        let data = new FormData()
                        data.append('name', values.name)
                        data.append('description', values.description)
                        data.append('quantity', values.quantity)
                        data.append('price', values.price)
                        data.append('image', values.image)
                        data.append('unity', values.unity)
                        data.append('categorys', inputCategory)
                        try {
                            await fetch(`${URIAgregarProd}`, {
                                method: 'post',
                                headers: new Headers({ Accept: 'application/json' }),
                                body: data
                            });

                        } catch (error) {
                            console.log(error);
                        }
                        setProductoAgregado(true)
                        resetForm()
                    }
                    }
                >
                    {formProps => (
                        <Form encType="multipart/form-data" className={styles.containerFormNewProd}>
                            <div className={styles.itemForm}>
                                <label htmlFor="category">Categoría(s)</label>
                                <Select
                                    name='categorys'
                                    options={categorys}
                                    components={animarComponentes}
                                    isMulti
                                    onChange={handleCategoryChange}
                                    placeholder="Seleccionar categoría(s)"
                                />
                            </div>
                            <button className={styles.btnEditarCategorys}>
                                <Link to='/editar-categorys'>
                                    Editar categorías
                                </Link>
                            </button>
                            <hr />
                            <div className={styles.itemForm}>
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    name='name'
                                    {...formProps.getFieldProps('name')}
                                />
                            </div>

                            <div className={styles.itemForm}>
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    type="text"
                                    name='description'
                                    {...formProps.getFieldProps('description')}
                                />
                            </div>

                            <div className={styles.containerCantidadUnidad}>
                                <div className={styles.itemForm}>
                                    <label htmlFor="quantity">Cantidad</label>
                                    <input
                                        type="number"
                                        name='quantity'
                                        {...formProps.getFieldProps('quantity')}
                                    />
                                </div>

                                <div className={styles.itemForm}>
                                    <label htmlFor="unity">Unidad</label>
                                    <input
                                        type="text"
                                        name='unity'
                                        {...formProps.getFieldProps('unity')}
                                    />
                                </div>
                            </div>

                            <div className={styles.itemForm}>
                                <label htmlFor="price">Precio</label>
                                <input
                                    type="number"
                                    name='price'
                                    {...formProps.getFieldProps('price')}
                                />
                            </div>


                            <div className={styles.itemForm}>
                                <label htmlFor="image">Imagen</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={e => { formProps.setFieldValue('image', e.target.files[0]) }}
                                />
                            </div>

                            <hr />

                            <button type="submit" className={styles.btnGuardar}>
                                Guardar
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}
