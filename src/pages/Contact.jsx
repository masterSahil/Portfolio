import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactComponent from '../components/ContactComponent'
import ContactCTA from '../components/ContactCTA'

const ContactPage = () => {
  return (
    <>
        <Navbar />
        <ContactComponent />
        <ContactCTA />
        <Footer />
    </>
  )
}

export default ContactPage