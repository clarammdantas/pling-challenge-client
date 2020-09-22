import React from 'react'

// Styles
import styles from './modal.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

type ToggleModal = () => void;

interface ModalProps {
    isModalOpen: boolean,
    closeModal: ToggleModal
}

const NewPatientModal: React.FC<ModalProps> = ({
    children,
    isModalOpen,
    closeModal
}) => {
    if (isModalOpen) {
        return (
            <div className={styles.modal}>
                <div className={styles.modal__content}>
                    <div onClick={closeModal} className={styles.modal__close}>
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            size='xs'
                        />
                    </div>
                    {children}
                </div>
            </div>
        )
    }

    return(
        <div />
    )
}

export default NewPatientModal;
