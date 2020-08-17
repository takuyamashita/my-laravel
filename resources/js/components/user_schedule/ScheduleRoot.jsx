import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';


import ScheduleList from './ScheduleList';
import ScheduleMake from './ScheduleMake';

let csrf = '';

class ScheduleRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reservationColors:[],
            scheduleForm:{
                name:'',
                description:'',
                password_required:false,
                permit_required:false,
                schedule_passwords:[]
            },
            scheduleFormError:{
                name:'',
                description:'',
                password_required:'',
                permit_required:'',
                schedule_passwords:''
            },
            editTarget:'',
            schedules:[],
            creatings:[],
            targetName:''
        };
    }

    componentDidMount(){
        this.getSchedules();
        this.setReserVationColors();
    }

    changeFormValues(object){
        //object = {key,value}
        const target = this.state.scheduleForm;
        if(object[0] === 'password_required' && this.state.scheduleForm.schedule_passwords.length < 1){
            target['schedule_passwords'].push({
                schedule_password:'',
                colors:[1,2,3,4,5,6,7,8]
            });
            target[object[0]] = object[1];
        }else if(object[0] === 'schedule_password'){
            target['schedule_passwords'][object[1].currentTarget.dataset.index].schedule_password = object[1].target.value;
        }else{
            target[object[0]] = object[1];
        }
        this.setState({scheduleForm:target});
    }

    targetSelect(ev){
        this.setState({targetName:ev.currentTarget.dataset.name});
    }

    schedulePasswordButtonEvent(ev){
        const target = this.state.scheduleForm;
        const index = Number(ev.currentTarget.dataset.index);
        const targetIndex = target.schedule_passwords[index].colors.indexOf(Number(ev.currentTarget.dataset.id));
        if(targetIndex < 0){
            target.schedule_passwords[index].colors.push(Number(ev.currentTarget.dataset.id));
        }else{
            target.schedule_passwords[index].colors = target.schedule_passwords[index].colors.filter(id=>id !== Number(ev.currentTarget.dataset.id));
        }
        this.setState({scheduleForm:target});
    }

    addSchedulePassword(){
        const target = this.state.scheduleForm;
        target['schedule_passwords'].push({
            schedule_password:'',
            colors:[1,2,3,4,5,6,7,8]
        });
        this.setState({scheduleForm:target});
    }

    removeSchedulePassword(ev){
        const target = this.state.scheduleForm;
        target.schedule_passwords = target['schedule_passwords'].filter((password,i)=>Number(ev.currentTarget.dataset.index) !== i);
        if(target.schedule_passwords.length === 0) target.password_required = false;
        this.setState({scheduleForm:target});
    }

    validate(){
        let formHasError = 0;
        for(let key in this.state.scheduleForm){
            switch(key){
                case 'name':
                    let target = this.state.scheduleFormError;
                    let hasSameName = this.state.schedules.some(schedule=>{
                        return schedule.name === this.state.scheduleForm.name && schedule.hash_digest !== this.state.editTarget;
                    });
                    if(hasSameName){
                        target.name = '同じ名前の予約テーブルが有ります';
                        formHasError ++;
                    }else if(this.state.scheduleForm.name.length < 1){
                        target.name = '一文字以上を入力';
                        formHasError ++;
                    }else{
                        target.name = '';
                    }
                    this.setState({scheduleFormError:target});
                    break;
                case 'schedule_passwords':
                    if(this.state.scheduleForm.password_required){
                        let target = this.state.scheduleFormError;
                        const passwordArray = this.state.scheduleForm.schedule_passwords.map(passwordObject=>passwordObject.schedule_password);
                        if([...new Set(passwordArray)].length !== passwordArray.length ||
                        this.state.scheduleForm.schedule_passwords.filter(password=>password.schedule_password.length === 0).length > 0){
                            target.schedule_passwords = 'パスワードが設定されていないか、重複しています';
                            formHasError ++;
                        }else{
                            target.schedule_passwords = '';
                        }
                        this.setState({scheduleFormError:target});
                    }
                    break;
            }
        }
        if(formHasError === 0){
            this.setState({
                scheduleFormError:{
                    name:'',
                    description:'',
                    password_required:'',
                    permit_required:'',
                    schedule_passwords:''
                }
            });
        }
        return formHasError;
    }

    addCreatedSchedule(){
        this.setState({creatings:[this.state.scheduleForm.name].concat(this.state.creatings)});
        if(this.state.editTarget.length === 0){
            this.setState({
                schedules:this.state.schedules.concat([this.state.scheduleForm]),
            });
        }
        this.setState({
            editTarget:'',
            scheduleForm:{
                name:'',
                description:'',
                password_required:false,
                permit_required:false,
                schedule_passwords:[]
            },
            scheduleFormError:{
                name:'',
                description:'',
                password_required:'',
                permit_required:'',
                schedule_passwords:''
            }
        });
    }

    addCallback(json){
        if((json[0].hash_digest)){
            //成功
            this.setState({creatings:this.state.creatings.filter(scheduleName=>scheduleName !== json[0].name)});
            if(this.state.editTarget.length > 0){

            }else{
                const target = this.state.schedules.map(schedule=>{
                    if(schedule.name === json[0].name) return json[0];
                    return schedule;
                });
                this.setState({schedules:target});
            }
        }else{

        }
    }

    addErrorCallBack(error){
        location.href = '/myschedule';
    }

    getSchedules(){
        fetch('/schedules',{
            headers:{
                'Content-Type':"application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf_token"]').content
            },
            method: "GET",
            credentials: "same-origin",
        }).then(res=>{
            return res.json();
        }).then(res=>{
            this.setState({schedules:res});
        })
    }

    setReserVationColors(){
        fetch('/reservation/color',{
            headers:{
                'Content-Type':"application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf_token"]').content
            },
            method: "GET",
            credentials: "same-origin",
        }).then(res=>{
            return res.json();
        }).then(res=>{
            this.setState({reservationColors:res});
        })
    }

    editClick(schedule){
        this.setState({
            scheduleForm:{
                name:schedule.name,
                description:schedule.description,
                password_required:schedule.password_required,
                permit_required:schedule.permit_required,
                schedule_passwords:schedule.schedule_passwords.map(passwordObject=>{
                    return {
                        schedule_password:passwordObject.password,
                        colors:passwordObject.colors.map(color=>color.id)
                    };
                })
            },
            scheduleFormError:{
                name:'',
                description:'',
                password_required:'',
                permit_required:'',
                schedule_passwords:''
            },
            editTarget:schedule.hash_digest
        });
    }

    backClick(){
        if(this.state.editTarget.length === 0) return;
        this.setState({
            scheduleForm:{
                name:'',
                description:'',
                password_required:false,
                permit_required:false,
                schedule_passwords:[]
            },
            scheduleFormError:{
                name:'',
                description:'',
                password_required:'',
                permit_required:'',
                schedule_passwords:''
            },
            editTarget:''
        });
    }

    render(){
        return (
            <Router>
                <div className="mb-5">
                    <Route 
                        path="/myschedule"
                        exact
                        exact
                        render={ props => <ScheduleList
                                schedules={this.state.schedules}
                                creatings={this.state.creatings}
                                targetName={this.state.targetName}
                                targetSelect={this.targetSelect.bind(this)}
                                editClick={this.editClick.bind(this)}
                                {...props}
                            /> }
                    />
                    <Route
                        path="/myschedule/make/"
                        exact 
                        render={ props => <ScheduleMake 
                                addCreatedSchedule={this.addCreatedSchedule.bind(this)}
                                formMethod={this.changeFormValues.bind(this)} 
                                validate={this.validate.bind(this)} 
                                addCallback={this.addCallback.bind(this)}
                                addErrorCallBack={this.addErrorCallBack.bind(this)}
                                schedulePasswordButtonEvent={this.schedulePasswordButtonEvent.bind(this)}
                                addSchedulePassword={this.addSchedulePassword.bind(this)}
                                removeSchedulePassword={this.removeSchedulePassword.bind(this)}
                                backClick={this.backClick.bind(this)}
                                editTarget={this.state.editTarget}
                                reservationColors={this.state.reservationColors}
                                state={this.state.scheduleForm} 
                                scheduleFormError={this.state.scheduleFormError} 
                                {...props}
                            /> }
                    />
                </div>
            </Router>
        );
    }

}

export default withRouter(ScheduleRoot);

if (document.getElementById('user-schedule-root')) {
    ReactDOM.render(<ScheduleRoot />, document.getElementById('user-schedule-root'));
}