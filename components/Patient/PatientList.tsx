import React from 'react'

// Types
import  Patient from '../../types/types'

// Styles
import styles from './patient.module.scss'

// Components
import PatientCard from './PatientCard'

interface PatientList {
    patients: Array<Patient>
}

const PatientListComponent: React.FC<PatientList> = ({patients}) => {
    return (
        <div className={styles.patient_list}>
            {patients.map((patient) => {
                return <PatientCard patient={patient} key={patient.id} />
            })}
        </div>
    )
}

export default PatientListComponent;
