/*
import { useMemo, useEffect, useState } from 'react'
import { breakpoints } from '@lib/breakpoints';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const isLarge = useMemo(() => {
    return windowWidth && windowWidth >= breakpoints.md ? true : false
  }, [windowWidth])

  const isMedium = useMemo(() => {
    return windowWidth && windowWidth >= breakpoints.sm ? true : false
  }, [windowWidth])

  return {
    isLarge,
    isMedium,
    ww: windowWidth,
    breakpoints
  };
}
*/
