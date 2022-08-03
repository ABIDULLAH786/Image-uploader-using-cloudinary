import React from 'react';
import Upload from './components/Upload.js';
// import Home from './pages/Home.js';
function App() {
    return (
        <div className="container">

            <nav className="nav mb-5 ">
                <div className="nav-brand"><b>IMAGE UPLOADER</b></div>

            </nav>
            <Upload />
            <div>
                <span><b className="text-danger">Warning:</b> The link you will get your image will be temprary,<br /> it could be removed after 24 hours or 1-week</span>
            </div>
        </div>
    );
}

export default App;
