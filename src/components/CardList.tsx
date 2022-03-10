import { Box, SimpleGrid,Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
    <SimpleGrid columns={3} spacing={5}>
      { cards?.map((card: Card) => (
        <Box backgroundColor={"pGray.800"} display={"flex"} width={"293.33px"} height={"290px"} key={card.id}  borderRadius='lg' overflow='hidden' flexDir={"column"}>
         <Box borderRadius='lg' height={"192.64px"} >
          <img  width={"293.33px"} height={"192.64px"} src={card.url}/>

         </Box>
         <Box  width={"100%"} fontFamily="Roboto" margin={"15px"} marginLeft={"25px"}>
          <Text fontSize='2xl' color={"pGray.50"}  fontWeight={"bold"} marginBlockEnd={"6px"}>{card.title}</Text>
          <Text fontSize='lg' color={"pGray.100"} fontWeight={"regular"}>{card.description}</Text>

         </Box>
        </Box>
      )) /* TODO CARD GRID */}

      {/* TODO MODALVIEWIMAGE */}
      </SimpleGrid>
    </>
  );
}
