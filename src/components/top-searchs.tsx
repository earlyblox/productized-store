import { Badge, Flex, Text } from '@radix-ui/themes';

const searches = ['Design', 'Copywriting', 'Video Editors', 'Web Development'];

export function TopSearches() {
  return (
    <Flex justify='center' align='center' gap='3'>
      <Text>Top Searches: </Text>
      {searches.map((search, index) => (
        <Badge
          variant='outline'
          key={`search-${index + 1}`}
          size='2'
          color='gray'
          radius='full'
        >
          {search}
        </Badge>
      ))}
    </Flex>
  );
}
