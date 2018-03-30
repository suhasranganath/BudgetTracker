//Budget Controller
var budgetController = (function(){

})();

//UI Controller
var UIController = (function(){
    //DOM Strigs : object to access and control DOM class and IDs
    var DOMstrings = {
        type: '.add__type',
        desc: '.add__description',
        value: '.add__value',
        button: '.add__btn',
    }

    //Get values from user
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.desc).value,
                value: document.querySelector(DOMstrings.value).value,
            }
        },

        getDOMstrings: function(){
            return DOMstrings;
        },
    }
})();

//App Controller
var controller = (function( UIctrl, budgetCtrl ){
    var DOM = UIctrl.getDOMstrings();


    var ctrlAddItem = function(){
        //TODO
        //1. Grab the values from the input field
        var inputData = UIctrl.getInput();
        console.log(inputData);
        //2. Add it to our budget controller
        //3. Update the UI to indicate new value.
        //4. Calculate Budget
        //5. Display the updated budget summary
        
    }
    
    document.querySelector(DOM.button).addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });
})( UIController, budgetController );
