interface Address {
    _id: string,
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
    _id: string,
    name: string,
    address: Address,
    age: number,
    cpf: string,
    sex: number,
    profession: string,
    cellNumber: string,
    records: PatientRecord
}

export interface PatientUpdate {
    name?: string,
    age?: number,
    cpf?: string,
    sex?: number,
    profession?: string,
    cellNumber?: string,
}

export interface AddressUpdate {
    street?: string,
    district?: string,
    zipCode?: string,
    number?: number,
    complement?: string
}

export default Patient;
