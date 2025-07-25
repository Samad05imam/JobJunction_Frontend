// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Navbar from './components/shared/Navbar';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import Home from './components/Home';
// import Jobs from './components/Jobs';
// import Browse from './components/Browse';
// import Profile from './components/Profile';
// import JobDescription from './components/JobDescription';
// import Companies from './components/admin/Companies';
// import CompanyCreate from './components/admin/CompanyCreate';
// import CompanySetUp from './components/admin/CompanySetUp';
// import AdminJobs from './components/admin/AdminJobs';
// import PostJob from './components/admin/PostJob';
// import Applicants from './components/admin/Applicants';
// import ProtectedRoute from './components/admin/ProtectedRoute'; // ✅ Correct casing

// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/jobs',
//     element: <Jobs />,
//   },
//   {
//     path: '/description/:id',
//     element: <JobDescription />,
//   },
//   {
//     path: '/browse',
//     element: <Browse />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/signup',
//     element: <Signup />,
//   },
//   {
//     path: '/profile',
//     element: <Profile />,
//   },

//   // ✅ Admin Routes
//   {
//     path: '/admin/companies',
//     element: 
//     (
//      <ProtectedRoute>
//         <Companies />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/admin/company/create',
//     element: 
//     (
//       <ProtectedRoute>
//         <CompanyCreate />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/admin/companies/:id',
//     element: 
//     (
//       <ProtectedRoute>
//         <CompanySetUp />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/admin/jobs',
//     element: 
//     (
//       <ProtectedRoute>
//         <AdminJobs />
//      </ProtectedRoute>
//    ),
//   },
//   {
//     path: '/admin/job/create',
//     element: 
//     (
//       <ProtectedRoute>
//         <PostJob />
//       </ProtectedRoute>
//     ), 
//   },
//   {
//     path: '/admin/jobs/:id/applicants',
//     element: 
//     (
//       <ProtectedRoute>
//         <Applicants />
//       </ProtectedRoute>
//     ),
//   },
// ]);

// function App() {
//   return <RouterProvider router={appRouter} />;
// }

// export default App;


import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/jobs",
        element:<Jobs/>
    },
    {
        path:"/description/:id",
        element:<JobDescription />
    },
    {
        path:"/browse",
        element:<Browse/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    
    // For Admin
    {
        path:"/admin/companies",
        element:<ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
        path:"/admin/company/create",
        element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
    },
    {
        path:"/admin/companies/:id",
        element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
    },
    {
        path:"/admin/jobs",
        element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
        path:"/admin/job/create",
        element:<protectedRoute><PostJob/></protectedRoute>
    },
    {
        path:"/admin/jobs/:id/applicants",
        element:<protectedRoute><Applicants/></protectedRoute>
    },
    
])

function App() {
    return (

        <>
        <RouterProvider router= {appRouter} />
        </>

    )
}

export default App


