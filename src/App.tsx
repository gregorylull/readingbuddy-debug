import { useEffect, useState } from 'react';
import './App.css';

import { Outlet } from 'react-router-dom';
import { ImageUpload } from './components/imageUpload/ImageUpload';
import { LatestImages } from './components/LatestImages/LatestImages';
import { config } from './configs/config';
import { useGetImagesQuery } from './app/apiSlice';

function App() {
    const { data: imagesData, isFetching } = useGetImagesQuery();

    return (
        <>
            <div className="main-container">

                <img src={`${config.imageUrl}/test1.png`} />

                {!!imagesData && <LatestImages />}

                <main className="main-body">
                    <Outlet />
                </main>

                <footer className="main-footer">Footer: {location.host} </footer>
            </div>
        </>
    );
}

export default App;
