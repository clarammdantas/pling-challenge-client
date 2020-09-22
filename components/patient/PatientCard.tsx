import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Types
import Patient from '../../types/types'

// Styles
import styles from './patient.module.scss'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

interface PatientType {
    patient: Patient,
    page: number,
    key: string
}

const PatientCard: React.FC<PatientType> = ({ patient, key, page }) => {
    const deletePatient = async () => {
        await fetch(process.env.baseURL + '/patient/delete/' + patient._id, {
            method: 'DELETE'
        });
    }

    return(
        <div key={key} className={styles.patient_card}>
            <div className={styles.patient_avatar}>
                <div className={styles.user_mock_avatar}></div>
            </div>

            <div className={styles.patient_info}>
                <div className={styles.patient_personal_info}>
                    <span><strong>Nome: </strong>{patient.name}</span>
                    <span><strong>Idade: </strong>{patient.age}</span>
                    <span><strong>Sexo: </strong>{patient.sex}</span>
                    <span><strong>CPF: </strong>{patient.cpf}</span>
                    <span><strong>Profissão: </strong>{patient.profession}</span>
                    <span><strong>Número: </strong>{patient.cellNumber}</span>
                </div>
                <div className={styles.patient_address_info}>
                    <span><strong>Endereço</strong></span>
                    <span>
                        <strong>Rua: </strong>
                        {patient.address.street}, N. {patient.address.number}
                    </span>
                    <span><strong>Bairro: </strong>{patient.address.district}</span>
                    <span><strong>Cep: </strong>{patient.address.zipCode}</span>
                    <span><strong>Complemento: </strong>{patient.address.complement}</span>
                </div>
            </div>

            <div className={styles.patient_records}>
                <div className={styles.patient_actions}>
                    <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        className={styles.edit_button}
                    />
                    <div onClick={deletePatient}>
                        <Link href={`/patientList/${page}.tsx`}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                size='2x'
                                className={styles.delete_button}
                            />
                        </Link>
                    </div>
                </div>
                <a href=''>Ver fichas</a>
            </div>
        </div>
    )
}

export default PatientCard;
