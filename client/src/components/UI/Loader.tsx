import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'


const Loader = ({ color }: {color: string}) => {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress sx={{ color: color }} />
    </Stack>
  )
}

export default Loader