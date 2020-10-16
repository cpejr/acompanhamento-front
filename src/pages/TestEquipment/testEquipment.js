import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import api from '../../services/api';
import ordenar from '../../services/ordenar';

import { useStyles } from './testEquipmentStyle';

export default function TestEquipment() {

  const [testEquipments, setTestEquipments] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    api.get('data/equipament/bd23d030-0414-11eb-a5d4-d9a33cd11de3')
      .then(testequipment => {
        const equipments = ordenar(testequipment.data.data, "createdAt", true)
        setTestEquipments(equipments);
      })
      .catch(err => {
        console.error("Backend is not working properly", err);
      });
  }, [])

  return (
    <div>
      <div className={classes.root}>
        Dados teste coletados:
        <ul>
          {testEquipments.map(equipment => (
            <>
              <li key={equipment.temperature}>
                update in {format(parseISO(equipment.createdAt), "dd/MM/yyyy HH:mm")}, temperature: {equipment.temperature}
              </li>
              <br />
            </>
          ))
          }
        </ul>
      </div>
    </div>
  )
}
