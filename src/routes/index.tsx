import { Routes, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';

export function IsRoutes(){
  return(
  <Routes>
    <Route path="/"  element={<Dashboard />} />
  </Routes>
)
};
