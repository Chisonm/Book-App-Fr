import React from 'react'
import Navbar from './Navbar/Navbar'
import mainStyle from '../../styles/Main.module.css'

function Layout({children}) {
  return (
      <>
        <main className={mainStyle.main}>
            <Navbar/>
            <div className={mainStyle.main__container}>
                {children}
            </div>
        </main>
      </>
  )
}

export default Layout