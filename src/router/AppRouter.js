import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter'ı Router olarak adlandırmak yaygın bir yaklaşımdır
import Login from '../components/Login'; // Doğru yol
import Register from '../components/Register'; // Doğru yol

const AppRouter = () => {
    return (
        <Router> {/* Router olarak adlandırdık */}
            <div className="container">
                <Routes> {/* Switch yerine Routes kullanıyoruz */}
                    <Route path="/" element={<Login />} /> {/* component yerine element kullanıyoruz */}
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);
