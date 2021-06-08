import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SecretsView from './views/Secrets';
import LoginView from './views/Login';
import Header from './components/navigation/Header';
import firebase, { auth, createUserProfileDocument } from './utils/firebase';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setCurrentUser } from './store/user/userSlice';
import { setKidsFromCollections } from './store/grid/gridSlice';
import MainView from '../src/views/Main';
import { BreakpointProvider, MediaQuery } from './utils/breakpoints';
import { getUserCollections } from './utils/firebase/collections';

function App() {

  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  const queries: MediaQuery = {
    sm: '(min-width: 480px)',
    md: '(min-width: 1024px)',
    lg: '(min-width: 1680px)',
    or: '(orientation: portrait)', // we can check orientation also
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);
        userRef?.onSnapshot((snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            email: snapshot.data()?.email,
            name: snapshot.data()?.name,
          }))
        })
      } else {
        dispatch(setCurrentUser(null))
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function fetchData() {
      const collections = await getUserCollections(user!.id);
      if (collections && collections.length > 0) {
        dispatch(setKidsFromCollections(collections));
      }
    }
    if (user) {
      fetchData();
    }
  }, [user, dispatch])

  return (
    <BreakpointProvider queries={queries}>
      {user?.name}
      <Header />
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route exact path="/login" render={() => user ? <Redirect to={'/'} /> : <LoginView />} />
        <Route path="/secrets" component={SecretsView} />
      </Switch>
    </BreakpointProvider>
  );
}

export default App;
