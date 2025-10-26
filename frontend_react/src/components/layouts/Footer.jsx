import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>Fashion Cloth Website</h5>
                        <p>
                            Your one-stop destination for the latest fashion trends and stylish clothing collections.
                        </p>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/upload" className="text-white text-decoration-none">Upload</Link></li>
                            <li><Link to="/cart" className="text-white text-decoration-none">Cart</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h5>Account</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/profile" className="text-white text-decoration-none">Profile</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                            <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Contact Us</h5>
                        <address>
                            <p>Email: info@fashioncloth.com</p>
                            <p>Phone: +1 (123) 456-7890</p>
                            <p>Address: 123 Fashion Street, Style City</p>
                        </address>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <hr className="bg-secondary" />
                        <p>&copy; {new Date().getFullYear()} Fashion Cloth Website. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}