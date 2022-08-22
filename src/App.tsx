import React from 'react';
import LoginPage from "./component/loginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserPage from "./component/UserPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage />}/>
                <Route path={'/user/:id'} element={<UserPage />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;