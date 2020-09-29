import React from 'react';
import { Button, FormControl, InputLabel, FilledInput, FormHelperText } from '@material-ui/core';
import MaskedInput from 'react-text-mask'

function CPFInput(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
    />
  );
}

function Testes() {
  const [values, setValues] = React.useState({
    cpf_client: '',
  });

  const handleChangeInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  function mostrar() {
    console.log(values.cpf_client)
  }

  return (
    <div>
      <FormControl
        error={true}
      >
        <InputLabel>CPF</InputLabel>
        <FilledInput
          value={values.cpf_client}
          onChange={handleChangeInput}
          name="cpf_client"
          inputComponent={CPFInput}
        />
        <FormHelperText>*Obrigatório</FormHelperText>
      </FormControl>

      <Button onClick={mostrar}>Mostrar</Button>
    </div>
  );
}

export default Testes;
