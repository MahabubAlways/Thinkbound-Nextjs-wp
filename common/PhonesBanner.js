import gsap from 'gsap/gsap-core';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import addToRefs from '../services/addToRefs';
import ParallaxBackground from './ParallaxBackground';
import SideText from './SideText';
import SlideIn from './SlideIn';


export default function PhonesBanner(props) {
    const phones = useRef([]);
    const phonesBanner = useRef(null);

    function initPhonesAnimation() {
        let tl = gsap.timeline({
            defaults: {
                ease: 'Power1.in'
            },
            scrollTrigger: {
                trigger: phonesBanner.current,
                start: 'center 80%',
            }
        })
        phones.current.forEach((phone, index) => {
            if (index === 0) {
                tl.to(phone, {
                    left: 0,
                }, 0)
            } else if (index === 2) {
                tl.to(phone, {
                    right: 0,
                }, 0)
            }
        });
    }

    useEffect(() => {
        initPhonesAnimation();
    }, []);

    const {sectionText, servicesTextSmall, title, description, images, sectionBg} = props

    return (
        <div className="banner banner--phones" id="phones-banner" ref={phonesBanner}>
            <ParallaxBackground image={sectionBg?.sourceUrl} className="banner__image-wrapper" />
            <div className="banner__wrapper container container--header">
                <SideText modificator="phones" wrapper="phones-banner">{sectionText}</SideText>
                <div className="banner__column banner__column--1">
                    <SlideIn setYPercent={100} toYPercent={0} trigger={phonesBanner.current} start="center 100%" className="banner__upper-title">{servicesTextSmall}</SlideIn>
                    <SlideIn setYPercent={100} toYPercent={0} trigger={phonesBanner.current} start="center 100%" className="banner__title">{title}</SlideIn>
                    <SlideIn setYPercent={100} toYPercent={0} trigger={phonesBanner.current} start="center 100%" className="banner__text">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </SlideIn>
                </div>
                <div className="banner__column banner__column--2">
                    {
                        images?.map((item, index) => {
                            return(
                                <div key={index} className="banner__image banner__image--1" ref={el => addToRefs(el, phones)}>
                                    <Image width={286} height={567} src={item.image.sourceUrl} alt={item.image.altText} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
