import NavBar from './NavBar';
import '../sketch.css'

function Footer(){
  
  return (
    <>
        <footer class="py-5 d-flex flex-column justify-content-evenly">
            <div class="footer-content d-flex justify-content-between">
                <img src="/logo.png" alt="Movies Hub" class="logo ml-auto"/>
             <NavBar></NavBar>
                <div class="social-media d-flex align-items-center maxIcon">
                    <a href="#facebook"><i class="bi bi-facebook p-2"></i></a>
                    <a href="#twitter"><i class="bi bi-twitter-x p-2"></i></a>
                    <a href="#instagram"><i class="bi bi-instagram p-2"></i></a>
                </div> 
            </div>
            <div class="py-5 d-flex justify-content-center position-relative">
                <h4 class="text-light">www.movieshub.com</h4>
                <p class="copyright position-absolute">&copy; image cinema all rights reserved</p>
            </div>
        </footer>
    </>
  );
}

export default Footer;