import {connect} from 'react-redux'
import Switch from "react-switch";
import PacmanLoader from "react-spinners/PacmanLoader"; 
import axios from 'axios'
import './index.css'

function ScraperSwitch( { pending, setPending, setSuccess, setData }) {
   
    const handleChange = () => {
        setPending()
        axios.post("/scraper", pending)
            .then((res) => {
                setData(res.data);
                setSuccess()
            })
        .catch(err => console.log(err))
    }

    return (
        <div className="switch-class">
            <h3 className="text-center white-text">Scrape Here!</h3>

            <label htmlFor="react-switch">
            <Switch
                checked={pending}
                onChange={handleChange}
                onColor="#D6D84F"
                onHandleColor="#D6D84F"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
            />
            </label>
            <div className="loader-class">
                <PacmanLoader
                    size={20}
                    color={"#D6D84F"}
                    loading={pending}
                />
            </div>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        pending:state.scraper.pending    
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
        setData : (data) => dispatch({
            type : "SET_DATA",
            payload: data
        }),
}}

export default connect(mapStateToProps, mapDispactToProps)(ScraperSwitch);