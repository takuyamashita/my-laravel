import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';


class CalenderSelectHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const monthItems = [];
        const dateItems = [];
        const lastDayOfMonth = new Date(this.props.year,this.props.month,0).getDate();
        for(let i = 0;i < 12;i ++){
            monthItems.push(<a key={i} className="dropdown-item" data-key="month" data-value={i}>{`${i+1} 月`}</a>);
        }
        for(let i = 1;i <= lastDayOfMonth; i ++){
            dateItems.push(<a key={i} className="dropdown-item" data-key="date" data-value={i}>{`${i} 日`}</a>);
        }
        return (
            <div onClick={this.props.selectDate} className="mb-3 d-flex justify-content-around" style={{minWidth:'60%'}}>

                <div className="btn-group">
                    <button className="btn btn-outline-secondary" type="button" data-key="back">{`<<`}</button>
                </div>

                <div className="btn-group">
                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.year}
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</a>
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear()}>{new Date().getFullYear()}</a>
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</a>
                        </div>
                    </div>

                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.month + 1}
                        </button>
                        <div className="dropdown-menu">
                            {monthItems}
                        </div>
                    </div>

                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.date}
                        </button>
                        <div className="dropdown-menu overflow-auto" style={{maxHeight:'70vh'}}>
                            {dateItems}
                        </div>
                    </div>
                </div>

                <div className="btn-group">
                    <button className="btn btn-outline-secondary" type="button" data-key="next">{`>>`}</button>
                </div>

            </div>
        );
    }
}

export default withRouter(CalenderSelectHeader);