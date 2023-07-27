import Accueil from './pages/accueil/Accueil';
import Captation from './pages/captation/Captation';
import Dashboard from './pages/dashboard/Dashboard';
import Editorial from './pages/editorial/Editorial';
import Login from './pages/login/Login';
import PostProduction from './pages/post_production/PostProduction';
import Profil from './pages/profil/Profil';
import Programmation from './pages/programmation/Programmation';
import Publication from './pages/publication/Publication';

const routes = [
  {
    path: '/',
    label: 'Accueil',
    component: Accueil
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    label: 'Login',
    component: Login
  },
  {
    path: '/profil',
    label: 'Profil',
    component: Profil
  },
  {
    path: '/programmation',
    label: 'Programmation',
    component: Programmation
  },
  {
    path: '/publication',
    label: 'Publication',
    component: Publication
  },
  {
    path: '/editorial',
    label: 'Editorial',
    component: Editorial
  },
  {
    path: '/captation',
    label: 'Captation',
    component: Captation
  },
  {
    path: '/post-production',
    label: 'PostProduction',
    component: PostProduction
  },
];

export default routes;

