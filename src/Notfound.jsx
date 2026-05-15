import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
export function Notfound() {
  const navigate=useNavigate()
  return (
    <div>
      <div>
         <img
        className="notfount"
        src="https://media.tenor.com/IHdlTRsmcS4AAAAM/404.gif"
        alt="404 not fount" />
        </div>
        <div>
          <Button variant='contained'color="secondary" onClick={()=>navigate("/")}>see al recipes</Button>
        </div>
    </div>
  );
}
