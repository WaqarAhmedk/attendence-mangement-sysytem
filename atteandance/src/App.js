import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Adminlogin from './adminpanel/adminlogin';
import Adminmainpage from './adminpanel/adminmainpage';
import Checkattendence from './adminpanel/checkattendnce';
import Reportofallusers from './adminpanel/reportofallusers';
import Viewallusers from './adminpanel/viewallusers';

import Homepage from './Homepage';
import Login from './userpanel/login';
import Mainpage from './userpanel/mainpage';
import Signup from './userpanel/signup';
import Viewattendence from './userpanel/viewattendence';
import Updateattendance from './adminpanel/addattendence';
import Approveleave from './adminpanel/leaveapproval';
import Singleuserreport from './adminpanel/singleuserreport';

function App() {
  return (
    <div className="App">




      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Homepage />} />

          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mainpage" element={<Mainpage />} />
          <Route exact path="/viewattendence" element={<Viewattendence />} />



          <Route exact path="/admin/login" element={<Adminlogin />} />

          <Route exact path="/admindashboard" element={<Adminmainpage />} />

          <Route exact path="/viewallusers" element={<Viewallusers />} />
          <Route exact path="/admin/generatereport" element={<Reportofallusers />} />
          <Route exact path="/admin/singleuserreport" element={<Singleuserreport />} />


          <Route exact path="/admin/approveleaves" element={<Approveleave />} />

          <Route exact path="/admin/checkallattendence" element={<Checkattendence />} />
          <Route exact path="/admin/updateattandence" element={<Updateattendance />} />



        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
