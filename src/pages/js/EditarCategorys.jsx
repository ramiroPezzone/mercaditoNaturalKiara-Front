import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import URIs from "../../URIs";
import styles from '../css/EditarCategorys.module.css'

export const EditarCategorys = () => {

    const [categorys, setCategorys] = useState([])

    const [newCategory, setNewCategory] = useState({
        value: '',
        label: ''
    })

    const [categoryAdded, setCategoryAdded] = useState(false)
    const [categoryDeleted, setCategoryDeleted] = useState(false)

    // Lógica para ver las categorías existentes
    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
        })()
    }, [categoryAdded, categoryDeleted])
    // 


    // Lógica para adición de categoría
    const addCategory = () => {
        setCategoryAdded(true)
    }
    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value
        })
    }
    const agregar = async (e) => {
        e.preventDefault()
        await axios.post(`${URIs.categorys}`, {
            value: newCategory.value,
            label: newCategory.value
        })
        setCategoryAdded(!categoryAdded)
        setNewCategory({ value: '', label: '' })
    }
    // 

    // Lógica para eliminación de categoría
    const eliminarCategory = async (id) => {
        await axios.delete(`${URIs.categorys}/${id}`)
        setCategoryDeleted(!categoryDeleted)
    }
    // 

    return (
        <div className={styles.containerEditarCategorys}>
            <div className={styles.containerVolverAtras}>
                <Link to='/nuevo-producto'>
                    ⮪ Volver a Nuevo producto
                </Link>
            </div>

            <h3 className={styles.titleSectionEditarCategorys}>Agregar categoría</h3>

            <form className={styles.containerFormNewCat} onSubmit={agregar}>
                <div className={styles.itemForm}>
                    <label htmlFor="value" />
                    <input
                        type="text"
                        name="value"
                        placeholder="Escribe aquí para agregar una"
                        value={newCategory.value}
                        onChange={handleChange}
                    />
                </div>
                <div className={`${styles.itemForm} ${styles.itemFormLabel}`}>
                    <label htmlFor="label" />
                    <input
                        type="text"
                        value={newCategory.value}
                        readOnly
                    />
                </div>
                <div className={`${styles.itemForm} ${styles.btnSubmit}`}>
                    <button type="submit" onClick={addCategory}>
                        <span className={styles.textoBtn} title="agregar">+</span>
                    </button>
                </div>
            </form>

            <div className={styles.lineaDivisora} />

            {
                categorys.length === 0 && <Spinner variant="warning" />
            }

            {/* Mapeo de categorías existentes */}
            <h3 className={styles.titleSectionEditarCategorys}>Listado de categorías</h3>
            <div className={styles.listadoDeCategorys}>
                {
                    categorys.map(cat => (
                        <div
                            key={cat._id}
                        >
                            <div
                                className={styles.category}
                            >
                                <div className={styles.nameCategory}>
                                    <p>{cat.value}</p>
                                </div>
                                <div className={`${styles.itemForm} ${styles.btnSubmit}`}>
                                    <button onClick={() => eliminarCategory(cat._id)}>
                                        <span title="eliminar">❌</span>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.lineaDivisora2} />
                        </div>
                    ))
                }
            </div>
            {/*  */}

        </div>
    )
}
