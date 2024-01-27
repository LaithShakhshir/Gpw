


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Signinsignup from './pages/Signinsignup/Signinsignup';
import Visiter from './pages/visiter/Visiter';
import CreateVisiter from './pages/visiter/create/Create';
import ReadVisiter from './pages/visiter/read/Read';
import EditVisiter from './pages/visiter/edit/Edit';
import Prisoners from './pages/prisoners/Prisoners';
import Readprisoners from './pages/prisoners/read/Read';
import Editprisoners from './pages/prisoners/edit/Edit';
import Createprisoners from './pages/trip/create/Create';
import Createvisit from './pages/visit/create/Create';
import EditVisit from './pages/visit/edit/Edit';
import Readvisit from './pages/visit/read/Read';
import Visit from './pages/visit/Visit';
import Emergency from './pages/emergency-notice/Emergency';
import Messenger from './pages/messenger/Messenger';
import Proofpapers from './pages/proofpapers/Proofpapers';
import ChatWrapper from './pages/chat/ChatWrapper';
import Addvisiter from './components/addvisiter/Addvisiter';
import Trip from './pages/trip/Prisoners';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Switch>
            <Route path="/visiter/create">
              <CreateVisiter />
            </Route>

            <Route path="/visiter/read/:id" render={({ match }) => (
              <ReadVisiter id={match.params.id} />
            )} />

            <Route path="/visiter/edit/:id" render={({ match }) => (
              <EditVisiter id={match.params.id} />
            )} />

            <Route path="/visiter">
              <Visiter />
            </Route>

            <Route path="/visit/create">
              <Createvisit />
            </Route>

            <Route path="/visit/read/:id" render={({ match }) => (
              <Readvisit id={match.params.id} />
            )} />

            <Route path="/visit/edit/:id" render={({ match }) => (
              <EditVisit id={match.params.id} />
            )} />

            <Route path="/visit">
              <Visit />
            </Route>

            <Route path="/prisoners/read/:id" render={({ match }) => (
              <Readprisoners id={match.params.id} />
            )} />

            <Route path="/prisoners/edit/:id" render={({ match }) => (
              <Editprisoners id={match.params.id} />
            )} />

            <Route path="/prisoners/create">
              <Createprisoners />
            </Route>

            <Route path="/prisoners">
              <Prisoners />
            </Route>
            <Route path="/trip">
              <Trip />
            </Route>

            <Route path="/profile/:id">
              <Profile />
            </Route>

            <Route path="/messenger">
              <Messenger />
            </Route>

            <Route path="/login">
              <Signinsignup />
            </Route>

            <Route path="/register">
              <Signinsignup />
            </Route>

            <Route path="/emergency">
              <Emergency />
            </Route>

            <Route path="/proofpapers">
              <Proofpapers />
            </Route>
            <Route path="/Addvisiter">
              <Addvisiter/>
            </Route>
            <Route path="/">
              <Home />
              {/* <Addvisiter/> */}
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
