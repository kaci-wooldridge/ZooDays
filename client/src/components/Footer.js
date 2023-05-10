import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <span className="text-muted">© {new Date().getFullYear()} ZooDays Inc.</span>
            </div>
        </footer>
    );
}

export default Footer;
