import React from 'react'
import Hero from './Components/Hero'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Contacts from './Components/Contacts'

const page = () => {
  return (
   <main>
   <Hero/> 
   <Skills/>
   <Projects/>
   <Contacts/>
   </main>
  )
}

export default page