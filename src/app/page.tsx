import { SearchBar } from '@/components/search-bar';
import { TopSearches } from '@/components/top-searchs';
import { Container, Flex, Heading, Section, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Container>
        <Section>
          <Flex direction='column' gap='3'>
            <Heading as='h1' align='center' size='9'>
              Discover Productized Services
            </Heading>
            <Text align='center' size='5'>
              Explore the best productized services in the market.
            </Text>
          </Flex>
          <SearchBar />
          <TopSearches />
        </Section>
      </Container>
    </main>
  );
}
