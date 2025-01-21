import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
    const [deviceType, setDeviceType] = useState('');

    useEffect(() => {
      const detectDevice = () => {
        const width = window.innerWidth;
  
        // Check user agent for mobile/tablet detection (optional)
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const isTablet = /iPad|Tablet/i.test(navigator.userAgent);
  
         if (width < 768 || isMobile) {
          setDeviceType('mobile'); // fallback based on width
        }  if ((width>=768 &&width <= 1199)||isTablet) {
          setDeviceType('tablet'); // fallback based on width
        } if(width>1199) {
          setDeviceType('desktop');
        }
      };
  
      // Detect device on initial render and on window resize
      detectDevice();
      window.addEventListener('resize', detectDevice);
  
      // Cleanup the event listener when the component is unmounted
      return () => window.removeEventListener('resize', detectDevice);
    }, []); // Empty array ensures this runs only once on mount
  
    return deviceType;
};

export default useDeviceDetection;