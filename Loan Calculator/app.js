// Listen For Submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000 )
    e.preventDefault();
});

// Calculate Results
function calculateResults(){
    console.log('Calculating...');
    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    const monthlyInterest = document.getElementById('monthly-interest');



    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    

    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    // Create a variable which calculate the principal loan amount which was inputed by the farmer
    const monthly = (principal*x*calculatedInterest)/(x-1);
    // create a variable to calculate 5% interest on what the farmer will pay monthly as interest
    const calculatedMonthlyInterest = monthly * 0.05;
    

    // Form if monthly(inputed value is Finite())

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);
        monthlyInterest.value = calculatedMonthlyInterest.toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';

        // Hide Looader
        document.getElementById('loading').style.display = 'none';
        
    }else{
        showError('Please Check your numbers')
    }

}
//  However this session is created in other to show when a wrong number was inputed 
// and in other to do that we have to create and error message that will allow you to know that the number you inputed is wrong
// Show Error
function showError(error){
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Hide Looader
    document.getElementById('loading').style.display = 'none';
    
    // create div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Create className
    errorDiv.className = 'alert alert-danger';

    // Add TextContent and append to Div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // We don't want the error message to show for too long right, so we will use setTimeOut()
    // Clear error message
    setTimeout(clearError, 3000);
}

// Create a function for ClearError
function clearError(){
    document.querySelector('.alert').remove();
}