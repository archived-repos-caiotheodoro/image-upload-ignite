import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {

  

  return (
  <Modal isOpen={isOpen} onClose={onClose} >
     <ModalOverlay />
        <ModalContent  maxW={'900px'} maxH={'600px'}>
          <ModalBody justifyContent={"center"} sx={{padding: '0px'}} >
            <Image src={imgUrl} minWidht={'600px'} maxW={'900px'} maxH={'600px'}/>
          </ModalBody>

          <ModalFooter backgroundColor={"pGray.800"} justifyContent={"left"} padding={"4px"}   borderRadius={'0px 0px 6px 6px'}>
              <a>
                <Link href={imgUrl} fontFamily={"Roboto"} fontSize={"14px"} marginLeft={"10px"}>  Abrir original</Link>
              </a>
            
          </ModalFooter>
        </ModalContent>
  </Modal>
  )
}