import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import {connect} from 'react-redux'
import axios from 'axios'

const DataTableHistory = ({ pending, setPending, setSuccess, setHistory, history }) => {

    const getHistory = () => {
        setPending()
        axios.get("/history")
            .then((res) => {
                setHistory(res.data);
                setSuccess()
            })
        .catch(err => console.log(err))
    }

    const data = {
        columns: [
        {
            label: 'Exchange',
            field: 'exchange',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Bitcon Price',
            field: 'btcPrice',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Ethereum Price',
            field: 'ethPrice',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Date',
            field: 'date',
            sort: 'asc',
            width: 150
        },
        ],
        rows: history
    };

    useEffect(() => {
        getHistory()
        // eslint-disable-next-line
    }, [])

  return (
    <MDBDataTable
        entries={10} 
        entriesOptions={[ 5,10]}
        striped
        bordered
        small
        data={data}
    />
  );
}

const mapStateToProps = state => {
    return {
        pending:state.scraper.pending,
        history:state.scraper.history
    }
}
const mapDispactToProps = dispatch => {
    return {
        setPending : () => dispatch({
            type : "SET_PENDING"
        }),
        setSuccess : () => dispatch({
            type : "SET_SUCCESS"
        }),
        setHistory : (data) => dispatch({
            type : "SET_HISTORY",
            payload: data
        }),
}}
export default connect(mapStateToProps,mapDispactToProps)(DataTableHistory);