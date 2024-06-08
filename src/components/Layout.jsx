import PropTypes from 'prop-types'
import React from 'react'
import Navbar from './Navbar'
function Layout({children}) {
  return (
    <>
     <Navbar></Navbar>
     <main>{
      children
     }</main>
     </>
  )
}
Layout.propTypes={
  children:PropTypes.node.isRequired,
}

export default Layout
