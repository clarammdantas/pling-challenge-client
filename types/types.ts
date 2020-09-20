interface Address {
    id: string,
    street: string,
    district: string,
    zipCode: string,
    number: number,
    patient?: string,
    complement?: string
}

interface PatientRecord {
    id: string,
    appointmentDate: Date,
    annotations: string,
    prescription: string,
    lastUpdate: Date,
    patient?: string,
}

interface Patient {
    id: string,
    name: string,
    address: Address,
    age: number,
    cpf: string,
    sex: number,
    profession: string,
    cellNumber: string,
    records: PatientRecord
}

export default Patient;
