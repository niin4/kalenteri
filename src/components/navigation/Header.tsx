import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import { auth } from '../../utils/firebase';
import { useAppSelector } from '../../store/hooks';

const Header: React.FC = () => {
  const user = useAppSelector(state => state.user.currentUser);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/secrets">Secrets</Link>
      {user ?
        <Button text={'Log out'} onClick={() => auth.signOut()} /> :
        <Link to="/login">Login and register!</Link>}
    </nav>)
}

export default Header;
