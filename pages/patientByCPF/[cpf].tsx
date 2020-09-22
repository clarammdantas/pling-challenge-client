import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'

// Components
import PatientCard from '../../components/patient/PatientCard'
import PatientListMenu from '../patientList/PatientListMenu'

// Styles
import styles from '../../components/patient/patient.module.scss'

// Types
import  Patient from '../../types/types'
import EditPatientForm from '../../components/patientModals/EditPatientForm'
import PatientModal from '../../components/patientModals/PatientModal'
import Router from 'next/router'


interface PatientByCPFPage {
    patient: Patient
}

const PatientByCPF: NextPage<PatientByCPFPage> = ({patient}) => {
    const [page, setPage] = useState<number>(1);
    const [isModalOpen, setOpenModal] = useState<boolean>(false);
    const [isEditModalOpen, setEditModal] = useState<boolean>(false);
    const [currentPatient, setCurrentPatient] = useState<Patient>({} as Patient);

    const handlePageChangeLeft = () => {
        setPage(1);
    }

    const handlePageChangeRight = () => {
        setPage(1);
    }

    const toggleModal = () => {
        setOpenModal(!isModalOpen);
    }

    const toggleModalEdit = () => {
        if (isEditModalOpen) {
            Router.reload();
        }
        setEditModal(!isEditModalOpen);
    }

    const setCurrPatient = (patient: Patient) => {
        setCurrentPatient(patient);
        toggleModalEdit();
    }

    const editPatientForm = <EditPatientForm
                                closeModal={toggleModalEdit}
                                patient={currentPatient}
                              />

    return (
        <div className='content-container'>
            <div className='main-content'>
                <PatientListMenu
                    changePageLeft={handlePageChangeLeft}
                    changePageRight={handlePageChangeRight}
                    page={page}
                    showModal={toggleModal}
                />
                <div className={styles.patient_list}>
                    <PatientCard
                        patient={patient}
                        key={patient._id}
                        page={page}
                        toggleEditModal={setCurrPatient}
                    />
                </div>
                <PatientModal
                    isModalOpen={isEditModalOpen}
                    closeModal={toggleModalEdit}
                    children={editPatientForm}
                />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const cpf = (context.query.cpf as string).split('.')[0];
    const res = await fetch(process.env.baseURL + '/patient/getByCPF/' + cpf, {
        method: 'GET'
    });
    const patient = await res.json();

    return {
        props: {
            patient: patient
        },
    }
}

export default PatientByCPF;
