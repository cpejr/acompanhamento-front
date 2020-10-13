import React, { useState, useEffect } from "react";
import api from '../../services/api';

import { useStyles } from './testEquipmentStyle';

export default function TestEquipment() {

    const [testEquipments, setTestEquipments] = useState();
    const classes = useStyles();

    useEffect(() => {
        api.get('testequipment/index')
            .then(testequipment => {
                const equipments = testequipment.data.data
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
                {testEquipments}
            </div>
        </div>
    )
}