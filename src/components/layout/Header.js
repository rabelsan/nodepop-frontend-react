import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { logout } from '../../api/auth';
import { ReactComponent as Icon } from '../../assets/wallapop.svg';
import './Header.css';
import Button from '../shared/Button';
import AuthContext from '../auth/context';

const Header = ({ className, ...props }) => {
  const { isLogged, onLogout } = useContext(AuthContext);
  return (
    <header className={classNames('header', className)} {...props}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="128" height="128" />
        </div>
      </Link>
      <nav className="header-nav">
        <Button
          as={Link}
          to="/advert/new"
          variant="primary"
          className="header-button"
        >
          New Advert
        </Button>
        {isLogged ? (
          <Button
            className="header-button"
            onClick={() => logout().then(onLogout)}
          >
            Log out
          </Button>
        ) : (
          <Button as={Link} to="/login" className="header-button">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
