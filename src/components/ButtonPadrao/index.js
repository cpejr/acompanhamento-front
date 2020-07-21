import React from 'react';
import {
  Button
} from '@material-ui/core'

import { lindo } from './styles'

function ButtonPadrao({ text }) {
  const cor = "red"
  const meDeixaLindo = lindo({ cor })

  return (
    <Button className={meDeixaLindo.butao}>
      {text}
    </Button>
  );
}

export default ButtonPadrao;
