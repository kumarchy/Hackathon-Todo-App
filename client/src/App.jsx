import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import TaskAddPage from './page/TaskAddPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/add-task" element={<TaskAddPage />} />
    </Routes>
  );
}

export default App;
