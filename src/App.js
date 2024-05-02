import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import Login from './components/Login'

import JobsPage from './components/JobsPage'

import JobDetails from './components/JobDetails'

import NotFound from './components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route exact path='/login' component={Login} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/jobs' component={JobsPage} />
      <ProtectedRoute exact path='/jobs/:id' component={JobDetails} />
      <Route path='/bad-path' component={NotFound} />
      <Redirect to='bad-path' />
    </Switch>
  </>
)

export default App
