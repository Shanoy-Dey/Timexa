let isM = true;
function isMobile() {
    // Returns true for mobile/tablet, false for laptop/desktop
    const ua = navigator.userAgent;
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isLaptopOrDesktop = /Windows NT|Macintosh|Linux x86_64|X11|CrOS/i.test(ua);
    isM = isMobileDevice;
    const nav = document.querySelector('nav');
}
isMobile();

function Show_Message(){
    document.getElementById("error-message").style.display = "inline";
    if(document.getElementById("error-message").style.display === "inline"){
        setTimeout(function() {
            document.getElementById("error-message").style.display = "none";
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="optional"]');
    const container = document.getElementById("here");

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.optional-subject-input').forEach(input => input.remove());
            const numberOfSubjects = parseInt(this.value);

            if (!isNaN(numberOfSubjects) && numberOfSubjects > 0) {
                for (let i = 1; i <= numberOfSubjects; i++) {
                    const ta = document.createElement("input");
                    ta.setAttribute('type', 'text');
                    ta.setAttribute('placeholder', `Optional Subject ${i}`);
                    ta.setAttribute('id', `os${i}`);
                    ta.classList.add('optional-subject-input');
                    container.appendChild(ta);
                }
            }
            const input = document.getElementsByTagName("input");
            for (let i = 0; i < input.length; i++) {
                input[i].setAttribute('required', 'true');
            }

        });
    });
});

const input = document.getElementsByTagName("input");
for (let i = 0; i < input.length; i++) {
    input[i].setAttribute('required', 'true');
}

const school = document.getElementById("schooling");
const submit = document.getElementById("sb");
submit.addEventListener('click', function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
        os = [document.getElementById("os1"), document.getElementById("os2"), document.getElementById("os3")];
        Table();
    } else {
        form.reportValidity();
    }
});

var j = 1;
const go = document.getElementById("her");

function createHourTable(label, isMorning) {
    const head = document.createElement('h4');
    head.textContent = label;
    head.setAttribute('id', 'heading');
    go.appendChild(head);

    const table = document.createElement('table');
    const row = document.createElement('tr');
    table.setAttribute('id', 'tab');
    for (let i = 0; i <= 11; i++) {
        const col = document.createElement('td');
        if (isMorning) {
            if (i == 0)
                col.textContent = '12 - 1 AM';
            else if (i == 11)
                col.textContent = '11 - 12 PM';
            else
                col.textContent = `${i} - ${i + 1} AM`;
        } else {
            if (i == 0)
                col.textContent = '12 - 1 PM';
            else if (i == 11)
                col.textContent = '11 - 12 AM';
            else
                col.textContent = `${i} - ${i + 1} PM`;
        }
        col.setAttribute('value', j);
        j++;
        row.appendChild(col);
    }

    table.appendChild(row);
    go.appendChild(table);
    go.appendChild(document.createElement('br'));
}

function createTable(label, isMorning) {
    const head = document.createElement('h4');
    head.textContent = label;
    head.setAttribute('id', 'heading');
    go.appendChild(head);

    const table = document.createElement('table');
    table.setAttribute('id', 'tab2');
    for (let i = 0; i < 2; i++) {
        const row = document.createElement('tr');
        for (let k = 0; k <= 5; k++, j++) {
            const col = document.createElement('td');
            if (isMorning) {
                if (k == 0 && i == 0)
                    col.textContent = '12 - 1 AM';
                else if (j == 12)
                    col.textContent = '11 - 12 PM';
                else
                    col.textContent = `${j - 1} - ${j} AM`;
            } else {
                if (k == 0 && i == 0)
                    col.textContent = '12 - 1 PM';
                else if (j == 24)
                    col.textContent = '11 - 12 AM';
                else
                    col.textContent = `${j - 13} - ${j - 12} PM`;
            }
            col.setAttribute('value', j);
            row.appendChild(col);
        }


        table.appendChild(row);
    }
    go.appendChild(table);
    go.appendChild(document.createElement('br'));
}


var atime = [];
var coach = [];
var count = 0;
let s1 = 0,s2=0;
var ok = false;
var choice = true;
function Table() {
    window.scrollTo({ top: 450, behavior: 'smooth' });
    const val = school.value;
    go.innerHTML = "";
    const heading = document.createElement('h3');
    heading.textContent = 'Select Your Study Hours:';

    const choiceTable = document.createElement('table');
    choiceTable.setAttribute('id', 'choice');
    const choiceRow = document.createElement('tr');
    const choiceCell = document.createElement('td');
    choiceCell.setAttribute('id', 'self-study');
    choiceCell.textContent = 'Self Study Hours';
    choiceCell.classList.add('self-study');
    choiceRow.appendChild(choiceCell);
    const choiceCell2 = document.createElement('td');
    choiceCell2.setAttribute('id', 'coaching');
    choiceCell2.textContent = 'Coaching Hours';
    choiceRow.appendChild(choiceCell2);
    choiceTable.appendChild(choiceRow);
    heading.setAttribute('id', 'heading');
    heading.setAttribute('class', 'hied');
    go.appendChild(heading);
    go.appendChild(document.createElement('br'));
    go.appendChild(choiceTable);
    go.appendChild(document.createElement('br'));

    function chooseCellClick(event) {
        const clickedCell = event.target.closest('td#self-study');
        const clickedCell2 = event.target.closest('td#coaching');
        if (clickedCell) {
            clickedCell.classList.add('self-study');
            const coachingCell = clickedCell.parentElement.querySelector('#coaching');
            if (coachingCell) coachingCell.classList.remove('coaching');
            choice = true;
        }
        if (clickedCell2) {
            clickedCell2.classList.add('coaching');
            const selfStudyCell = clickedCell2.parentElement.querySelector('#self-study');
            if (selfStudyCell) selfStudyCell.classList.remove('self-study');
            choice = false;
        }
    }

    const choose = go.querySelectorAll('table#choice');
    choose.forEach(table => {
        table.addEventListener('click', chooseCellClick);
    });

    

    // Override createHourTable for mobile users
    if (isM || window.innerWidth < 350) {
        // Use mobile-friendly table for mobile devices or very small screens
        createTable('Morning Hours:', true);
        createTable('Evening Hours:', false);
    } else {
        createHourTable('Morning Hours:', true);
        createHourTable('Evening Hours:', false);
    }

    const messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', 'hour-limit-message');
    go.appendChild(messageDiv);

    function handleCellClick(event) {
        const clickedCell = event.target.closest('td');
        if (clickedCell) {
            if (ok == false) {
                if (clickedCell.classList.contains('self-study')) {
                    clickedCell.classList.remove('self-study');
                    count--;
                }
                else if (clickedCell.classList.contains('coaching')) {
                    clickedCell.classList.remove('coaching');
                    count--;
                }
                else {
                    if(window.choice == true) {
                        clickedCell.classList.add('self-study');
                        setTime(clickedCell.getAttribute('value'));
                        count++;
                    }
                    else if(window.choice == false) {
                        clickedCell.classList.add('coaching');
                        setTime(clickedCell.getAttribute('value'));
                        setCoachingTime(clickedCell.getAttribute('value'));
                        count++;
                    }

                    if (count <8) {
                        messageDiv.textContent = `You have to study at least a total of 8 hours if you want to crack ${nexam.value.toUpperCase()} !`;
                        finalsubmit.disabled = true;
                    }
                    else {
                        messageDiv.textContent = "";
                        finalsubmit.disabled = false;
                    }

                    if (val == "yes" && count >= 12) {
                        messageDiv.textContent = "You can only select a maximum of 12 hours because 6 hours School and 6 hours Sleep is Necessary !";
                        return;
                    }
                    else if (val == "no" && count >= 18) {
                        messageDiv.textContent = "You can only select a maximum of 18 hours because 6 hours Sleep is Necessary !";
                        return;
                    }
                }
            }
        }
    }

    function setTime(i) {
        for (let j = 0; j < atime.length; j++) {
            if (i == atime[j]) {
                atime.splice(j, 1);
                return;
            }
        }
        atime[s1] = i;
        s1++;
    }

    function setCoachingTime(i) {
        for (let j = 0; j < coach.length; j++) {
            if (i == coach[j]) {
                coach.splice(j, 1);
                return;
            }
        }
        coach[s2] = i;
        s2++;
    }

    const tables = go.querySelectorAll('table#tab, table#tab2');
    tables.forEach(table => {
        table.addEventListener('click', handleCellClick);
    });

    const finalsubmit = document.createElement('button');
    finalsubmit.textContent = ' Finish ';
    finalsubmit.setAttribute('id', 'sb');
    finalsubmit.setAttribute('type', 'submit');
    go.appendChild(finalsubmit);
    finalsubmit.addEventListener('click', function (event) {
        event.preventDefault();
        finalsubmit.disabled = true;
        ok = true;
        Processing();
    });
}

let os = [];
const tname = document.getElementById("tname");
let nexam = document.getElementById("Exam");
var timec = [];
var coaching = [];
let xy = 100;
function Processing() {
    const aim = ["AIIMS DELHI", "IIT BOMBAY"];
    window.scrollBy({ top: 450, behavior: 'smooth' });
    atime = atime.filter(item => item !== undefined && item !== null && item !== "");
    atime = atime.map(Number);
    coach = coach.filter(item => item !== undefined && item !== null && item !== "");
    coach = coach.map(Number);
    atime.sort((a, b) => a - b);
    coach.sort((a, b) => a - b);

    for (let i = 0; i < atime.length; i++) {
        const td = document.querySelector('td[value="' + atime[i] + '"]');
        if (td) {
            timec[i] = td.textContent;
        }
    }

    for (let i = 0; i < coach.length; i++) {
        const td = document.querySelector('td[value="' + coach[i] + '"]');
        if (td) {
            coaching[i] = td.textContent;
        }
    }
    // Calculate n once here for NEET
    n = Math.floor((timec.length -1-coach.length) / 3);
    const hr = document.createElement("h3");
    hr.setAttribute("id", "heading");
    hr.textContent = "Any Last Changes ?";
    hr.style.display = "block";
    hr.style.textAlign = "center";
    go.appendChild(hr);
    const wrapper = document.createElement('div');
    wrapper.className = 'ftable-wrapper';
    var ftable = document.createElement('table');
    ftable.setAttribute('id', 'ftable');

    const title = document.createElement('tr');
    const hd = document.createElement('th');
    hd.setAttribute('colspan', '8');
    hd.textContent = tname.value + " - For " + nexam.value.toUpperCase();
    hd.style.textAlign = 'center';
    hd.style.fontSize = '24px';
    hd.style.fontWeight = 'bold';
    hd.style.border = '1px solid #000';
    hd.style.padding = '8px';
    title.appendChild(hd);
    ftable.appendChild(title);

    const headerRow = document.createElement('tr');
    const timeHeader = document.createElement('th');
    timeHeader.textContent = 'Time';
    timeHeader.setAttribute('id', 'timeHeader');
    timeHeader.style.textAlign = 'center';
    timeHeader.style.border = '1px solid #000';
    headerRow.appendChild(timeHeader);

    // Days of the week headers
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => {
        const dayHeader = document.createElement('th');
        dayHeader.textContent = day;
        dayHeader.style.border = '1px solid #000';
        dayHeader.style.padding = '4px';
        headerRow.appendChild(dayHeader);
    });

    ftable.appendChild(headerRow);

    // Column-wise: for each day (column), create all rows (time slots)
    for (let j = 0; j < 7; j++) { // 6 days/columns (Monday to Saturday)

        for (let i = 0; i < timec.length; i++) {
            // time slots/rows

            let row;
            // Create row only for the first column
            if (j === 0) {
                row = document.createElement('tr');
                row.setAttribute('id', `row${i + 1}`);
                const timeCell = document.createElement('td');
                timeCell.textContent = timec[i];
                for(let k = 0; k < coach.length; k++) {
                    if(timec[i]==coaching[k]){
                        coach[k]=i;
                    }
                }
                timeCell.style.border = '1px solid #000';
                timeCell.style.padding = '4px';
                row.appendChild(timeCell);
                ftable.appendChild(row);
            } else if (j < 7) {
                // Get the existing row
                row = ftable.querySelector(`#row${i + 1}`);
            }
            // Create cell for this column and row
            const cell = document.createElement('td');
            // id is now cell{column}_{row}
            cell.setAttribute('id', `cell${j + 1}_${i + 1}`);
            cell.style.textAlign = 'center';
            // Only add the Sunday cell (j==6) to the first row (i==0), with rowspan
            if (j === 6) {
                if (i === 0) {
                    const sundayCell = document.createElement('td');
                    sundayCell.setAttribute('rowspan', timec.length);
                    sundayCell.setAttribute('id', 'Sunday');
                    // Call your function to fill content
                    const ex = nexam.value;
                    if (typeof window[ex] === "function") {
                        window[ex](sundayCell, j + 1, i + 1);
                    }
                    sundayCell.style.textAlign = 'center';
                    sundayCell.style.fontSize = '18px';
                    sundayCell.style.width = '120px';
                    sundayCell.style.border = '1px solid #000';
                    sundayCell.style.padding = '4px';
                    row.appendChild(sundayCell);
                }
                // For other rows, do NOT append a cell for Sunday
            } else {
                // All other days: add a cell as usual
                const cell = document.createElement('td');
                cell.setAttribute('id', `cell${j + 1}_${i + 1}`);
                cell.style.textAlign = 'center';
                if (coach.includes(i)) {
                    cell.textContent = "Coaching";
                } else {
                    if (typeof window[nexam.value] === "function") {
                        window[nexam.value](cell, j + 1, i + 1);
                    }
                }
                cell.style.border = '1px solid #000';
                cell.style.padding = '4px';
                row.appendChild(cell);
            }
        }
    }
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("colspan", "8");
    td.textContent = "AIM -for- " + aim[xy];
    td.style.textAlign = "center";
    td.style.fontSize = "24px";
    td.style.fontWeight = '500';
    row.appendChild(td);
    ftable.appendChild(row);
    wrapper.appendChild(ftable);
    go.appendChild(wrapper);

    const editableCells = ftable.querySelectorAll('td');
    editableCells.forEach(td => {
        td.setAttribute('contenteditable', 'true');
    });
    const Gen = document.createElement("button");

    Gen.textContent = "Generate Timetable Image";
    Gen.addEventListener('click', function (event) {
        event.preventDefault();

        setTimeout(() => {
            html2canvas(ftable, { scale: 3 }).then(canvas => {
                // Create a link to download the image
                const link = document.createElement('a');
                link.download = 'timetable.jpg';
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.click();
            });
        }, 500);
    });
    go.appendChild(Gen);
}

let p = 0, c = 0, b = 0, z = 0, pcf = 0, mcq = 0;
let n = 0; let m = 0; let t = 0;

function neet(cell, o, x) {
    xy = 0;
    const subjects = [
        "Physics", "Physics Numericals",
        "Chemistry", "Chemistry Numericals",
        "Botany", "Ncert Reading",
        "Zoology", "Ncert Reading",
        "Phy-Chem NEET MCQs ",
        "Biology NEET MCQs "
    ];
    os = os.filter(item => item !== undefined && item !== null && item !== "");
    // n is now calculated once in Processing()
    if (x == 1 && o % 2 == 1) {
        p = 0;
        c = 0;
        b = 0;
        z = 0;
        pcf = 0;
        mcq = 0;
    }
    for (let i = o; i <= 6; i++) {
        n = Math.floor((timec.length - coach.length  - 1) / 3);

        for (let i = o; i <= 6; i++) {

            for (let l = x; l <= (n * 3)+coach.length && n * 3 < timec.length; l++) {


                if (x ==  (n * 3)+coach.length) {
                    cell.textContent = "Mistake Analysis";
                    return;
                }
                if (p != n) {
                    if (p == n - 1) {
                        cell.textContent = subjects[1];
                        p++;
                        return;
                    }
                    cell.textContent = subjects[0];
                    p++;
                    return;
                }
                if (c != n) {
                    if (c == n - 1) {
                        cell.textContent = subjects[3];
                        c++;
                        return;
                    }
                    cell.textContent = subjects[2];
                    c++;
                    return;
                }
                if (b != n) {
                    if (b == n - 1 && l != 1 && z == n - 1) {
                        cell.textContent = subjects[5];
                        b++;
                        return;
                    }
                    if (b < n - 1) {
                        cell.textContent = subjects[4];
                        b++;
                        return;
                    }
                }
                if (z != n) {
                    if (z == n - 1) {
                        cell.textContent = subjects[7];
                        z++;
                        return;
                    }
                    cell.textContent = subjects[6];
                    z++;
                    return;
                }
                if (pcf != n - 1) {
                    cell.textContent = subjects[8];
                    pcf++;
                    return;
                }

                if (mcq != n - 1) {
                    cell.textContent = subjects[9];
                    mcq++;
                    return;
                }
            }
            ol: for (let l = x; l <= timec.length ; l++) {
                for (; m < os.length && t == 0;) {
                    cell.textContent = os[m].value;
                    t = 1;
                    m++;
                    if (m == os.length) {
                        m = 0;
                    }
                    if (l == timec.length)
                        t = 0;
                    return;
                }
                if (l == timec.length - 1) {
                    cell.textContent = "Phy-Chem NCERT Reading";
                    return;
                }
                cell.textContent = "Revision";
                t = 0;
                return;

            }


        }
    }
    if (o === 7 && x === 1) {
        cell.setAttribute('rowspan', timec.length);
        cell.setAttribute('id', 'Sunday')
        cell.textContent = "Mixed Tests , NEET Pyqs , Revision of Everything Studied + Focus on Weak Points ";
        cell.style.textAlign = 'center';
        cell.style.fontSize = '20px';
        cell.style.width = '120px';
        // No return here, continue with the rest of the function
    }
}

let mt = 0, pyq = 0
function jee(cell, o, x) {
    xy = 1;
    const subjects = [
        "Physics", "Physics Numericals",
        "Chemistry", "Chemistry Numericals",
        "Mathematics", "Mathematics Questions",
        "JEE Main PYQs"
    ];
    os = os.filter(item => item !== undefined && item !== null && item !== "");
    // n is now calculated once in Processing()
    if (x == 1) {
        p = 0;
        c = 0;
        mt = 0;
        pyq = 0;
    }
    for (let i = o; i <= 6; i++) {
        n = Math.floor((timec.length- coach.length- 1) / 3);

        for (let i = o; i <= 6; i++) {

            for (let l = x; l <= (n * 3)+coach.length && n * 3 < timec.length; l++) {


                if (p != n) {
                    if (p == n - 1) {
                        cell.textContent = subjects[1];
                        p++;
                        return;
                    }
                    cell.textContent = subjects[0];
                    p++;
                    return;
                }
                if (c != n) {
                    if (c == n - 1) {
                        cell.textContent = subjects[3];
                        c++;
                        return;
                    }
                    cell.textContent = subjects[2];
                    c++;
                    return;
                }
                if (mt != n) {
                    if (mt == n - 1) {
                        cell.textContent = subjects[5];
                        mt++;
                        return;
                    }
                    if (mt < n - 1) {
                        cell.textContent = subjects[4];
                        mt++;
                        return;
                    }
                }

                if (x == n * 3) {
                    cell.textContent = subjects[6];
                    return;
                }
            }
            ol: for (let l = x; l <= timec.length; l++) {
                for (; m < os.length && t == 0;) {
                    cell.textContent = os[m].value;
                    t = 1;
                    m++;
                    if (m == os.length) {
                        m = 0;
                    }
                    if (l == timec.length)
                        t = 0;
                    return;
                }
                if (l == timec.length - 1) {
                    cell.textContent = "Notes Review";
                    return;
                }
                if (o % 2 == 0)
                    cell.textContent = "Mistake Analysis";
                else
                    cell.textContent = subjects[6];
                t = 0;
                return;

            }
        }
    }
    if (o === 7 && x === 1) {
        cell.setAttribute('rowspan', timec.length);
        cell.setAttribute('id', 'Sunday')
        cell.textContent = "Mixed Tests , JEE Advanced Pyqs , Revision of Written Notes + Focus on Weak Points ";
        if (cell) {
            cell.style.textAlign = 'center';
            cell.style.fontSize = '18px';
            cell.style.width = '120px';
        }
        // No return here, continue with the rest of the function
    }
}


