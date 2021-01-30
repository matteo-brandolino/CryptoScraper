import {connect} from 'react-redux'
import { MDBIcon } from 'mdbreact'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Moment from 'react-moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function LastestResults({ pending, data }) {
    return (
        <div>
            {data.length !== 0 && <h3 className={`text-center white-text pt-3 ${pending && 'mt-5'}`}>Lastest Results</h3>}
            <Row className="row-results">
            {
                data && data.map((result, idx) => (
                    <Col xs={12} xl={4} className="flex-center scraper-data mt-3" key={idx}>
                        <Card className="text-center" style={{ width: '25rem', height: "19rem" }} key={idx}>
                            <Card.Header>#{result._id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{result.exchange}</Card.Title>
                                <Card.Text>
                                Scraping from <a href={`/${result.url}`}>{ result.url }</a>
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <MDBIcon fab icon="bitcoin" /> BTC : {result.btcPrice} <MDBIcon icon="dollar-sign" />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <MDBIcon fab icon="ethereum" /> ETH : {result.ethPrice} <MDBIcon icon="dollar-sign" />
                                    </ListGroupItem>
                            </ListGroup>
                            <Card.Footer className="text-muted"><Moment fromNow>{result.date}</Moment></Card.Footer>
                        </Card>
                    </Col>
                ))
            }
            </Row>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        data:state.scraper.data,
        pending:state.scraper.pending    
    }
}

export default connect(mapStateToProps)(LastestResults);
