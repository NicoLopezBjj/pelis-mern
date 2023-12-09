import './sketch.css'

function MyList(){
  
  return (
    <>
        <section class="news px-5">
            <h3 class="text-center text-uppercase text-light mb-5">News</h3>
            <div class="news-container d-flex flex-nowrap">
                <div class="d-flex flex-column mx-3">
                    <img src="cine.PNG" alt="News IMG" class="mb-3"/>
                    <p class="news-title ms-1">Review of files in 3D format becoming more acceptable</p>
                </div>
                <div class="d-flex flex-column mx-3">
                    <img src="cine.PNG" alt="News IMG" class="mb-3"/>
                    <p class="news-title ms-1">Review of files in 3D format becoming more acceptable</p>
                </div>
                <div class="d-flex flex-column mx-3">
                    <img src="cine.PNG" alt="News IMG" class="mb-3"/>
                    <p class="news-title ms-1">Review of files in 3D format becoming more acceptable</p>
                </div>
            </div>
            <div class="news-slide my-5 d-flex justify-content-between">
                <button><i class="bi bi-arrow-left ms-2 mb-3"></i></button>
                <div class="mt-4"> 
                    <i class="fa-regular fa-circle" style={{color:"#d70f0f"}}></i> 
                    <i class="fa-solid fa-circle" style={{color:"#d70f0f"}}></i>
                    <i class="fa-regular fa-circle" style={{color:"#d70f0f"}}></i>
                </div>
                <button><i class="bi bi-arrow-right me-2 mb-3"></i></button>
            </div>
        </section>
    </>
  );
}

export default MyList;