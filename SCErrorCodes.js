/*********************************************************************************************************
Purpose: Added this following code for defining error codes to use accross the Sales Efficiency Project
Author: Siva ADDALA (SADDALA) : Created on 10 OCT 2017.
**********************************************************************************************************/
if (typeof (SiebelApp.SCErrorCodes) === "undefined")
{

  SiebelJS.Namespace("SiebelApp.SCErrorCodes");
  define("siebel/custom/SelectComfort/SCErrorCodes", ["siebel/jqgridrenderer"],
    function ()
    {
      SiebelApp.SCErrorCodes = (function ()
      {


        var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
        var SCerrorcodes = new SCErrorCodes();

        function SCErrorCodes(pm)
        {}


        SCErrorCodes.prototype.errorcodes = function ()
        {
          var codes = {
            "SC_INVALID_EMAIL": "Email Address provided is invalid",
            "SC_REQUIRED_EMAIL": "Please enter an Email Address",
            "SC_REQUIRED_FIRST_NAME": "Please enter First Name",
            "SC_REQUIRED_LAST_NAME": "Please enter Last Name",
            "SC_REQUIRED_BIRTH_DATE": "Please enter Birth Date",
            "SC_REQUIRED_SOCIAL_SECURITY_NUMBER": "Please enter Social Security Number",
            "SC_REQUIRED_RESIDENTIAL_STATUS": "Please enter Residential Status",
            "SC_REQUIRED_HLATR": "Please enter number of years at your current residence.",
            "SC_REQUIRED_REQ_CRE_AMT": "Please enter Required Credit Amount",
            "SC_REQUIRED_CRE_AMT": "Please Enter Requested Credit Amount",
            "SC_REQUIRED_EMPLOYER": "Please enter Employer Name",
            "SC_REQUIRED_MONTHLY_NET_INCOME": "Please enter Monthly Net Income",
            "SC_REQUIRED_MONTHLY_HOME_PAYMENT": "Please enter Monthly Home Payment",
            "SC_REQUIRED_EMPLOYER_PHONE": "Please enter Employer Phone Number",
            "SC_REQUIRED_ADDRESS": "Please enter Address",
            "SC_REQUIRED_APT": "Please enter Apt/Suite# or Company Name",
            "SC_REQUIRED_CITY": "Please enter a City",
            "SC_REQUIRED_STATE": "Please select a State from the list",
            "SC_REUIRED_POSTAL_CODE": "Please enter a postal code",
            "SC_NO_RESULTS_FOUND": "No results found",
            "SC_MOBILE_NUMBER": "Please enter valid Phone Number",
            "SC_REQUIRED_MEDIA_CODE": "Please select a Media Code from the list",
            "SC_REQUIRED_REFERRED_INSIDER": "Please choose Referred By Insider",
            "SC_ACCOUNT_NAME": "Please enter Account Name",
            //NGOLLA for 585 defect
            "SC_CUSTOMER_SUB_TYPE": "Please enter Customer SubType",
            "SC_CITY": "Please enter a City",
            "SC_ZIPCODE": "Please enter a valid Postal Code",
            "SC_CELL_PHONE": "Please enter a valid Phone #",
            "SC_INVALID_HOME_PHONE": "Please enter a valid Home Phone #",
            "SC_WORK_PHONE": "Please enter a valid Work Phone #",
            "SC_EMPLOYER_PHONE_NUMBER": "Please enter Employer Phone Number",
            "SC_NUMBERS_ONLY": "Please enter numbers only-other characters are not allowed",
            "SC_REQUIRED_PHONE": "Please enter a Phone Number",
            //SADDALA for #574 tooltip
            "SC_REQUIRED_PHONE_CUST": "Please enter Primary Phone Number",
            "SC_REQUIRED_PHONE_EMPL": "Please enter Employer Phone Number",
            "SC_REQUIRED_DETDES": "Please enter a Detailed Description for the SR",
            "SC_REQUIRED_SR": "Please enter SR",
            "SC_REQUIRED_TYPE": "Please select Type from the list",
            "SC_REQUIRED_SRTYPE": "Please select SR Type from the list",
            "SC_REQUIRED_AREA": "Please select Area from the list",
            "SC_REQUIRED_SUBAREA": "Please select Sub-area from the list",
            "SC_REQUIRED_STATUS": "Please select Status from the list",
            "SC_REQUIRED_OPTY_NAME": "Please enter Opportunity Name",
            "SC_REQUIRED_SALES_TEAM": "Please enter Sales Team",
            "SC_REQUIRED_WHOLE_SALES_ORDER": "Please confirm if the order was a Whole Sales Order",
            "SC_REQUIRED_SKU": "Please select SKU# from the list",
            "SC_REQUIRED_INSTALLED_DATE": "Please enter Installed Date",
            "SC_REQUIRED_QUANTITY": "Please select Quantity from the list",
            "SC_REQUIRED_WARRENTY_NAME": "Please select Warranty from the list",
            "SC_REQUIRED_OREDER_REF": "Please enter Order Reference",
            "SC_FIRST_NAME_MAX_LENGTH": "Please enter upto 20 characters only",
            "SC_LAST_NAME_MAX_LENGTH": "Please enter upto 25 characters only",
            "SC_BIRTH_DATE_MAX_LENGTH": "Please enter upto 10 digits only",
            //NGOLLA 10/05/2018 added for DOB Tooltip
            "SC_BIRTH_DATE_LENGTH": "Please enter a valid DOB in MM/DD/YYYY format",
            "SC_SOCIAL_SECURITY_MAX_LENGTH": "Please enter upto 9 digits only",
            "SC_EMPOLYER_MAX_LENGTH": "Please enter upto 40 characters only",
            "SC_NET_INCOME_MAX_LENGTH": "Please enter upto 8 digits only",
            "SC_ZIP_CODE_MAX_LENGTH": "Please enter upto 14 digits only",
            "SC_PHONE_NUMBER_MAX_LENGTH": "Please enter upto 10 digits only",
            "SC_EMAIL_MAX_LENGTH": "Please enter upto 50 characters only",
            "SC_REALTIVE_NAME_MAX_LENGTH": "Please enter upto 40 characters only",
            "SC_REQ_CREDIT_MAX_LENGTH": "Please enter upto 26 digits only",
            "SC_CITY_FORMAT": "Please enter a valid City",
            "SC_OPTY_NAME_EXIST": "Opportunity Name already exists. Please choose another name",
            "SC_REQUIRED_PAYMENT_METHOD": "Please select Payment Method",
            "SC_REQUIRED_PAYMENT_TYPE": "Please select Payment Type",
            "SC_REQUIRED_ACCOUNT_NUMBER": "Please Enter Account Number",
            "SC_REQUIRED_ACTIVITY_TYPE": "Please Enter Type",
            "SC_REQUIRED_ORDER_COMMENTS": "Please Enter Manual Order Comments",
            "SC_INTEGER_HLATR": "Please enter full years only and exclude any months",
            "SC_NAME_REGEX": "Please enter valid name without special characters and numbers",
            //SPATIBAN:08/JULY/2019:Added for contcat Activites
            "SC_EMAILNOW_CATEGORY1": "Please select Category 1 from the list",
            "SC_EMAILNOW_CATEGORY2": "Please select Category 2 from the list",
            "SC_TRIALEXTENSION_REQ": "Please select Trial Extension date",
            "SC_ASSET_REQ": "Please select an Asset on Service Request first",
            //kavya:06/AUGUST/2019:Added for fianace
            "SC_PRIMARY_ID_TYPE": "Please select Primary Id Type",
            "SC_ISSUING_STATE": "Please select Issuing State",
            "SC_EXPR_MONTH": "Please Select Expiry Month",
            "SC_EXPR_YEAR": "Please Enter Expiry Year",
            "SC_PRIMARY_TYPE": "Please select Primary Id Type",
            "SC_ISSU_STATE": "Please Select Issuing State",
            "SC_EXP_MONTH": "Please Select Expiry Month",
            "SC_EXP_YEAR": "Please Enter Expiry Year",
            "SC_EXPR_MAX_LENGTH": "Please enter 2 digits only",
            "SC_EXPR_YEAR_MAX_LENGTH": "Please enter 4 digits only",
            "SC_EXP_MAX_LENGTH": "Please enter 2 digits only",
            "SC_EXP_YEAR_MAX_LENGTH": "Please enter 4 digits only",
            "SC_EXP_DATE": "Expiry date cannot be past",
            "SC_PHN_NUM": "Please Enter Phone Number",
            "SC_REQUIRED_ORDER_SUBREASON": "Please Enter Manual Order Sub Reason", //NTHARRE:Added for SFSTRY0001059
            "SC_REQUIRED_ORDER_COUPON": "Please Select Not Working Coupon",
            "SC_FINACCHELPCARD_LEN": "Account Number Should Be Minimum 7 Digits And Maximum 8 Digits",
            "SC_FINACCSYNCHRONY_LEN": "Account Number Should Be 16 Digits"
          };
          return codes;

        };

        SCErrorCodes.prototype.SalesorderErrorCodeMapping = function ()
        {
          var mappingcodes = {
            "1001": "ShippingError",
            "1002": "ShippingError",
            "1003": "ShippingError",
            "1004": "ShippingError",
            "1006-AK": "ShippingError",
            "1011": "ShippingError",
            "1013": "ShippingError",
            "1015": "ShippingError",
            "1010": "ShippingError",
            "1037": "ShippingError",
            "SC_INVALID_COUNTRY": "ShippingError",
            "1023": "ShippingError",
            "STORE_CUSTOMER": "ShippingError",
            "1036": "ShippingError",
            "SC_SHIP_ADDRESS_LINE": "ShippingError",
            "1006-HI": "ShippingError",
            "SC_SALES_AK": "ShippingError",
            "SC_SALES_HI": "ShippingError",
            "SC_SALES_SERVICE_PR_GU_VI": "ShippingError",
            "SC_SHIPVIA_CANADA": "ShippingError",
            "SC_SHIPVIA_USA": "ShippingError",
            "SC_MATACTCOM_NONHD": "ShippingError",
            "SC_DELIVERY_PHONE_HD": "ShippingError",
            "SC_INVALID_SHIPPING_ADDR": "ShippingError",
            "SC_VALID_SHIPVIA": "ShippingError",
            "SC_FRGHT_CALC": "ShippingError",
            "SC_FREIGHT_SHIPVIA": "ShippingError",
            "SC_ACCESSORY_ORDER": "ShippingError",
            "SC_RECD_AT_STORE_DUE_DATE": "ShippingError",
            "SC_COMMERCIAL_ORDER": "ShippingError",
            "SC_DISPLAY_RECDATSTR": "ShippingError",
            "SC_WHOLESALE_AK": "ShippingError",
            "SC_WHOLESALE_HI": "ShippingError",
            "SRO_RECD_AT_STORE": "ShippingError",
            "SC_DPV_FLAG": "ShippingError",
            "SC_CUST_ELIG": "ShippingError",
            "SC_RETAIL_ELIGIBLE": "LineDetailsError",
            "SC_REFEE_SALE_FEE": "LineDetailsError",
            "SC_REFEE_RTRN_FEE": "LineDetailsError",
            "SC_REFEE_SHIP_METHOD": "LineDetailsError",
            "SC_TERRITORY_SHIPFROM": "LineDetailsError",
            "SALES_ORDER_LABELS": "LineDetailsError",
            "SC_ORDER_NET_PRI": "LineDetailsError",
            "SC_QUANTITY": "LineDetailsError",
            "SC_DIS_RES": "LineDetailsError",
            "SC_GIFT_CARD": "LineDetailsError",
            "SC_PROD_ORDERABLE": "LineDetailsError",
            "SC_ELIGIBLE_ITEMS": "LineDetailsError",
            "SC_GIFT_CARD_QTY": "LineDetailsError",
            "SC_HDRCNCL_NEW_LINES": "LineDetailsError",
            "SC_CHECK_SERVICE_SKU": "LineDetailsError",
            "SC_INSTALL_ONLY": "LineDetailsError",
            "SC_REMOTE_SHIPVIA_WO_MATTRESS": "LineDetailsError",
            "SC_CREMOTE_SHIPVIA_WO_MATTRESS": "LineDetailsError",
            "SC_REMOTE_SHIPTO_CANADA": "LineDetailsError",
            "PROTPLAN1": "LineDetailsError",
            "PROTPLAN2": "LineDetailsError",
            "PROTPLAN3": "LineDetailsError",
            "1022": "OrderHeaderError",
            "SC_INVALID_BILLING_ADDR": "OrderHeaderError",
            "SC_LOYALTY_HOUSEHOLD": "OrderHeaderError",
            "SC_LOYALTY_INSIDER": "OrderHeaderError",
            "SC_LOYALTY_EMPLOYEE_ORDER": "OrderHeaderError",
            "SC_CONTACT_EMAIL_REQ": "ContactError",
            "SC_CUST_PHONE_HD": "ContactError",
            "BillTo_Contact_Email_Alert_003": "ContactError",
            "SC_REMOTE_SHIPVIA_W_MATTRESS": "ShippingError",
            "SC_SSERIES_FLEX_VALIDATION": "ShippingError",
            "TD-01": "ShippingError", //11Oct24;SL;Added for Tier Delivery
            "SC_BILL_TO_ADDR": "ShippingError", //10DEC24;PJAYASHA;Added for Bill to Addr
            "MULTI_PROTPLAN": "ShippingError", //VYADAVAL-23MAY2025:Added for Protection Plan
            "PROTPLAN1": "ShippingError", //VYADAVAL-23MAY2025:Added for Protection Plan
            "PROTPLAN2": "ShippingError", //VYADAVAL-23MAY2025:Added for Protection Plan
            "PROTPLAN3": "ShippingError", //VYADAVAL-23MAY2025:Added for Protection Plan
            "PROTPLAN_QTY": "ShippingError", //VYADAVAL-26JUN2025:Added for Protection Plan
            "RECD_FROM_TRUCK_RAPID_REPAIR": "ShippingError", //27Oct25;SL;Added for rapid repairs
            "NON_TRUCK_RAPID_REPAIR": "ShippingError", //27Oct25;SL;Added for rapid repairs
            "SC_NON_ELIG_ITM_RAPID_REPAIR": "ShippingError" //27Oct25;SL;Added for rapid repairs
          };
          return mappingcodes;

        };
        //payment page error codes
        SCErrorCodes.prototype.paymentErrorCodes = function ()
        {
          var mappingcodes = {
            "SC_INVALID_CCNumber": "You must enter a Credit Card #",
            "SC_INVALID_CVV": "You must enter a CVV #",
            "SC_INVALID_ExpMonth": "You must enter Expiration Month",
            "SC_INVALID_ExpYear": "You must enter Expiration Year",
            "SC_INVALID_PaymentAmount": "You must enter Payment amount greater than $0",
            "SC_REQUIRED_CHECKNUMBER": "You must enter Check #",
            "SC_REQUIRED_BANKROUTING": "You must enter Routing #",
            "SC_REQUIRED_ACCOUNTNUMBER": "You must enter Account Number #",
            "SC_REQUIRED_DRIVINGLICENSE": "You must enter a Driver’s License/Id Number",
            "SC_REGEX_DRIVINGLICENSE": "DL Number cannot include spaces or dashes, And for WA State, replace the '*' with a '0'",
            "SC_REQUIRED_DRIVINGLICENSESTATE": "You must select Driver’s license state",
            "SC_TRANSCATION_AMOUNT": "Payment Amount cannot exceed $6000 for Payment Method Check",
            "SC_INNERCRICLEREWARD": "You must select an Inner Circle Reward certificate or enter Account Number",
            "SC_REQUIRED_INNERCRICLEREWARD": "Inner Circle Reward Certificate is Required Field",
            "SC_REQUIRED_DOB": "You must enter Date of Birth",
            "SC_REWARD_AMOUNT": "Please ensure the payment amount is less than or equal to the value of the Reward certificate",
            "SC_INVALID_GCNumber": "You must enter a Gift Card #",
            "SC_INVALID_PIN": "You must enter a PIN"
          };
          return mappingcodes;
        };

        return SCerrorcodes;
      }());
      return "SiebelApp.SCErrorCodes";
    })
}