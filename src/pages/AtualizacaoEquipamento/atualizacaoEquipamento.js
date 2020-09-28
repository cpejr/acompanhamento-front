import React, { useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core"
import { useParams } from 'react-router';


function AtualizacaoEquipamento() {
  const { id } = useParams();

  return (
    <h1>
        Olá mundo
    </h1>
  );

}

export default AtualizacaoEquipamento;