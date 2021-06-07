import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SecretsView from './views/Secrets';
import LoginView from './views/Login';
import Header from './components/navigation/Header';
import firebase, { auth, createUserProfileDocument } from './utils/firebase';
import { useAppSelector, useAppDispatch} from './store/hooks';
import { setCurrentUser } from './store/user/userSlice';
 
const HomePage = () => (
  <div>
    <h2>Homepage</h2>
  </div>
)

function App() {

  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

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

  return (
    <>
      {user?.name}
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" render={() => user ? <Redirect to={'/'} /> : <LoginView />}/>
        <Route path="/secrets" component={SecretsView} />
      </Switch>
    </>
  );
}

export default App;
