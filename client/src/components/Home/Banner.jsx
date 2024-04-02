import React from 'react'
import Styles from './Styles/Banner.module.css'
function Banner() {
  return (
    <div className= {Styles.container}>
        <span className= {Styles.Text}>Grab upto 50% off on
Selected headphones</span>
        <img className= {Styles.girl_img} src="https://s3-alpha-sig.figma.com/img/e8fe/1440/dabb327ce88f9fcc7f707d7d08943724?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fVU5g-KvjhwJb64PA2qv2AtZ2-jENN8KpC3algzXtJqXN9n618i8Hxe~esMxck57qLORWAJrdL~G52qTUlQMFBDFpgTAHRT6agLeWB-J5oFoml5apw4YUdw-TvLOQ8OMK4G41O8arPe99TQDzCJYdU6mqPGIVv3Qrb5oMViPFHiFhdTlJML3MDxlkbD7oPizkDs-EPfL7TSG62VPqg2XEHixbR8vhPCVrLFgOBLZLQ0IfnGIQTa3CCASjopXhVCKIUj9ckfOaMz0tkHSNMfhPUVbHpIM-KTxku7sO6v430zOh~XYcM1GZC6UStMtFw98jpcKGWp8NBWm4lgcIAkr6A__" alt="" />
    </div>
  )
}

export default Banner