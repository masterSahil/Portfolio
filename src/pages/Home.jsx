import React from 'react'
import ContactCTA from '../components/ContactCTA'
import Deliver from '../components/Deliver'
import DigitalArsenal from '../components/DigitalArsenal'
import EducationTimeline from '../components/EducationTimeline'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import SkillTree from '../components/SkillTree'
import RecentProjects from '../components/RecentProject'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <DigitalArsenal />
        <RecentProjects />
        <SkillTree />
        <Deliver />
        <EducationTimeline />
        <ContactCTA />
        <Footer />
    </>
  )
}

export default Home