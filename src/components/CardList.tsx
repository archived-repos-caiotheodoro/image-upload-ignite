import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
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
      { cards?.map((card: Card) => (
        <div key={card.id}>
          <h1>{card.description}</h1>
          <h1>{card.id}</h1>
          <h1>{card.title}</h1>
          <h1>{card.ts}</h1>
          <img  src={card.url}/>
        </div>
      )) /* TODO CARD GRID */}

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
