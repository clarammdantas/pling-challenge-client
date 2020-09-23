import PatientListComponent from './patientList/[page]'

export default function Home({patients, totalPages}) {
    return (
        <PatientListComponent
            patients={patients}
            nextPage={1}
            totalPages={totalPages} />
    )
}

export const getStaticProps = async () => {
    const res = await fetch(process.env.baseURL + '/patient/list/1')
    const patients = await res.json();

    const totalPagesReq = await fetch(process.env.baseURL + '/patient/getTotalPages')
    const totalPages = await totalPagesReq.json();

    return {
        props: {
            patients: patients,
            totalPages: totalPages.total_pages
        }
    }
}
