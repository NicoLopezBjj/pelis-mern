import './sketch.css'
import Hero from './Hero';
import MyList from './MyList';
import Footer from './Footer'
import Estrenos from './Estrenos';
import ProxEstrenos from './ProxEstrenos';

function Home({newArray, dataSlide}){
  
  return (
    <>
       
        <Hero dataSlide={dataSlide}newArray={newArray} ></Hero>
        <Estrenos></Estrenos>
        <ProxEstrenos></ProxEstrenos>
        <MyList></MyList>
        <Footer></Footer>
    </>
  );
}

export default Home