sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], (Controller,Fragment,JSONModel) => {
    "use strict";

    return Controller.extend("app.northwindobjectpage.controller.View1", {
        onInit() {
            // Json Model of Talent Search Field Sample Data
            var oTSFModel = new sap.ui.model.json.JSONModel("../model/TalentSearchFieldSampleData.json");
            this.getView().setModel(oTSFModel,"TSFModel");
            // var oList = this.getView().byId("idTSFList");
            // oList.setModel(oTSFModel, "TSFModel");        


            var oJSONModel = new JSONModel("../model/data.json");
            this.getView().setModel(oJSONModel,"productModel");
            console.log("JSONModel"+oJSONModel);
            
            // const oRouter = this.getOwnerComponent().getRouter();
            // oRouter.attachRoutePatternMatched(this._onObjectMatched,this);
            this._orderID='10250';
            const oModel = this.getView().getModel();
            console.log("oModel"+oModel);
            const sPath = "/Orders(" + this._orderID + ")";
            // console.log(oModel.sServiceUrl + sPath);
            this.getView().bindElement(sPath);
        },

        _onObjectMatched: function (oEvent) {
            this._orderID = oEvent.getParameter("arguments").orderID;
            const oModel = this.getView().getModel();
            const sPath = "/Orders(" + this._orderID + ")";
            console.log(oModel.sServiceUrl + sPath);
            this.getView().bindElement(sPath);
        },

        onTabSelect: function(oEvent) {
            console.log("inside IconTabBar");
            var sKey = oEvent.getParameter("key");
            var sPath = "";
            switch (sKey) {
                case "CustomerAssociation":
                    console.log("inside CustomerAssociation");
                    sPath = "/Orders(" + this._orderID + ")/Customer";
                    break;
                case "EmployeeAssociation":
                    console.log("inside EmployeeAssociation");
                    sPath = "/Orders(" + this._orderID + ")/Employee";
                    break;
                case "Order_DetailsAssociation":
                    console.log("inside Order_DetailsAssociation");
                    sPath = "/Orders(" + this._orderID + ")/Order_Details";
                    this.getView().byId("idIconTabBarOrderDetailsTable").bindItems({
                        path: sPath,
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{OrderID}" }),
                                new sap.m.Text({ text: "{ProductID}" }),
                                new sap.m.Text({ text: "{UnitPrice}" }),
                                new sap.m.Text({ text: "{Quantity}" }),
                                new sap.m.Text({ text: "{Discount}" })
                            ]
                        })
                    });
                    break;
                case "ShipperAssociation":
                    console.log("inside ShipperAssociation");
                    sPath = "/Orders(" + this._orderID + ")/Shipper";
                    break;
            }
            this.getView().byId("idIconTabBar").bindElement(sPath);
        },
        onPressOpenFragment(){
            var oView = this.getView();
            if(!this.byId("dialogId")){
                Fragment.load({
                    id: oView.getId(),
                    name: "app.northwindobjectpage.fragment.poViewer",
                    controller : this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else{
                this.byId('dialogId').open();
            }
        },
        onPressCloseFragment(){
            this.byId("dialogId").close();
        }
    });
});