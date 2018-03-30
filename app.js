//Budget Controller
var budgetController = (function(){
    var Expense = function(id, desc, value){
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var Income = function(id, desc, value){
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },

        totals:{
            exp: 0,
            inc: 0,
        },
    }

    return{
        addItem: function(type, des, val){
            var newItem;
            var ID;
            //ID is last index of array plus one
            if( data.allItems[type].length > 0 ){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID = 0;
            }
            

            //Create newItem based on exp or inc
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            //Push newItem into datastructure 'data'
            data.allItems[type].push(newItem);
            //Return newItem Object
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
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
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
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

        addListItem: function(obj, type){
            var html, element, newHtml;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            
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
        var input, newItem;

        //1. Grab the values from the input field
        var input = UIctrl.getInput();
        //2. Add it to our budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);
        //3. Update the UI to indicate new value.
        console.log(newItem);
        UIctrl.addListItem(newItem, input.type);
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