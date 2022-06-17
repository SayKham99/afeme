// Import => React
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// Import useContext => Localization
import { Context } from "../../Context/LangContext";
import { Context as CurrencyContext } from "../../Context/CurrencyContext";

// Import => Mui
import { IconButton, Tooltip, Button, Grow, Badge, MenuItem, Box, Menu, Avatar, Typography } from "@mui/material";
import Select from "@mui/material/Select";

// Import => Components
import flagUz from "../../Assets/Img/Icon/uz.svg";
import flagRu from "../../Assets/Img/Icon/ru.svg";
import flagEn from "../../Assets/Img/Icon/en.svg";
import logo from "../../Assets/Img/logo.svg";
import notificationIcon from "../../Assets/Img/notification.svg";
import loveIcon from "../../Assets/Img/love.svg";
import locationIcon from "../../Assets/Img/location.svg";
import plusIcon from "../../Assets/Img/plus.svg";
import Container from "../Container/Container";
import Modal from "../ModalAuthorization/Modal";
import "../ModalAuthorization/Modal.scss";
import "../Header/Header.scss";
import Nav from "../Nav/Nav";
import content from "../../Localization/Content";

import { getCookie, setCookie } from "../../Utils/cookies";

function Header() {
    const elModal = React.useRef();
    const elHeader = React.useRef();

    const [token, setToken] = useState(localStorage.getItem("Token") || null);
    const { lang, setLang } = useContext(Context);
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const currencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const profile = (
        <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile picture" src={flagEn} sx={{width: '36px', height: '36px'}} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href="#">My Profile</a></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href="#">My Adverts</a></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href="#">Main menu</a></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href="#">Log out</a></Typography>
                </MenuItem>
            </Menu>
        </Box>
    );

    const loginBtn = (
        <Button
            className="btn header__button login__btn modal-dialog modal-dialog-scrollable"
            variant="text"
            sx={{ ml: 2, py: 1.5, px: 2.5 }}
            onClick={() => {
                elModal.current.classList.add(
                    "modal--open"
                );
                elModal.current.classList.add(
                    "modal--style"
                );
            }}
        >
            {content[lang].fromBtn}
        </Button>
    );

    return (
        <>
            <header className="header" ref={elHeader}>
                <Container>
                    <div className="header__content">
                        <div className="header__logo">
                            <NavLink
                                to={"/Afeme"}
                                className="header__logo-link"
                            >
                                <img
                                    className="header__logo-img"
                                    src={logo}
                                    alt="logo"
                                />
                            </NavLink>

                            <Tooltip
                                className="icon__btn"
                                title="Joylashuvingiz"
                                arrow
                                TransitionComponent={Grow}
                            >
                                <Button
                                    className="btn header__location"
                                    variant="text"
                                    sx={{ py: 1, px: 1.2, ml: 1.5 }}
                                >
                                    <img
                                        src={locationIcon}
                                        alt="location-img"
                                        className="header__location-img"
                                    />
                                    Uzbekistan
                                </Button>
                            </Tooltip>
                        </div>
                        <Nav elHeader={elHeader} />
                        <div className="header__items">
                            <div className="header__icons-nav">
                                <IconButton
                                    color="primary"
                                    className="lang__changer"
                                >
                                    <Select
                                        className="header__select header__select-lang"
                                        value="lang"
                                        defaultValue={lang}
                                        onChange={(evt) =>
                                            setLang(evt.target.value)
                                        }
                                    >
                                        <MenuItem value="uz">
                                            <img
                                                className="header__select-img"
                                                src={flagUz}
                                            />
                                            O'zbekcha
                                        </MenuItem>
                                        <MenuItem value="en">
                                            <img
                                                className="header__select-img"
                                                src={flagEn}
                                            />
                                            English
                                        </MenuItem>
                                        <MenuItem value="ru">
                                            <img
                                                className="header__select-img"
                                                src={flagRu}
                                            />
                                            Русский
                                        </MenuItem>
                                    </Select>
                                </IconButton>

                                <Tooltip
                                    className="icon__btn"
                                    title="Your Loves"
                                    arrow
                                    TransitionComponent={Grow}
                                >
                                    <NavLink to={"/liked"}>
                                        <IconButton color="primary">
                                            <Badge
                                                badgeContent={2}
                                                color="error"
                                            >
                                                <img
                                                    src={loveIcon}
                                                    alt=""
                                                    className="header__icon nav__love"
                                                />
                                            </Badge>
                                        </IconButton>
                                    </NavLink>
                                </Tooltip>
                                <IconButton
                                    color="primary"
                                    className="currency__changer"
                                >
                                    <Select
                                        className="header__select select__currency"
                                        value="currency"
                                        defaultValue={currency}
                                        onChange={currencyChange}
                                    >
                                        <MenuItem value="sum">
                                            So'm (uzs)
                                        </MenuItem>
                                        <MenuItem value="usd">
                                            Dollar (usd)
                                        </MenuItem>
                                    </Select>
                                </IconButton>
                            </div>
                            <div className="header__buttons" sx={{ ml: 3 }}>
                                <NavLink to={"/advertPage"}>
                                    <Button
                                        className="btn header__button add__advert"
                                        variant="contained"
                                        sx={{ py: 1, px: 1.5 }}
                                    >
                                        <img src={plusIcon} alt="" />
                                        {content[lang].add}
                                    </Button>
                                </NavLink>
                                {/* If User have Account show profile else Show Login */}
                                {token ? profile : loginBtn}
                            </div>
                        </div>
                        <button
                            className="header__menu-btn"
                            onClick={() => {
                                elHeader.current.classList.add("header--open");
                            }}
                        >
                            /
                        </button>
                    </div>
                </Container>
            </header>
            <Modal elModal={elModal} />
        </>
    );
}
export default Header;
