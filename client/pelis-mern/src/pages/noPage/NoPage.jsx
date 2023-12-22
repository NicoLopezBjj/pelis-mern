import Header from '../../components/Header';
import '../../sketch.css'

function NoPage(){
  
  return (
    <>
      <Header/>
      <div class="text-center">
          <h1 class="text-light">ERROR: 404</h1>
          <h3 class="text-light">Not Found</h3>
      </div>
    </>
  );
}

export default NoPage;