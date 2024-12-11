import React from 'react'
import '../../styles/global.css'
import Header from './components/Header'

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className="dark mx-auto max-w-[1200px]">
      <body className="px-5 py-10">
        <Header />
        <main className="px-5 py-10">{children}</main>
      </body>
    </html>
  )
}

export default Layout
