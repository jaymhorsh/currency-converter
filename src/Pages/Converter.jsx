import React from 'react'
import { Flex } from '@chakra-ui/react'
import Converter from '../component/Converter'
const ConverterPage = () => {
  useEffect(() => {
    document.title = "Currency Converter";
  }, []);
  return ( <Flex
    bgGradient="linear(to-t, #ae085c, #2e0656)"
    height="100vh"
    justifyContent="center"
  >
    <Converter />
  </Flex>
  )
}

export default ConverterPage