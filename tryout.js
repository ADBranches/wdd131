const DAYS = 19;
const today = new Date();

for (let i = 0; i < DAYS; i++){
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(nextDay);
    console.log(dayName);
}
