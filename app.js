

let result = document.getElementById("result");
const button = document.getElementById("btn");

/* this is for computation of gross pay */
const grossPay = () => {
const basicPay = parseFloat(document.getElementById("basic").value.replace(/[^0-9.-]+/g,"")) || 0;
const allowances = parseFloat(document.getElementById("allowance").value.replace(/[^0-9.-]+/g,"")) || 0;
const commission = parseFloat(document.getElementById("commission").value.replace(/[^0-9.-]+/g,"")) || 0;
const others = parseFloat(document.getElementById("adjustments").value.replace(/[^0-9.-]+/g,"")) || 0;

let gross = basicPay + allowances + commission + others;
return gross;
}


/* this is for computation of deductions */
const deductions = () => {
const sss = parseFloat(document.getElementById("sss").value.replace(/[^0-9.-]+/g,"")) || 0;
const phl = parseFloat(document.getElementById("phl").value.replace(/[^0-9.-]+/g,"")) || 0;
const pagibig = parseFloat(document.getElementById("pagibig").value.replace(/[^0-9.-]+/g,"")) || 0;
const taxes = parseFloat(document.getElementById("taxes").value.replace(/[^0-9.-]+/g,"")) || 0;
return sss + phl + pagibig + taxes;
}


/* this is the net pay computation */
const netPay = () => {
let gross = grossPay();
let deduct = deductions();
let net = gross - deduct;
result.innerHTML = `Your Net Payroll is ${net.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

/* this is for updating the values with commas and decimals */
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
input.addEventListener("change", () => {
const value = parseFloat(input.value);
if (!isNaN(value)) {
    input.value = value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    netPay()
    
}
});
});



/* this is for clearing all the fields */
const clear = () => {
    result.innerHTML = "";
}

button.addEventListener("click", clear)




/* this will update the basic pay field based on the monthly pay input which should be half of the monthly pay*/
const updateBasic =() => {
    monthlyPay = parseFloat(document.getElementById("monthlyPay").value.replace(/[^0-9.-]+/g,"")) || 0;
    basic = document.getElementById("basic");
    basic.value = monthlyPay / 2;
    value = parseFloat(basic.value);
    basic.value = value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    netPay();

}

monthlyPay.addEventListener("change",updateBasic)


/* compute for adjustments */

const adjustment = () => {
    const actual = document.getElementById("actualHours")
    const required = document.getElementById("requiredHours")
    const adjustment = document.getElementById("adjustments")

    const adjArray = [actual.value, required.value, adjustment.value]
    adjArray[2] = adjArray[0] - adjArray[1];
    
    adjustment.value = adjArray[2] * hourly(parseFloat(adjArray[1]));
    console.log(adjArray)


}

const hourly = (required) => {
    const basic = document.getElementById("basic")
    hourlyArr = [basic.value, required]
    hourlyArr.push(hourlyArr[0]/hourlyArr[1])
    return hourlyArr[2]



}
