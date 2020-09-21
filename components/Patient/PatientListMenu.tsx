import React from 'react'

// Styles
import styles from './patientListMenu.module.scss'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faArrowCircleRight,
    faArrowCircleLeft,
    faPlusSquare
} from '@fortawesome/free-solid-svg-icons'

const PatientListMenu: React.FC = () => {
    return (
        <div className={styles.patient_list_menu_container}>
            <div className={styles.patient_list_menu}>
                <div className={styles.search_container}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        size='xs'
                        className={styles.search_icon}
                    />
                    <input placeholder='CPF' className={styles.search_field} />
                </div>
                <div className={styles.menu_actions_container}>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='3x'
                        className={styles.create_button}
                    />
                    <div className={styles.change_pages}>
                        <FontAwesomeIcon
                            icon={faArrowCircleLeft}
                            size='xs'
                            className={styles.change_page_button}
                        />
                        <FontAwesomeIcon
                            icon={faArrowCircleRight}
                            size='xs'
                            className={styles.change_page_button}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientListMenu;
