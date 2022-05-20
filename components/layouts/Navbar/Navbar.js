import React from 'react'
import styles from '../../../styles/Navbar.module.css'
import Link from 'next/link'

function Navbar() {
  return (
    <>
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <div className={styles.navbar__items}>
                    <div className={styles.navbar__logo__text}>
                        <Link href="/">
                            <h1>Books App</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar