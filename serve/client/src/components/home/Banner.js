import React from 'react'
import "./banner.css"
import Carousel from 'react-material-ui-carousel'
const data = [
  "https://static.vecteezy.com/system/resources/previews/000/962/811/non_2x/cosmetic-advertising-banner-with-3d-bottle-set-vector.jpg",
  "https://www.apstitch.com/media/pcon/promotional-products-banner-1900x500_img_4.jpg",
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]
const Banner = () => {
  return (
    <Carousel
    className="carasousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px",
                    }
                }}
                >
        {
      data.map((imag,i)=>{
        return(
            <>
         <img src={imag} alt='' className='banner_img'/>
            </>
        )
      }

      )}
    </Carousel>
  )
}

export default Banner
