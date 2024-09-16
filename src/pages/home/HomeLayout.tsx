import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import backImage from '../../assets/back.jpg';
import { styled, Box } from '@mui/material';
import { Footer } from '../../components/common/Footer';
import MainHome from './MainHome';
import TuitionList from '../tuitionslist/TuitionList';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
}));

const HomeLayout = () => {
    return (
        <MainWrapper>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '55vh',
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}
            />

            <PageWrapper className="page-wrapper">
                <Navbar />
                <Box
                    sx={{
                        minHeight: 'calc(100vh - 170px)',
                        pt: { xs: 10, sm: 15 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <MainHome />
                    <TuitionList />
                </Box>
                <Footer />
            </PageWrapper>
        </MainWrapper>
    );
};

export default HomeLayout;
