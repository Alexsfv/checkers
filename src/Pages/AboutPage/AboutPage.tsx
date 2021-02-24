import React from 'react'
import { Link } from 'react-router-dom'
import './AboutPage.scss'

type AboutPageProps = {}

const AboutPage: React.FC<AboutPageProps> = () => {

    return (
        <>
            <p className="about-title">Разрабочтик <b>Alexsfv</b></p>
            <div className="about-links">
                <p className="about-links__item">
                    <span>GitHub:</span>
                    <a href="https://github.com/Alexsfv" target="_blank">Alexsfv</a>
                </p>
            </div>
        </>
    )
}

export default AboutPage