import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectsSection from '../components/Projects'
import ContactCTA from '../components/ContactCTA'

const Projects = () => {
  return (
    <>
        <Navbar />
        <ProjectsSection />
        <ContactCTA />
        <Footer />
    </>
  )
}

export default Projects