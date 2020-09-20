import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
    return (
        <div className='navbar'>
            <div className='menu-elements-left'>
                <FontAwesomeIcon
                    icon={faBars}
                    size='2x'
                    color='white'
                    className='menu-icon'
                />
            </div>

            <div className='menu-elements-right'>
                <span className='menu-text current-selected'>PACIENTES</span>
                <span className='menu-text'>AGENDA</span>
                <div className='pling-logo-container'>
                    <a href='https://pling.net.br/'>
                        <div className='pling-logo'></div>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Navbar;
