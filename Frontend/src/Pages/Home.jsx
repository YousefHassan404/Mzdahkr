import React from 'react'
import Input from '../Component/Form/Input'
import Header from '../Component/Header/Header'
import Hero from '../Component/Hero/Hero'
import Footer from '../Component/Footer/Footer'
import InvestmentOpportunities from '../Component/InvestmentOpportunities/InvestmentOpportunities'
import FAQ from '../Component/FAQ/FAQ'
export default function Home() {
  return (<>
   <Header/>
   <Hero/>
   <InvestmentOpportunities/>
   <FAQ/>
   <Footer></Footer>
   </>
  )
}
