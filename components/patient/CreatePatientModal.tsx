import React from 'react'

// Types
import Patient from '../../types/types'

// Styles
import styles from './modal.module.scss'

import fetch from 'isomorphic-unfetch'

type ModalState = {
    patient: Patient
}

class CreatePatientModal extends React.Component<{}, ModalState> {
    constructor(props: ModalState) {
        super(props);
        this.state = {
            patient: {
                address: {}
            } as Patient
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        let fieldName = event.target.name;
        const isPatientAtt = /address*/

        const prevState = {...this.state.patient};

        if (!isPatientAtt.test(fieldName)) {
            prevState[fieldName] = value;
            this.setState({patient: prevState})
        } else {
            fieldName = fieldName.split('_')[1];
            prevState['address'][fieldName] = value;
            this.setState({patient: prevState})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.baseURL + '/patient/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.patient)
        }).then(res => console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", res))
    }

    render() {
        return (
            <div className={styles.create_form_container}>
                <h2>Novo Paciente</h2>
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
                            <input onChange={this.handleChange} type='text' name='address_street' value={this.state.patient.address.street} />
                        </label>
                        <label>
                            Número:
                            <input onChange={this.handleChange} type='number' name='address_number' value={this.state.patient.address.number} />
                        </label>
                        <label>
                            Bairro:
                            <input onChange={this.handleChange} type='text' name='address_district' value={this.state.patient.address.district} />
                        </label>
                        <label>
                            Cep:
                            <input onChange={this.handleChange} type='text' name='address_zipCode' value={this.state.patient.address.zipCode} />
                        </label>
                        <label>
                            Complemento:
                            <input onChange={this.handleChange} type='text' name='address_complement' value={this.state.patient.address.complement} />
                        </label>
                        <input type='submit' value='Submit' />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreatePatientModal;
