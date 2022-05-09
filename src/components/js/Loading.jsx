import styles from '../css/Loading.module.css'

export const Loading = () => {
    return (
        <div className={styles.containerLoading}>
            <div className={styles.loading}>
                <h3>Cargando...</h3>
            </div>
        </div>
    )
};
