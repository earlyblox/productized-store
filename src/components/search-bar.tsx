'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';

export function SearchBar() {
  return (
    <TextField.Root size='3' radius='full' my='4'>
      <TextField.Slot>
        <MagnifyingGlassIcon height='16' width='16' />
      </TextField.Slot>
      <TextField.Input width={400} placeholder='Search the docs…' />
    </TextField.Root>
  );
}
