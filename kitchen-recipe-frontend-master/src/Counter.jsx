import { useState } from "react";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

export function Counter() {

  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  return (
    <div>
      <IconButton  onClick={() => setLike(like + 1)}><Badge badgeContent={like} color="success">👍 </Badge> </IconButton>
      <IconButton onClick={() => setDisLike(dislike + 1)}><Badge badgeContent={dislike} color="error"> 👎</Badge></IconButton>
    </div>
  );
}
