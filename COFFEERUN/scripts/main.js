(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]'; 
    var CHECKLIST_SELECTOR ='[data-coffee-order="checklist"]';
    
    var App = window.App;  
    var Truck = App.Truck;  
    var DataStore = App.DataStore; 
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    
    var myTruck = new Truck('ncc-1701', new DataStore()); 
    window.myTruck = myTruck; 
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);
    
    formHandler.addSubmitHandler(function (data){
        return myTruck.createOrder.call(myTruck, data)
        .then(function() {
            checkList.addRow.call(checkList, data);
        },
        function(){
            alert ('Server unreachable. Try again later');
        }
    );
    });
})(window);