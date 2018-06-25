function checkFilter(category, title, checked) {
    let titles = this[category];
    if (checked) {
        titles.push(title)
    } else {
        let i = titles.indexOf(title);
        if (i > -1) {
            titles.splice(i, 1)
        }
    }
    console.log('check-filter', category, title, checked)
}

function setDay(day) {
    this.day = day
}

export {checkFilter, setDay};