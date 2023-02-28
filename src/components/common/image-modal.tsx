import Stack from '@mui/material/Stack'
import { Img } from '../../theme/styles';

interface ImageModalProps {
  link: string;
}

const ImageModal = ({ link }: ImageModalProps) => {
  return (
    <Stack>
        <Img src={link} />
    </Stack>
  )
}

export default ImageModal