import { useState, useEffect } from 'react';
import { Container, VStack, Text, Box, Heading, List, ListItem, ListIcon, Link } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Index = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/nearby/{lat}/{lon}`);
        const data = await response.json();
        setLocations(data.places);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
        setLoading(false);
      }
    };

    // Example coordinates for demonstration
    fetchLocations(51.5074, -0.1278);
  }, []);

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Nearby Locations of Interest</Heading>
          <Text mt={4}>Explore locations around you with information from Wikipedia.</Text>
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <List spacing={3}>
            {locations.map((location, index) => (
              <ListItem key={index}>
                <ListIcon as={FaMapMarkerAlt} color="green.500" />
                <Link href={location.url} isExternal>
                  {location.title}
                </Link>
                <Text mt={2}>{location.description}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default Index;