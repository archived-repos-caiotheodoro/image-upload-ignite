import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}



export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();
  const regFormatImage = /[\/.](gif|jpg|jpeg||png)$/i;
  const formValidations = {
    image: {
      required: true,
      validate: {
        validate: value => value === null || undefined && 'Campo obrigatório',
        lessThan10MB:  value => value.size > 10485760 && 'O arquivo deve ser menor que 10MB',
        acceptedFormats: value => regFormatImage.test(value.type)  && 'Somente são aceitos arquivos PNG, JPEG e GIF',
    },
      errors: {
        required: 'Campo obrigatório',
        lessThan10MB: 'O arquivo deve ser menor que 10MB',
        acceptedFormats: 'Somente são aceitos arquivos PNG, JPEG e GIF',
      }
    },
    title: {
    required: true,
    maxLength: {
      value: 20,
      message: 'Máximo de 20 caracteres',
    },
    minLenght: {
      value: 2,
      message: 'Mínimo de 2 caracteres',
    },
    errors: {
      required: 'Título obrigatório',
      maxLength: 'Máximo de 20 caracteres',
      minLenght: 'Mínimo de 2 caracteres',
    },
    },
    description: {
    required: true,
    maxLength: {
      value: 100,
      message: 'Máximo de 65 caracteres',
    },
    errors: {
      required: 'Descrição obrigatória',
      maxLength: 'Máximo de 65 caracteres',
    },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (image: Record<string, unknown>) => api.post('/api/images', image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
        closeModal();
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if(!imageUrl){
        toast({
          title: 'Imagem não adicionada',
          description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      await mutation.mutateAsync(data).then(() => {
        toast({
          title: 'Imagem cadastrada',
          description: 'Sua imagem foi cadastrada com sucesso.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          name="image"
          trigger={trigger}
          {...register('image',formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          name='title'
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name='description'
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
