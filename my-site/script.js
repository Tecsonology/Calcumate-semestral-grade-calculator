let btnClick = document.querySelector('.btnClick');
let txtGrade = document.querySelector('.txtGrade')
let txtG1 = document.querySelector('#txtG1')
let txtG2 = document.querySelector('#txtG2')
let txtG3 = document.querySelector('#txtG3')
let txtG4 = document.querySelector('#txtG4')
let showGrade = document.querySelector(".showGrade")
let txtGEquiv = document.querySelector('.txtGEquiv');
let txtMessage = document.querySelector('.txtMessage')
let showGradingSystem = document.querySelector('.show-grading-system')
let btnShowGS = document.querySelector('.btnShowGS')
let btnRestart = document.querySelector('#btnRestart')
let addToGWA = document.querySelector('.addToGWA')
let courseList = document.querySelector('.course-lists')
let gwaPage = document.querySelector(".gwa-page")
let inputSubj = document.querySelector('.input-subj')
let txtSubj = document.querySelector('.txtSubj')
let btnAdd = document.querySelector('.btnAdd')
let addedMessage = document.querySelector('.addedMessage')

let finalGrade = 0;
let courseGrades = [];
let sumOfGrades = 0;


addToGWA.style.display = "none";





function computeGrade(pre, mid, pref, fin) {
    let finalAverage = (pre*0.20)+(mid*0.20)+(pref*0.20)+(fin*0.40);

    if(finalAverage > 100.00){
        return false;
    } else {
         return parseFloat(finalAverage.toFixed(2));
    }
}

function checkCumulative() {
    
    let summationOfGrades = 0;
    
    if(courseGrades.length > 0){
        
    
        for(let x = 0; courseGrades.length-1 >= x; x++){
            
            summationOfGrades += courseGrades[x][1];
        } 
        
        return parseFloat(summationOfGrades.toFixed(2));

    } else {
        return 100;
    }


}

function computeEquivalent(grade){
    if(grade <= 100 && grade >= 97.50){
        return "1.00 (Excellent)"
    } else if(grade >= 94.50 && grade <= 97.49){
        return "1.25 (Very Good)"
    } else if(grade >= 91.50 && grade <= 94.49){
        return "1.50 (Very Good)"
    } else if(grade >= 88.50 && grade <= 91.49){
        return "1.75 (Very Good)"
    } else if(grade >= 85.50 && grade <= 88.49){
        return "2.00 (Satisfactory)"
    } else if(grade >= 81.50 && grade <= 85.49){
        return "2.25 (Satisfactory)"
    } else if(grade >= 77.50 && grade <= 81.49){
        return "2.50 (Satisfactory)"
    } else if(grade >= 73.50 && grade <= 77.49){
        return "2.75 (Fair)"
    } else if(grade >= 65.50 && grade <= 73.49){
        return "3.00 (Failed)"
    } else if(grade <= 64.49){
        return "5.00 (Failed)"
    } else {
        addToGWA.style.display = "none";

        return "Please input correct grades"
    }
}




btnClick.addEventListener("click", ()=> {

   if(btnClick.innerHTML == 'Compute New Grade'){
        btnRestart.click();
        btnClick.innerHTML = "Compute My Grade"
   } else {

        btnRestart.style.display = "block";
        showGrade.style.display = "block";
        txtMessage.style.display = "none";

        
        

        let prelim = txtG1.value;
        let midterm = txtG2.value;
        let prefinal = txtG3.value;
        let final = txtG4.value;

        if(prelim.length > 0 || midterm.length > 0 || prefinal.length > 0 || final.length > 0){
            if(prelim.length <= 4 || midterm.length <= 4 || prefinal.length <= 4 || final.length <= 4){
                
                finalGrade = computeGrade(prelim, midterm, prefinal, final)

                if(finalGrade){
                    addToGWA.style.display = "flex";

                    txtGrade.innerHTML = "Final Grade: "+ finalGrade;
                    txtGEquiv.innerHTML = "Equivalent: "+computeEquivalent(finalGrade)
                } else {
                    addToGWA.style.display = "none";

                    txtGrade.innerHTML = "";
                    txtGEquiv.innerHTML = "Please check your inputs"
                }
            }
        }  else {
            addToGWA.style.display = "none";

            txtGrade.innerHTML = "";
            txtGEquiv.innerHTML = "Invalid, Please input correct grades"
        }
   }

})

const styles = window.getComputedStyle(showGradingSystem)

btnShowGS.addEventListener("click", ()=>{
    if(styles.display === "none"){
        btnShowGS.innerHTML = "hide grading system 🡡"
        showGradingSystem.style.display = "block";
    } else if(styles.display === "block"){
        showGradingSystem.style.display = "none";
        btnShowGS.innerHTML = "show grading system 🡣"
    }
})



btnRestart.addEventListener("click", ()=> {
    txtG1.value = "";
    txtG2.value = "";
    txtG3.value = "";
    txtG4.value = "";
    txtGrade.innerHTML = "";
    txtGEquiv.innerHTML = "";
    txtMessage.style.display = "block"; 
    showGrade.style.display = "none";
    showGradingSystem.style.display = "none"
    btnRestart.style.display = "none";
    addedMessage.style.display = "none"
    inputSubj.style.display = "none";

})

const showCourseLists =()=> {
    if(courseGrades){
        courseList.style.display = "block";
    }
}

addToGWA.addEventListener("click", ()=> {


    
    inputSubj.style.display = "flex"
    addToGWA.style.display = "none"
    

})

btnAdd.addEventListener("click", ()=> {
    if(!txtSubj.value){
        alert("Please input course subject")
    } else {
        if(courseGrades.length <= 7){

            document.querySelector('.reset-wrapper').style.display = "flex";
            document.querySelector('.btnReset').style.display = "flex";
     
            courseGrades.push([txtSubj.value, parseFloat(finalGrade)])
    
            sumOfGrades = checkCumulative()/courseGrades.length;
    
            if(courseGrades.length <= 7){
                document.querySelector('.gwa-title').innerHTML = "Cumulative Grade: "+sumOfGrades.toFixed(2);
                document.querySelector('.gwa-equivalent').innerHTML = computeEquivalent(sumOfGrades);
            } else {
                document.querySelector('.gwa-title').innerHTML = "GWA: "+sumOfGrades.toFixed(2)+" "+computeEquivalent(sumOfGrades);
            }
    
            let parentDiv = document.createElement("div");
            parentDiv.className = "course-card";
    
            let subject = document.createElement("h4");
            subject.textContent = txtSubj.value;
    
            let grade = document.createElement("h4");
            grade.textContent = finalGrade;
    
            parentDiv.appendChild(subject)
            parentDiv.appendChild(grade)
    
            courseList.appendChild(parentDiv)
    
            
    
            gwaPage.style.display = "block"
            courseList.style.display = "block";
    
            inputSubj.style.display = "none";
            addedMessage.style.display = "flex";
            txtSubj.value = "";
    
            addToGWA.setAttribute("disable", "true")
    
            btnRestart.style.display = "none";
    
            btnClick.innerHTML = "Compute New Grade"
    
    
           
            
    
        } else {
            alert("Course limit exceeds")
        }
    }
})

document.querySelector('.btnCancelAdd').addEventListener("click", ()=> {
    inputSubj.style.display = "none";
    addToGWA.style.display = "block";
})

document.querySelector('.btnReset').addEventListener("click", ()=> {
    courseGrades.length = 0;
    courseList.innerHTML = "";
    document.querySelector('.gwa-title').innerHTML = "Cumulative Grade: ";
    document.querySelector('.gwa-equivalent').innerHTML = "No Data";
    document.querySelector('.btnReset').style.display = "none";
})



