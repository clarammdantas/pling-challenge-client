import React from 'react'

// Types
import Patient, { PatientUpdate, AddressUpdate } from '../../types/types'

// Styles
import styles from './modal.module.scss'
import formStyle from './patientForm.module.scss'

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

class EditPatientForm extends React.Component<{closeModal: ToggleModal, patient: Patient}, ModalState> {
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
                <span className={formStyle.title}><strong>Editar Paciente</strong></span>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.create_form}>
                        <div className={formStyle.form_row}>
                            <label>
                                Name:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='text' name='name' value={this.state.patient.name} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Age:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='number' name='age' value={this.state.patient.age} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Sexo:
                                <input onChange={this.handleChange} type='number'
                                    name='sex' value={this.state.patient.sex} min='0' max='1'
                                    placeholder='1 - Mulher / 0 - Homem'
                                    className={formStyle.search_field}/>
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                CPF:
                                <input onChange={this.handleChange} type='text' name='cpf'
                                    value={this.state.patient.cpf} placeholder='xxx.xxx.xxx-41'
                                    className={formStyle.search_field}/>
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Profissão:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='text' name='profession' value={this.state.patient.profession} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Número:
                                <input onChange={this.handleChange} type='text' name='cellNumber'
                                    value={this.state.patient.cellNumber} placeholder='(xx) xxxxx-xxxx'
                                    className={formStyle.search_field} />
                            </label>
                        </div>

                        <hr/ >

                        <span className={formStyle.title}><strong>Endereço</strong></span>
                        <div className={formStyle.form_row}>
                            <label>
                                Rua:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='text' name='address_street' value={this.state.address.street} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Número:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='number' name='address_number' value={this.state.address.number} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Bairro:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='text' name='address_district' value={this.state.address.district} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Cep:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                    type='text' name='address_zipCode' value={this.state.address.zipCode} />
                            </label>
                        </div>

                        <div className={formStyle.form_row}>
                            <label>
                                Complemento:
                                <input onChange={this.handleChange} className={formStyle.search_field}
                                type='text' name='address_complement' value={this.state.address.complement} />
                            </label>
                        </div>

                        <input className={formStyle.sub_button} type='submit' value='Submit' />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditPatientForm;
