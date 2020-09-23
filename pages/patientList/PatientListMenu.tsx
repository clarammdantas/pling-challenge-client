import React, { MouseEvent, useState } from 'react'
import Link from 'next/link'

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

type ChangePageFunction = (e: MouseEvent) => void;
type ToggleModal = () => void;

interface Props {
    changePageLeft: ChangePageFunction,
    changePageRight: ChangePageFunction,
    page: number,
    showModal: ToggleModal
}

const PatientListMenu: React.FC<Props> = ({
    changePageLeft,
    changePageRight,
    page,
    showModal
}) => {
    const [cpf, setCPF] = useState<string>('');

    const handleChange = (e) => {
        const value = e.target.value;

        setCPF(value);
    }
    return (
        <div className={styles.patient_list_menu_container}>
            <div className={styles.patient_list_menu}>
                <div className={styles.search_container}>
                    <Link href={`/patientByCPF/${cpf}.tsx`}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='xs'
                            className={styles.search_icon}
                        />
                    </Link>
                    <input onChange={handleChange} placeholder='CPF' className={styles.search_field} />
                </div>
                <div className={styles.menu_actions_container}>
                    <div onClick={showModal}>
                        <FontAwesomeIcon
                            icon={faPlusSquare}
                            size='3x'
                            className={styles.create_button}
                        />
                    </div>
                    <div className={styles.change_pages}>
                        <div className={styles.change_button_focus} onClick={changePageLeft}>
                            <Link href={`/patientList/${page}.tsx`}>
                                <FontAwesomeIcon
                                    icon={faArrowCircleLeft}
                                    size='xs'
                                    className={styles.change_page_button}
                                />
                            </Link>
                        </div>
                        <div className={styles.change_button_focus} onClick={changePageRight}>
                            <Link href={`/patientList/${page}.tsx`}>
                                <FontAwesomeIcon
                                    icon={faArrowCircleRight}
                                    size='xs'
                                    className={styles.change_page_button}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientListMenu;
