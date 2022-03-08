import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import Form from '../../../common/Form';
import SlideIn from '../../../common/SlideIn';
import thinkboungLogo from '../../../icons/thinkbound.png';
import animateTextLine from '../../../services/animateTextLine';
import Button from './../../../common/Button';

const ServiceBanner = ({title, text, images}) => {
    let banner = useRef(null);
    let textRef = useRef([]);

    useEffect(() => {
        animateTextLine(textRef.current);
    }, [])

    return (
        <div className="service__banner" ref={banner}>
            <div className="service__banner-wrapper container">
                <h1 className="service__banner-title service__banner-column service__banner-column--1">{title}</h1>
                <div className="line-text service__line-text service__line-text--banner service__banner-column service__banner-column--1">
                    {
                        text.map((item, index) => {
                            return(
                                <div key={index} className="line-text__row" ref={el => textRef.current.push(el)}>
                                    {item.text}
                                </div>
                            )
                        })
                    }
                </div>
                <ul className="service__tags service__banner-column service__banner-column--1">
                    {
                        images?.map((item, index) => {
                            return(
                                <li key={index} className="service__tag">
                                    <SlideIn opacity={1} trigger={banner.current} delay={0.3}>
                                        <div className="service__tag-image">
                                            <Image className="service__tag-image__item" src={item.image.sourceUrl} alt={item.image.altText} layout="fill" />
                                        </div>
                                    </SlideIn>
                                </li>
                            )
                        })
                    }

                </ul>
                <SlideIn opacity={1} trigger={banner.current} delay={0.7} className="service__banner-column service__banner-column--2">
                    <Form className="form--service" Button={<Button type="button" icon={thinkboungLogo} className="form__button" text="Start project" />} />
                </SlideIn>
            </div>
        </div>
    )
}

export default ServiceBanner
