// In this function component, we list all the registered
// patients.

import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

// Types
import  Patient from '../../types/types'

// Styles
import styles from '../../components/patient/patient.module.scss'

// Components
import PatientCard from '../../components/patient/PatientCard'
import PatientListMenu from './PatientListMenu'
import NewPatientModal from '../../components/patient/PatientModal'
import CreatePatientModal from '../../components/patient/CreatePatientModal'

interface PatientListPage {
    patients: Array<Patient>
    nextPage: number
    totalPages?: number
}

const PatientListComponent: NextPage<PatientListPage> = ({patients, nextPage, totalPages}) => {
    const [page, setPage] = useState<number>(nextPage);
    const [isModalOpen, setOpenModal] = useState<boolean>(false);

    const handlePageChangeLeft = () => {
        if (page - 1 > 0) {
            setPage(page - 1);
        }
    }

    const handlePageChangeRight = () => {
        if (page + 1 <= totalPages) {
            setPage(page + 1);
        }
    }

    const toggleModal = () => {
        setOpenModal(!isModalOpen);
    }

    const createPatientForm = <CreatePatientModal closeModal={toggleModal} />

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
                    {patients.map((patient) => {
                        return <PatientCard patient={patient} key={patient.id} />
                    })}
                </div>
                <NewPatientModal
                    isModalOpen={isModalOpen}
                    closeModal={toggleModal}
                    children={createPatientForm}
                />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const page = (context.query.page as string).split('.')[0];
    const res = await fetch(process.env.baseURL + '/patient/list/' + page, {
        method: 'GET',
        mode: 'cors'
    });
    const patients = await res.json();

    const totalPagesReq = await fetch(process.env.baseURL + '/patient/getTotalPages')
    const totalPages = await totalPagesReq.json();

    return {
        props: {
            patients: patients,
            nextPage: parseInt(page),
            totalPages: totalPages.total_pages
        },
    }
}

export default PatientListComponent;
