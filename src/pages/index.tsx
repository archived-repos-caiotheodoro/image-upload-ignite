import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { number } from 'yup';
import {QueryFunction   } from 'react-query';


type GetImageProps = {
  after: string;
  data: Image[];
}

type Image = {
  id: string;
  url: string;
  description: string;
  title: string;
  ts: number;
}



export default function Home(): JSX.Element {
  
  async function fetchProjects({pageParam = null}): Promise<GetImageProps> {
    const {data}  = await api.get<GetImageProps>('/api/images', {
      params: {
        after: pageParam,
      }
    })
    console.log(data)
    return data;
  }
  
  useEffect(() => {
    
  },[])

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', 
    fetchProjects, 
    {
      getNextPageParam: (lastPage: GetImageProps, pages) => lastPage.after? lastPage.after : null,
    }
  );

  const formattedData  = useMemo(() => {
    const formatted  = data?.pages.flatMap(page => page.data.flat())

    return formatted
    
  }, [data]);

  return (
    <>
    { isLoading ? <Loading /> : isError ? <Error /> : 
      <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
         <CardList cards={formattedData} />
        {hasNextPage && <Button marginBlockStart={10}  onClick={() => fetchNextPage()}>{!isFetchingNextPage? 'Carregar mais': 'Carregando...'}</Button>}
      </Box>
      </>
    }
    </>
  );
}
