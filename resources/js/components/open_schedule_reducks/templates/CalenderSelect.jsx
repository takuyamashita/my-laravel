import React from 'react';


export default class CalenderSelect extends React.Component{

    render(){
        const monthItems = [];
        const dateItems = [];
        const year = this.props.selectedDate.getFullYear();
        const month = this.props.selectedDate.getMonth();
        const lastDayOfMonth = new Date(year,month + 1,0).getDate();
        for(let i = 0;i < 12;i ++){
            monthItems.push(<a key={i} className="dropdown-item" data-key="month" data-value={i}>{`${i+1} 月`}</a>);
        }
        for(let i = 1;i <= lastDayOfMonth; i ++){
            dateItems.push(<a key={i} className="dropdown-item" data-key="date" data-value={i}>{`${i} 日`}</a>);
        }
        return (
            <div onClick={this.selectDate.bind(this)} className="mb-3 d-flex justify-content-around" style={{minWidth:'60%'}}>

                <div className="btn-group">
                    <button className="btn btn-outline-secondary" type="button" data-key="back">{`<<`}</button>
                </div>

                <div className="btn-group">
                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {year}
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</a>
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear()}>{new Date().getFullYear()}</a>
                            <a className="dropdown-item" data-key="year" data-value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</a>
                        </div>
                    </div>

                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {month + 1}
                        </button>
                        <div className="dropdown-menu">
                            {monthItems}
                        </div>
                    </div>

                    <div className="btn-group mx-2">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.selectedDate.getDate()}
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

    selectDate(ev){
        const date = new Date(
            this.props.selectedDate.getFullYear(),
            this.props.selectedDate.getMonth(),
            this.props.selectedDate.getDate(),
        );
        if((ev.target.dataset.key)){
            switch (ev.target.dataset.key){
                case ('date'):
                    date.setDate(Number(ev.target.dataset.value));
                    break;
                case ('month'):
                    date.setMonth(Number(ev.target.dataset.value));
                    break;
                case ('year'):
                    date.setFullYear(Number(ev.target.dataset.value));
                    break;
                case ('next'):
                    date.setDate(date.getDate() + 7);
                    break;
                case ('back'):
                    date.setDate(date.getDate() - 7);
                    break;
            }
        }
        this.props.actions.setCalenderFrom(date);
    }

}