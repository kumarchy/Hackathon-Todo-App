import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import TaskAddPage from './page/TaskAddPage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <Routes>
       <Route path="/login" element={<Login />} />

      <Route path="/" element={ <PrivateRoute> <MainLayout /> </PrivateRoute>} />
      <Route path="/add-task" element={<PrivateRoute> <TaskAddPage /> </PrivateRoute>} />
    </Routes>
  );
}

export default App;
