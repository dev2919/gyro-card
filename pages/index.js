import React, {useState, useEffect, useRef} from 'react'


export default function Home() {

  const [count, setCount] = useState({x:'0', y:"0",z:"0"});


  const ball   =useRef(null);
  const garden = useRef(null);
  const output = useRef(null);
  
  const maxX = garden.clientWidth  - ball.clientWidth;
  const maxY = garden.clientHeight - ball.clientHeight;
  
  function handleOrientation(event) {
  

    let x = event.beta;  // In degree in the range [-180,180)
    let y = event.gamma; // In degree in the range [-90,90)
    let z = event.alpha; // In degree in the range [-90,90)
  
    output.textContent  = `beta : ${x}\n`;
    output.textContent += `gamma: ${y}\n`;
  
    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x >  3) { x =  3};
    if (x < -3) { x = -3};
    if (z < -3) { z = -3};
  
    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 0;
    y += 0;
    z += 0;
  
    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    // console.log(ball.current.getBoundingClientRect().top);
    // console.log(x,y);
    setCount({x,y,z})
    // ball.current.getBoundingClientRect().top  = `${maxY * y / 180 - 10}px`;
    // ball.current.getBoundingClientRect().left = `${maxX * x / 180 - 10}px`;
  }

  useEffect(() => {
    // Client-side-only code
    
    window.addEventListener('deviceorientation', handleOrientation);
    
})

function requestOrientationPermission(){

  console.log(DeviceOrientationEvent.requestPermission);

  if(typeof(DeviceOrientationEvent.requestPermission) === 'function')
  DeviceOrientationEvent.requestPermission()
  .then(response => {
      if (response == 'granted') 
      {
          window.addEventListener('deviceorientation', handleOrientation)
      }
  })
  .catch(console.error)


}

  
  

  return (
    <div className=" ">

{/* <div className="garden" ref={garden}>
  <div className="ball" style={{top:count.x, left:count.y}} ref={ball}></div>
</div>

<pre className="output" ref={output}></pre> */}

<button onClick={requestOrientationPermission}>Get access</button>


{/* <div className=' h-32 w-24 bg-white m-5 rounded-lg' style={{transform:`skew(${count.x}deg,${count.y}deg)`}} >

</div> */}

<section class="cards">
    <div class="card charizard animated" style={{ transform: `rotateZ(${count.x}deg) rotateX(${count.y}deg) rotateY(${count.z}deg)`, "--backgroundPosition": `${count.y*2}% ${count.y*2}%`, "--filter": `brightness(${count.x}) contrast(${count.x})` }} ></div>
  </section>

    </div>
  )
}
