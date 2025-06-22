import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useWindowSize from '@/utils/hooks/useWindowSize';
import SideBar from './SiderBar';
import Header from './Header';
import {goToPageSuccess, handleSetIsShowSideBar} from '@/states/modules/app';
import {getNotification, isTokenExpired} from '@/utils/helper.js';
import {getAuthToken} from '@/utils/localStorage';

function MainLayout(props) {
    const { children } = props;
    const isShowSideBar = useSelector(state => state.app.isShowSideBar);
    const goToPage = useSelector(state => state.app.goToPage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const windowSize = useWindowSize()
    const token = getAuthToken()

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);

    useEffect(() => {
        if (windowSize.width <= 1200) {
            setTimeout(() => dispatch(handleSetIsShowSideBar(false)))
        } else {
            setTimeout(() => dispatch(handleSetIsShowSideBar(true)))
        }
    }, [windowSize.width])

    useEffect(() => {
        if (isTokenExpired(token)) {
            getNotification("error", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
            navigate("/login");
        }
    }, [token]);

    return (
        <div className={`${styles.boxMainLayout}`}>
            <div className={styles.headerBox}></div>
            <div className={styles.mainLayoutWrap}>
                <SideBar isShowSideBar={isShowSideBar}/>
                <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
                    <Header isShowSideBar={isShowSideBar}/>
                    <main className={styles.mainContentWrap}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
