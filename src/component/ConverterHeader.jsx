import { Box, Text } from '@chakra-ui/react';

const ConverterHeader = () => {
  return (
    <Box
      textAlign="center"
      // color="white"
      margin={{ base: '8', sm: '16' }}
      marginBottom="10"
    >
      <Text fontWeight="bold" fontSize={{ base: '2xl', sm: '3xl' }}>
        Currency Converter & Exchange Rates
      </Text>
      <Text fontWeight="medium" fontSize="sm">
        Convert money from one currency using Up to date FX rates
      </Text>
    </Box>
  );
};

export default ConverterHeader;
