import useWindowSize from '@charlietango/use-window-size';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../../common/Button';
import { DelayLink } from '../../../common/DelayLink';
import NavList from '../../../common/NavList';
import thinkboungLogo from '../../../icons/thinkbound.png';
import logoD from '../../../images/logo/logo.png';
import { MobileNavButtonContext } from '../../../providers/MobileNavButtonProvider';
import Burger from './../../../common/icons/Burger';

const RelativeLink = (url) => {
    //console.log(label);
    if (!url) return undefined
  
    let WPURL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
    let string = url
  
    if (string.startsWith(`/`)) return string
  
    if (string.match(WPURL)) {
      string = string.replace(WPURL, "")
      return string
    }
    return string
}

export default function Header({ HeaderData, togglePopup, handleHover, handleLeave, headerRef }) {
    const {width} = useWindowSize();
    let mobileScreen = width < 990;
    const [mobileButtonShow, setMobileButtonShow] = useState(false);
    const [mobileMenuTl, setMobileMenuTl] = useState(null);
    let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);

    const router = useRouter()
    const { pathname } = router;
    const currentPage = pathname.split('/')[1];


    const menu = useRef(null);


    function handleMobileButtonShow() {
        if (width < 990) {
            setMobileButtonShow(true);
        } else {
            setMobileButtonShow(false);
        }
    }
    
    let onMobileMenuClick = () => {
        if (mobileMenuShow) {
            mobileMenuTl.timeScale(1.3);
            mobileMenuTl.reverse();
        } else {
            setMobileMenuShow(true);
            mobileMenuTl.timeScale(1);
            mobileMenuTl.play();
        }
    };

    useEffect(() => {

        if (mobileScreen && !mobileMenuTl) {
            setMobileMenuTl(initMobileMenuTl(menu.current, mobileMenuShow, setMobileMenuShow));
        }

        handleMobileButtonShow();
        window.addEventListener('resize', handleMobileButtonShow);
        return () => {
            window.removeEventListener('resize', handleMobileButtonShow);
        };
    }, [mobileScreen, mobileMenuShow, mobileMenuTl, setMobileMenuShow]);

    const flatListToHierarchical = (
		data = [],
		{ idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
	) => {
		const tree = [];
		const childrenOf = {};
		data.forEach(item => {
			const newItem = { ...item };
			const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
			childrenOf[id] = childrenOf[id] || [];
			newItem[childrenKey] = childrenOf[id];
			parentId
				? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
				: tree.push(newItem);
		});
		return tree;
	};
	const primaryMenu = flatListToHierarchical(HeaderData?.menus?.nodes[0]?.menuItems?.nodes);

    return (
        <header className={"header" + (currentPage ? "" : " header--main")} ref={headerRef} id="header">
            <div className="header__wrapper container container--header">
                <DelayLink to="/" className="logo" onMouseOver={handleHover} onMouseLeave={handleLeave}>
                    <div className="logo__image">
                        <Image src={HeaderData?.getHeader?.siteLogoUrl || logoD} alt="Logo" width={371} height={82} />
                    </div>
                </DelayLink>
                <div className={"header__menu" + (mobileMenuShow ? " opened" : "")} style={{height: `${!mobileMenuShow ? 0 : '100%'}`}} ref={menu}>
                    <div className="header__menu-wrapper">
                        <ul className="header__menu-list">
                            {primaryMenu.map((item) => {
                                return (
                                    <NavList item={item} key={item.id} currentPage={currentPage} handleHover={handleHover} handleLeave={handleLeave} />
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <Button type='button' icon={thinkboungLogo} className="header__button" text="Start Project" onClick={togglePopup} />
                {mobileButtonShow ?
                    <button className={"header__mobile-button" + (mobileMenuShow ? " opened" : "")} onClick={onMobileMenuClick}>
                        <Burger className="header__mobile-icon" />
                    </button> : null}
            </div>
        </header>
    )
}

function initMobileMenuTl(menu, mobileMenuShow, setMobileMenuShow) {

    let tl = gsap.timeline({
        defaults: {
            ease: 'Power4.out'
        },
        paused: true,
        onReverseComplete: () => {
            setMobileMenuShow(false);
        }
    })
        .to(menu, {
            height: '100%'
        })
        .add(
            gsap.timeline({
                defaults: {
                    stagger: 0.1
                }
            })
        )

    return tl;
}