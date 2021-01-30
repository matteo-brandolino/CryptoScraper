import React from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Navbar from './Navbar';
import ScraperSwitch from './ScraperSwitch'
import LastestResults from './LastestResults';

function Dashboard() {
  return (
      <div>
        <header>
          <Navbar />
          <MDBView src="https://images.pexels.com/photos/2068664/pexels-photo-2068664.jpeg?cs=srgb&dl=pexels-d%27vaughn-bell-2068664.jpg&fm=jpg">
            <MDBMask overlay="black-light" >
              <ScraperSwitch />
              <LastestResults />
            </MDBMask>
          </MDBView>
        </header>
      </div>
  )
}
export default Dashboard

