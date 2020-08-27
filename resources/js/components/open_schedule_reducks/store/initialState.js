const initialState = {
    schedule:{
        hashDigest:document.getElementById('open-schedule-root-redux').dataset.hashDigest,
        name: '',
        description: '',
        password:'',
        permitRequired:false,
        passwordError:'',
        passwordRequired:Boolean(document.getElementById('open-schedule-root-redux').dataset.passwordRequired === '1' ? true:false),
        colors:[],
        owner:false,
    },
    reservations : [],
    calender:{
        visibleDayCount:getVisibleDayCount(),
        from:getNow(),
    },
    reservationForm:{
        reserveForm : {
            owner_name:'',
            from : getDateForReserveForm()[0],
            end : getDateForReserveForm()[1],
            color: -1,
        },
        reserveFormError : {
            owner_name:'',
            from : '',
            end : '',
            over : '',
            color :'',
        },
    },
    loadings:{
        password:false
    }

};

export function getVisibleDayCount(){
    if(window.innerWidth > 1200){
        return 13;
    }else if(960 < window.innerWidth && window.innerWidth <= 1200){
        return 11;
    }if(720 < window.innerWidth && window.innerWidth <= 960){
        return 9;
    }if(window.innerWidth <= 720){
        return 7;
    }
    return 7;
}

function getNow(){
    const now = new Date();
    return new Date(now.getFullYear(),now.getMonth(),now.getDate());
}

function getDateForReserveForm(){
    const currentDate = new Date();
    currentDate.setMinutes(0);
    return [currentDate,new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),currentDate.getHours() + 1)];
}

export default initialState;