import PatientListComponent from './patientList/[page]'

export default function Home({patients}) {
    return (
        <PatientListComponent patients={patients} nextPage={1} />
    )
}

export const getStaticProps = async () => {
    const res = await fetch(process.env.baseURL + '/patient/list/1')
    const patients = await res.json();

    return {
        props: {
            patients: patients,
        }
    }
}
