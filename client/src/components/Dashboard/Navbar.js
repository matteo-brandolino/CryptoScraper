import { useState } from 'react'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact'
import {useLocation} from "react-router-dom";

function Navbar({ logout }) {
    const location = useLocation();
    console.log(location.pathname);
    const [state, setState] = useState({
        collapse: false,
      })

    const onClick = () => {
        setState({
          collapse: !state.collapse,
        });
    }

    const handleLogout = e => {
        e.preventDefault()
        cookie.remove("token")
        logout()
    }

    return (
        <>
            <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
                <MDBNavbarBrand href="/">
                    <MDBIcon icon="hand-holding-usd" />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={onClick} />
                <MDBCollapse isOpen={state.collapse} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active={location.pathname==="/" && true }>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem  active={location.pathname==="/history" && true }>
                            <MDBNavLink to="/history">History</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink to="/" onClick={handleLogout}>Log Out</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch({
            type : "SET_LOGOUT"
        })
    }
}

export default connect(null, mapDispatchToProps)(Navbar);
