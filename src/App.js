/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react';
//import axios
import axios from 'axios';

// import icon
import {
  IoMdSunny,
  IoMdCloudy,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdRainy,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsSnow,
} from 'react-icons/bs';



import {TbTemperatureCelsius} from 'react-icons/tb'
import {ImPointUp, ImSpinner8} from 'react-icons/im'

// ApI key 8306ffc205235bdf8e8c2e62be3974ea
const APIkey ='8306ffc205235bdf8e8c2e62be3974ea'

const App = () => {
  const [data, setData] = useState(null);
  const [ location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState ('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleSubmit = (e) => {
    //if input value is empty
    if (input.value === ''){
      //set animate to true 
      setAnimate(true);
      //after 500 ms set animate to false
      setTimeout (() => {
        setAnimate(false);
      },500);
    }
   
    //if input values is not empty
    if (inputValue !== '') {
     
      //set location
      setLocation(inputValue);
    };

    //select the input
    const input = document.querySelector('input');

   // clear input
   input.value = '';

   
    //prevent defaults
    e.preventDefault();

  };


  // fetch the Data
  useEffect(()=>{
    //set loading to true
    setLoading(true);


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      //set the data after 1500 ms
      setTimeout(()=>{
        setData(res.data);
         //set loading to false
        setLoading(false);
      },1500)
     
    }).catch(err =>{
      setLoading(false);
      setErrorMsg(err)
    });
  },  [location]);

  //error message
  useEffect(()=>{ const timer = setTimeout(()=> { 
    setErrorMsg('')
  }, 2000)
  // clear time
  return ()=> clearTimeout(timer);
  },[errorMsg])

  // If data is show the leader  
if (!data) {
  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
      <div>
        <ImSpinner8  className= 'text-5xl animate-spin text-white' />
      </div>
    </div>

  );
}


// set the icon according to the weather
let icon;
console.log(data.weather[0].main);

switch (data.weather[0].main)  {
  
    case 'Clouds':
     icon = <IoMdCloudy />;
     break;

    case 'Haze':
     icon = <BsCloudHaze2Fill/>;
     break;

    case 'Rain':
     icon = <IoMdRainy className='text-[#31cafb]'/>;
     break;

    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]'/>;
      break;

    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>;
      break;

      case 'Snow':
        icon = <BsSnow className='text-[#31cafb]'/>;
        break;

        case 'Thunderstorm':
          icon = <IoMdThunderstorm/>;
          break;
        
}

//date object


const App = () => { 

  const [loading, setLoading] = useState(true); // Add appropriate state variables
  const [data, setData] = useState({});
  const [animate, setAnimate] = useState(false);

  const handleInput = (e) => {
    // Implement your input handling logic
  };

  const handleButtonClick = (e) => {
    // Implement your button click handling logic
  };

  const icon = 'your-icon'; // Replace with your actual icon data

  const date = new Date();

  return (
    
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center px-4 lg:px-0'>
         {/*error msg */}
      {errorMsg  && <div className='w-full ma-w-[90vh] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md '>{`${errorMsg.response.data.message}`}<div/>
     
      {/* form */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            type='text'
            placeholder='search by city or country'
            className='flex-1 bg-transparent outline-none placeholder:text-white text-[15px] font-light pl-6 h-full'
          />
          <button
            onClick={(e) => handleButtonClick(e)}
            className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'
          >
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {loading ? (
          <div className='w-full h-full flex justify-center items-center'><ImSpinner8 className='
          text-white text-5xl animate-spin'/></div>
        ) : (
          <div>
            {/* card top */}
            <div className='flex items-center gap-x-5'>
              {/* icon */}
              <div className='text-[87px]'>{icon}</div>
              <div>
                {/* country name */}
                <div className='text-2xl font-semibold'>
                  {data.name},{data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className='my-20'>
              <div className='flex justify-center items-center'>
                {/* temp */}
                <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                {/* celsius */}
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className='capitalize text-center'>{data.weather[0].description}</div>
            </div>
            {/* card bottom */}
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  <div>
                    visibility {' '}
                    <span className='ml-2'>{data.visibility / 1000}Km</span>
                  </div>
                  <div className='flex items-center gap-x-2 '>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsThermometer />
                    </div>
                    <div>
                      Feels like
                      <span className='ml-2'>{parseInt(data.main.feels_like)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  <div>
                    Humidity{' '}
                    <span className='ml-2'>{data.main.humidity}%</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsWind />
                    </div>
                    <div>
                      Wind
                      <span className='ml-2'>{data.wind.speed}m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      };
    </div> 

  );
};
};
export default App;
