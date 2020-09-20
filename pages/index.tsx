import PatientListComponent from '../components/Patient/PatientList'
import { GetStaticProps } from 'next'

export default function Home({patients}) {
    return (
        <div className='content-container'>
            <div className='main-content'>
                <PatientListComponent patients={patients}/>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(process.env.baseURL + '/patient/list/1');
    const patients = await res.json();

    return {
        props: {
            patients: patients,
        },
    }
}
