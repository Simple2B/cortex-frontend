import { Test } from "../../types/patientsTypes";


export const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
};

export const isRegToday = (reg_date: string | null, visits: Array<any>): boolean => {
    if (reg_date) {
        const today = new Date();
        const registrationData = new Date(reg_date)
        const dateInQueue = new Date(registrationData.setHours(registrationData.getHours() + 24));
        if (visits.length > 0) {
            const visitWithStartTimeToday = visits.filter(visit => {
                if (getFormattedDate(new Date(visit.start_time)) === getFormattedDate(today)) {return visit}
        });
            if(visitWithStartTimeToday.length > 0) return false
        };
        if (dateInQueue > today) {
            return true;
        };
    };

    return false;
};


const plusDayToDate = (progressDate: string, day: number) => {
    return Math.floor(new Date(new Date(progressDate).setDate(new Date().getDate() + day)).getTime()/1000);
}

export const isProgressDateMoreToday = (progress_date: string | null, tests: Test[]): boolean => {
    if (!progress_date || tests.length === 0) {
        return false;
    }
    const progressDate = new Date(progress_date).getTime()/1000;
    // const today = new Date(getFormattedDate(new Date())).getTime()/1000;
    // const todayPlusTreeDays = Math.floor(new Date(new Date().setDate(new Date().getDate() + 3)).getTime()/1000);
    let testsDate = []
    for (let i = 0; i < tests.length; i++) {
        const testDate = Date.parse(tests[i].date)/1000;
        if (progressDate === testDate) {
            testsDate.push(tests[i].date);
        };
        if (plusDayToDate(progress_date, 1) === testDate || plusDayToDate(progress_date, 2) === testDate) {
            testsDate.push(tests[i].date);
        };

        // if (today <= progressDate && progressDate <= todayPlusTreeDays) {
        //     if (today <= testDate && testDate <= todayPlusTreeDays) {
        //         testsDate.push(tests[i].date);
        //     };
        // };
    };
    if (testsDate.length > 0) {
        return false;
    }
    if (testsDate.length === 0) {
        return true;
    };
    return false;
};
