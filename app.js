//Budget Controller
var budgetController = (function(){
    var Expense = function(id, desc, value){
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.caluculatePercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value/totalIncome)*100);
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, desc, value){
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var calculateTotals = function(type){
        var sum = 0;

        if(type === 'inc'){
            data.allItems[type].forEach(function(curr){
                sum += curr.value;        
            });
        }else if(type === 'exp'){
            data.allItems[type].forEach(function(curr){
                sum += curr.value;        
            });
        }

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },

        totals:{
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percent: -1,
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

        deleteItem: function(type, id){
            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            var index = ids.indexOf(id);
            console.log(index);

            data.allItems[type].splice(index, 1);
        },

        calculateBudget: function(){
            //Calculate total income and expenses
            calculateTotals('exp');
            calculateTotals('inc');
            
            //Calculate the total budget : income -expense
            data.budget = data.totals.inc - data.totals.exp;
            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percent = Math.round((data.totals.exp/data.totals.inc)*100);
            }
        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.caluculatePercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            var allPerc;

            allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });

            return allPerc
        },

        returnBudget: function(){
            return{
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                budget: data.budget,
                percent: data.percent,
            }
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
        budget:'.budget__value',
        totalIncome:'.budget__income--value',
        totalExpense:'.budget__expenses--value',
        percentage:'.budget__expenses--percentage',
        container: '.container',
        item_percentage:'.item__percentage',
    }

    //Get values from user
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.desc).value,
                value: parseFloat(document.querySelector(DOMstrings.value).value),
            }
        },

        getDOMstrings: function(){
            return DOMstrings;
        },

        addListItem: function(obj, type){
            var html, element, newHtml;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            
        },

        deleteListItem: function(itemID){
            var el;

            el = document.getElementById(itemID);
            el.parentNode.removeChild(el);
        },

        clearFields: function(){
            var fields;
            //querySelectorAll returns list and not array
            fields = document.querySelectorAll(DOMstrings.desc+','+DOMstrings.value);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(DOMstrings.totalIncome).textContent = obj.totalInc;
            document.querySelector(DOMstrings.totalExpense).textContent = obj.totalExp;
            document.querySelector(DOMstrings.budget).textContent = obj.budget;
            if(obj.percent > 0){
                document.querySelector(DOMstrings.percentage).textContent = obj.percent + '%';
            }else{
                document.querySelector(DOMstrings.percentage).textContent = '---';
            }
            
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.item_percentage);

            var NodeListForEach= function(list, callback){
                for(var i=0; i < list.length; i++){
                    callback(list[i], i);
                }
            };

            NodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index]+'%';
                }else{
                    current.textContent = '---';
                }
            });
        }
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function(){
        var bdgt;
        //1. Calculate Budget
        budgetCtrl.calculateBudget();
        //2. Return Budget
        bdgt = budgetCtrl.returnBudget();
        //3. Display the updated budget summary
        UIctrl.displayBudget(bdgt);
    };

    var updatePercentages = function(){
        var allPerc;
        //1.Calculate Percentages
        budgetCtrl.calculatePercentages();
        //2. Return Percentage
        allPerc = budgetCtrl.getPercentages();
        //3. Update the UI to display percentages
        UIctrl.displayPercentages(allPerc);
    };

    var ctrlAddItem = function(){
        var input, newItem;

        //1. Grab the values from the input field
        var input = UIctrl.getInput();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2. Add it to our budget controller
            var newItem = budgetController.addItem(input.type, input.description, input.value);
            //3. Update the UI to indicate new value.
            UIctrl.addListItem(newItem, input.type);
            //4. Clear the input fields
            UIctrl.clearFields();
            //5. Calculate and Update Budget UI
            updateBudget();
            //6. Update the individual percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        //Delete Item from the data structure
        budgetCtrl.deleteItem(type, ID);
        //Update UI to remove that entry
        UIctrl.deleteListItem(itemID);
        //Update and Show new budget
        updateBudget();
        //Update the individual percentages
        updatePercentages();
    }

    return{
        init: function(){
            setupEventListeners();
            UIctrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0,
                percent: 0,
            });
        }
    }    
})( UIController, budgetController );


controller.init();