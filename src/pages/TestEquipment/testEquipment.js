import React, { useState, useEffect } from "react";
import api from '../../services/api';

import { useStyles } from './testEquipmentStyle';

export default function TestEquipment() {

  const [testEquipments, setTestEquipments] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // setTestEquipments([
    //   { temperature: 33 },
    //   { temperature: 33 },
    //   { temperature: 33 },
    //   { temperature: 33 },
    //   { temperature: 33 },
    //   { temperature: 33 },
    //   { temperature: 33 },
    // ]);
    api.get('testequipment/index')
      .then(testequipment => {
        const equipments = testequipment.data.testEquipment
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
            <li key={equipment.temperature}>{JSON.stringify(equipment)}</li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}
