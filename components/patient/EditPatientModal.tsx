import React from 'react'

// Types
import Patient, { PatientUpdate, AddressUpdate } from '../../types/types'

// Styles
import styles from './modal.module.scss'

import fetch from 'isomorphic-unfetch'

type ToggleModal = (patient?: Patient) => void;

type ModalState = {
    patient: PatientUpdate,
    address: AddressUpdate
}

interface ModalProps {
    patient: Patient,
    closeModal: ToggleModal
}

class EditPatientModal extends React.Component<{closeModal: ToggleModal, patient: Patient}, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            patient: {} as PatientUpdate,
            address: {} as AddressUpdate
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        let fieldName = event.target.name;
        const isPatientAtt = /address*/

        const prevStatePatient = {...this.state.patient};
        const prevStateAddress = {...this.state.address};

        if (!isPatientAtt.test(fieldName)) {
            prevStatePatient[fieldName] = value;
            this.setState({patient: prevStatePatient})
        } else {
            fieldName = fieldName.split('_')[1];
            prevStateAddress[fieldName] = value;
            this.setState({address: prevStateAddress})
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.address !== {}) {
            const addressId = this.props.patient.address._id;
            await fetch(process.env.baseURL + '/address/update/' + addressId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.address)
            })
        } if (this.state.patient !== {}) {
            const patientId = this.props.patient._id;
            await fetch(process.env.baseURL + '/patient/edit/' + patientId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.patient)
            });
        }

        this.props.closeModal();
    }

    render() {
        return (
            <div className={styles.create_form_container}>
                <h2>Editar Paciente</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.create_form}>
                        <label>
                            Name:
                            <input onChange={this.handleChange} type='text' name='name' value={this.state.patient.name} />
                        </label>
                        <label>
                            Age:
                            <input onChange={this.handleChange} type='number' name='age' value={this.state.patient.age} />
                        </label>
                        <label>
                            Sexo:
                            <input onChange={this.handleChange} type='number'
                                name='sex' value={this.state.patient.sex} min='0' max='1'
                                placeholder='1 - Mulher / 0 - Homem'/>
                        </label>
                        <label>
                            CPF:
                            <input onChange={this.handleChange} type='text' name='cpf'
                                value={this.state.patient.cpf} placeholder='xxx.xxx.xxx-41' />
                        </label>
                        <label>
                            Profissão:
                            <input onChange={this.handleChange} type='text' name='profession' value={this.state.patient.profession} />
                        </label>
                        <label>
                            Número:
                            <input onChange={this.handleChange} type='text' name='cellNumber'
                                value={this.state.patient.cellNumber} placeholder='(xx) xxxxx-xxxx'/>
                        </label>
                        <hr/ >

                        <h4>Endereço</h4>
                        <label>
                            Rua:
                            <input onChange={this.handleChange} type='text' name='address_street' value={this.state.address.street} />
                        </label>
                        <label>
                            Número:
                            <input onChange={this.handleChange} type='number' name='address_number' value={this.state.address.number} />
                        </label>
                        <label>
                            Bairro:
                            <input onChange={this.handleChange} type='text' name='address_district' value={this.state.address.district} />
                        </label>
                        <label>
                            Cep:
                            <input onChange={this.handleChange} type='text' name='address_zipCode' value={this.state.address.zipCode} />
                        </label>
                        <label>
                            Complemento:
                            <input onChange={this.handleChange} type='text' name='address_complement' value={this.state.address.complement} />
                        </label>
                        <input type='submit' value='Submit' />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditPatientModal;
