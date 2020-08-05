import React from 'react';
import { useStyles } from './cadastroEquipamentoStyle';
import './cadastroEquipamentoStyle'
import { Button } from 'react-bootstrap';

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
    const classes = useStyles()

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
                        <Grid className={classes.formulario}>
                            <TextField className={classes.campodeinfo} label="Número da série" name="numeroSerie" type="text" helperText="*Obrigatório" variant="filled" />
                            <TextField className={classes.campodeinfo} label="Limite TEMPERATURA" name="limiteTemperatura" type="text" helperText="*Obrigatório" variant="filled" />
                            <TextField className={classes.campodeinfo} label="Limite CORRENTE" name="limiteCorrente" type="text" helperText="*Obrigatório" variant="filled" />
                            <TextField className={classes.campodeinfo} label="Limite TENSÃO" name="limiteTensao" type="text" helperText="*Obrigatório" variant="filled" />
                            <TextField className={classes.campodeinfo} label="CPF" name="cpf" type="number" helperText="*Obrigatório" variant="filled" />
                            <div>
                                <Button type="submit" className={classes.botaocadastrar}>Cadastrar</Button>
                            </div>
                        </Grid>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}