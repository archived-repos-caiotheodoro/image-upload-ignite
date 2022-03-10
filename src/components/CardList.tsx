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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [url,setUrl] = useState('')
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function viewImage(url: string){
    setUrl(url)
    onOpen()
  }

  return (
    <>
    <SimpleGrid columns={3} spacing={10}>
      { cards?.map((card: Card) => (
        <Card data={card} viewImage={()=> viewImage(card.url)} key={card.id}/>
    
      ))}

      <ModalViewImage imgUrl={url} isOpen={isOpen} onClose={onClose} />

    
      </SimpleGrid>
    </>
  );
}
