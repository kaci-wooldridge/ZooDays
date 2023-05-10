import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { logout } from '../modules/authManager';

export default function Header({ isLoggedIn, user }) {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar className="nav-bar" expand="md">
                {isLoggedIn &&
            <>
              <NavbarBrand href="/" className="img">
                <img className="logo-img" src={require('../images/logo3.jpg')} />
              </NavbarBrand>


            <NavbarToggler onClick={toggleNavbar} className="me-2" />
                    <Collapse isOpen={!collapsed} navbar>
              <Nav className="ms-auto nav-items" navbar>
                <NavItem className="nav-item">
                                <NavLink href="/animals">Animals</NavLink>
                            </NavItem>
                <NavItem className="nav-item">
                                <NavLink href="/activities">Activities</NavLink>
                            </NavItem>
                <NavItem className="nav-item">
                                <NavLink href="/restaurants">Restaurants</NavLink>
                </NavItem>
                <NavItem className="nav-item">
                  <NavLink href="/schedules">Plan Your Visit</NavLink>
                </NavItem>
                <NavItem className="nav-item">
                                <NavLink onClick={logout} href="/login">Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>

                    </>
                }
                {!isLoggedIn &&
                    <>
              <NavbarBrand href="/" className="img">
              <img src={require('../images/logo3.jpg')} className="logo-img" />
              </NavbarBrand>
                    </>
                }
            </Navbar>
        </div>
    );    
}


{/* <nav class="navbar navbar-expand-lg navbar-dark gradient-custom">
  <div class="container-fluid">
        <a class="navbar-brand" href="/">ZooDays</a>

    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-bars text-light"></i>
    </button>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
              <i class="fas fa-home fa-lg mb-1"></i>
            </div>
            Home
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link" href="#!">
            <div>
              <i class="far fa-envelope fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-dark">11</span>
            </div>
            Link
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link disabled" aria-disabled="true" href="#!">
            <div>
              <i class="far fa-envelope fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-dark">11</span>
            </div>
            Disabled
          </a>
        </li>
        <li class="nav-item dropdown text-center mx-2 mx-lg-1">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown"
            aria-expanded="false">
            <div>
              <i class="far fa-envelope fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-dark">11</span>
            </div>
            Dropdown
          </a>

          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link" href="#!">
            <div>
              <i class="fas fa-bell fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-dark">11</span>
            </div>
            Messages
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link" href="#!">
            <div>
              <i class="fas fa-globe-americas fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-dark">11</span>
            </div>
            News
          </a>
        </li>
      </ul>


    </div>

  </div>

</nav> */}



