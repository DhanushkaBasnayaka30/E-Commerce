
import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewsLatter from '../components/NewsLatter'
import OurPolicy from '../components/OurPolicy'

function Home() {
  
  return (
    <div className='sm:pt-28 pt-24 -28 mt- '>
      <div className=' ' data-aos="zoom-in"><Hero/></div>
      <div ><LatestCollection/></div>
      <div><BestSeller/></div>
      <div><OurPolicy/></div> 
      <div className=''><NewsLatter/></div> 
    </div>

  )
}

export default Home
