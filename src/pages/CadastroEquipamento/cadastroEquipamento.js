import React from 'react';
import { useStyles } from './cadastroEquipamentoStyle';
import './cadastroEquipamentoStyle'
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';

import {
    CssBaseline,
    Tab,
    Typography,
    Tabs,
    AppBar,
    TextField,
    Grid
} from "@material-ui/core"

export default function CadastroEquipamento(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [formData, setFormData] = useState({ emailPromocional: true });
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    function handleChangeInput(event) {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value })
    }
  
    function handleSubmit(qualForm) {
    if (qualForm === "cadastroEquip") alert("Equipamento Cadastrado")
    else alert("Erro")
    }
  
    useEffect(() => { console.log(formData) }, [formData])



    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Typography variant="h3" className={classes.tittle}>
                    Cadastro de um novo equipamento
        </Typography>
                <div className={classes.formulariointeiro}>
                    <div>
                        <AppBar position="" className={classes.appbar}>
                            <Tabs aria-label="simple tabs example">
                                <Tab className={classes.novoequipamento} label="Novo Equipamento" />
                            </Tabs>
                        </AppBar>
                    </div>
                </div>

                <div>
                    <div>
                        <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroEquip")}>
                            <Grid className={classes.formulario}>
                                <TextField className={classes.campodeinfo} value={formData.id_equipment} label="Número da série" name="numeroSerie" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                                <TextField className={classes.campodeinfo} value={formData.temperature} label="Limite TEMPERATURA" name="limiteTemperatura" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                                <TextField className={classes.campodeinfo} value={formData.current} label="Limite CORRENTE" name="limiteCorrente" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                                <TextField className={classes.campodeinfo} value={formData.voltage} label="Limite TENSÃO" name="limiteTensao" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                                <TextField className={classes.campodeinfo} value={formData.cpf} label="CPF" name="cpf" onChange={handleChangeInput} type="number" helperText="*Obrigatório" variant="filled" />
                                <div>
                                    <Button type="submit" className={classes.botaocadastrar}>Cadastrar</Button>
                                </div>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}