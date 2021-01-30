import { MDBMask, MDBView } from 'mdbreact';
import Navbar from '../Dashboard/Navbar';
import DataTableHistory from './DataTableHistory';
import Card from 'react-bootstrap/Card'
import './index.css'
function History() {
  return (
      <div>
        <header>
          <Navbar />
          <MDBView src="https://images.pexels.com/photos/2068664/pexels-photo-2068664.jpeg?cs=srgb&dl=pexels-d%27vaughn-bell-2068664.jpg&fm=jpg">
            <MDBMask overlay="black-light mask-history" >
            <Card className="card-history">
                <Card.Body>
                    <DataTableHistory />
                </Card.Body>
            </Card>
            </MDBMask>
          </MDBView>
        </header>
      </div>
  )
}
export default History
