import {setReservations,allReservations} from './actions';
import {setReservationError} from '../forms/actions'
import {fetchFromLaravel} from '../../FetchUtil';
import {formatDate} from '../../DateUtil';

export const sendReservation = () => {
    return (dispatch,getState) => {
        const state = getState();
        
        if(!validate(dispatch,state.reservationForm.reserveForm,state.reservations)) return;

        document.getElementById('open-form-button').click();

        const csrf = document.querySelector('meta[name="csrf_token"]').content;
        const color = state.schedule.colors.filter(color=>Number(color.id) === Number(state.reservationForm.reserveForm.color))[0];

        const body = {
            schedule_password : state.schedule.password,
            hash_digest : state.schedule.hashDigest,
            owner_name : state.reservationForm.reserveForm.owner_name,
            from : formatDate(state.reservationForm.reserveForm.from,'YYYY-MM-DD HH:mm:00'),
            end : formatDate(state.reservationForm.reserveForm.end,'YYYY-MM-DD HH:mm:00'),
            color : Number(state.reservationForm.reserveForm.color),
            dummyId : new Date().getMilliseconds()
        };

        if(!state.schedule.permitRequired){
            dispatch(setReservations([{
                ...body,
                color:{
                    background_color:color.background_color,
                    text_color:color.text_color
                }
            }]));
        }

        fetchFromLaravel(csrf,'POST',`/reservations`,body,
            res=>{
                if(state.schedule.permitRequired) return;
                dispatch(allReservations(
                    [
                        ...state.reservations.filter(reservation=>
                            !(reservation.dummyId) || reservation.dummyId !== res.errors.dummyId[0]
                        ),
                        res.reservation
                    ]
                ));
            },
            res=>{
                const errors = {};
                for(const error in res.errors){errors[error] = res.errors[error][0]};
                dispatch(setReservationError(errors));

                if(state.schedule.permitRequired) return;

                let newReservations = [
                    ...state.reservations.filter(reservation=>
                        !(reservation.dummyId) || reservation.dummyId !== res.errors.dummyId[0] 
                    )
                ]; 

                if('date_over' in res.errors) newReservations = [...newReservations, ...res.errors['date_over'][0]];

                const sendReservation = [];
                newReservations.forEach(newReservation => {
                    let isExists = false;
                    for(let i = 0;i < sendReservation.length;i ++){
                        if(sendReservation[i].from === newReservation.from){
                            isExists = true;
                            break;
                        ;}
                    }
                    if(!isExists) sendReservation.push(newReservation);
                });
                
                dispatch(allReservations(sendReservation));
                
            }
        );
        

    };
};

function validate(dispatch,form,reservations){

    let validated = true;
        
    const errors = {
        owner_name:'',
        from : '',
        end : '',
        over : '',
        color :'',
    };

    const notOver = reservations.filter(reservation=>{
        
        if(reservation.from < form.from && form.end < reservation.end){
            return true;
        }
        return false;
        
    });

    if(form.owner_name.length < 1){
        errors.owner_name = '1文字以上を入力';
        validated = false;
    }
    if(form.from.getTime() < new Date().getTime()){
        errors.from = '予約は現在より先に設定してください';
        validated = false;
    }
    if(form.end.getTime() < form.from.getTime()){
        errors.end = '予約は開始日時より先に設定してください';
        validated = false;
    }
    if(notOver.length !== 0){
        errors.over = '重複している予約があります';
        validated = false;
    }
    if(!(document.querySelector('#reserve-form-color input:checked'))){
        errors.color = '色を選択して下さい';
        validated = false;
    }

    if(!validated) dispatch(setReservationError(errors));

    return validated;
    
}

export const deleteReservation = (from,end) =>{
    return (dispatch,getState) => {
        const csrf = document.querySelector('meta[name="csrf_token"]').content;
        const state = getState();

        dispatch(allReservations(
            [
                ...state.reservations.filter(reservation => reservation.from !== from && reservation.end !== end)
            ]
        ));

        fetchFromLaravel(csrf,'DELETE','/reservations/1',
            {
                from:from,
                end:end,
                hash_digest:state.schedule.hashDigest
            },
            res => {
                
            },
            res => {
                console.log(res);
            }
        );
        
    }
}