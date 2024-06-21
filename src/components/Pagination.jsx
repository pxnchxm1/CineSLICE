import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

function Pagination({activepage,totalPages, setActivePage}) {

  return (<>
    <Stack   marginTop={3} marginBottom={3} gap={1} alignItems={'center'} direction={'row'}>
    <Button variant="outlined" color="success" disabled={activepage===1} onClick={()=>setActivePage(activepage-1)} >
   Prev
</Button>
<Typography>{activepage}</Typography>
<Typography>of</Typography>
<Typography>{totalPages}</Typography>
<Button variant="outlined" color="success" onClick={()=>setActivePage(activepage+1)} disabled={activepage===totalPages}>
   Next
</Button>

    </Stack>
    </>
  )
}

export default Pagination
