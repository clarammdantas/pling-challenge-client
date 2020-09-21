import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

// Types
import  Patient from '../../types/types'

// Styles
import styles from './patient.module.scss'

// Components
import PatientCard from './PatientCard'
import PatientListMenu from './PatientListMenu'

interface PatientListPage {
    patients: Array<Patient>
    nextPage: number
}

const PatientListComponent: NextPage<PatientListPage> = ({patients, nextPage}) => {
    const [page, setPage] = useState<number>(nextPage);

    const handlePageChangeLeft = async () => {
        if (page - 1 > 0) {
            setPage(page - 1);
        }
    }

    const handlePageChangeRight = async () => {
        if (page + 1 < 3) {
            setPage(page + 1);
        }
    }

    return (
        <div className='content-container'>
            <div className='main-content'>
                <PatientListMenu
                    changePageLeft={handlePageChangeLeft}
                    changePageRight={handlePageChangeRight}
                    page={page}
                />
                <div className={styles.patient_list}>
                    {patients.map((patient) => {
                        return <PatientCard patient={patient} key={patient.id} />
                    })}
                </div>
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

    return {
        props: {
            patients: patients,
            nextPage: parseInt(page)
        },
    }
}

export default PatientListComponent;
