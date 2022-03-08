import React, { useRef } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../animation';
import SlideIn from '../../../common/SlideIn';


const OurValues = ({title, values}) => {
    const valuesWrapper = useRef(null);

    return (
        <div className="about__wrapper">
            <h1 className="about__title about__title--values container">{title}</h1>
            <div className="about__values container" ref={valuesWrapper}>
                {values.map((value, index) => {
                    let lottie = {
                        loop: true,
                        autoplay: true,
                        animationData: animation[value.icon],
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        },
                    }
                    return (
                        <SlideIn opacity={1} delay={index / 9} className="about__value" key={index} trigger={valuesWrapper.current}>
                            <div className="about__value-wrapper">
                                <div className="about__value-icon-wrapper">
                                    <Lottie className="about__value-icon" options={lottie} />
                                </div>
                                <h3 className="about__value-title">{value.title}</h3>
                            </div>
                            <p className="about__value-text">{value.text}</p>
                        </SlideIn>
                    );
                })}
            </div>
        </div>
    )
}

export default OurValues
