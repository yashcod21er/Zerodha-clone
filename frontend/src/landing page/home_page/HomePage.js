import React from 'react';
import Awards from './Stats';
import Herosection from './HersoSection';
import Education from './Education';
import Stats from './Award';
import Pricing from './Pricing';
import OpenAcoount from '../OpenAccount';

function HomePage() {
    return ( 
        <>
          
          <Herosection/>
          <Stats/>
          <Awards/>
          <Pricing/>
          <Education/>
          <OpenAcoount/>
         

        </>
     );
}

export default HomePage;
