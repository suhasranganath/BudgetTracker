//Budget Controller
var budgetController = (function(){
    var Expense = function(id, desc, value){
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var Income = function(){
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var data = {
        allitems: {
            exp: [],
            inc: [],
        },

        totals:{
            exp: 0,
            inc: 0,
        },
    }
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
    

    var setupEventListeners = function(){
        var DOM = UIctrl.getDOMstrings();

        document.querySelector(DOM.button).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){
        //TODO
        //1. Grab the values from the input field
        var inputData = UIctrl.getInput();
        console.log(inputData);
        //2. Add it to our budget controller
        //3. Update the UI to indicate new value.
        //4. Calculate Budget
        //5. Display the updated budget summary
        
    };

    return{
        init: function(){
            setupEventListeners();
        }
    }    
})( UIController, budgetController );


controller.init();