"use strict";



define('z-kart/Classes/URIClass', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var StringBuilder = function () {
        function StringBuilder() {
            _classCallCheck(this, StringBuilder);

            this.parts = [];
        }

        _createClass(StringBuilder, [{
            key: 'append',
            value: function append(part) {
                if (part) {
                    this.parts.push(part);
                }
                return this;
            }
        }, {
            key: 'toString',
            value: function toString() {
                return this.parts.join('/');
            }
        }]);

        return StringBuilder;
    }();

    var URI = function () {
        function URI(source) {
            _classCallCheck(this, URI);

            // Resource Names Maping ..
            this.sourceNames = {
                "customer": "customers",
                "product": "products",
                "cart": "carts",
                "order": "orders",
                "search": "searchs",
                "sessionData": "sessionData",
                "logout": "logout"

                // Thumb Uri Endpoint .
            };this.thumbURI = "http://localhost:8080/Z-Kart/api/v1";

            // getting the Real Source Name .
            this.source = this.sourceNames[source];
            this.isSourceId = false;

            for (var _len = arguments.length, sourceIds = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                sourceIds[_key - 1] = arguments[_key];
            }

            if (sourceIds.length === 1) {

                // Signle Id ..
                this.sourceId = sourceIds[0];
                this.isSourceId = true;
            } else if (sourceIds.length > 1) {

                // Multiple Ids Joining using '/' .
                this.sourceId = sourceIds.join('/');
                this.isSourceId = true;
            } else {

                // No source Id .
                this.sourceId = '';
            }
        }

        _createClass(URI, [{
            key: 'buildEndpoint',
            value: function buildEndpoint() {

                // Create an instance of StringBuilder
                var builder = new StringBuilder();

                builder.append(this.thumbURI) // Add thumbURI
                .append(this.source); // Add source

                if (this.isSourceId) {
                    builder.append(this.sourceId); // Add sourceId if it exists
                }

                return builder.toString(); // Return the constructed URI
            }
        }, {
            key: 'get',
            value: function get() {
                var method = "GET";
                return this.makePromise(this.buildEndpoint(), method, arguments.length <= 0 ? undefined : arguments[0]); // Call buildEndpoint
            }
        }, {
            key: 'post',
            value: function post() {
                var method = "POST";
                return this.makePromise(this.buildEndpoint(), method, arguments.length <= 0 ? undefined : arguments[0]); // Call buildEndpoint
            }
        }, {
            key: 'delete',
            value: function _delete() {
                var method = "DELETE";
                return this.makePromise(this.buildEndpoint(), method, arguments.length <= 0 ? undefined : arguments[0]); // Call buildEndpoint
            }
        }, {
            key: 'put',
            value: function put() {
                var method = "PUT";
                return this.makePromise(this.buildEndpoint(), method, arguments.length <= 0 ? undefined : arguments[0]); // Call buildEndpoint
            }
        }, {
            key: 'makePromise',
            value: function makePromise(uriEndpoint, method, body) {
                return new Ember.RSVP.Promise(function (resolve, reject) {
                    Ember.$.ajax({
                        url: uriEndpoint,
                        method: method,
                        data: Ember.$.param(body),
                        xhrFields: {
                            withCredentials: true
                        },

                        dataType: 'json',
                        success: function success(data) {
                            resolve(data);
                        },
                        error: function error(jqXHR) {
                            reject(jqXHR);
                        }
                    });
                });
            }
        }]);

        return URI;
    }();

    exports.default = URI;
});
define('z-kart/app', ['exports', 'z-kart/resolver', 'ember-load-initializers', 'z-kart/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('z-kart/components/add-edit-product', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        availableCategories: [], // Add as needed
        selectedCategories: [],

        didInsertElement: function didInsertElement() {
            var _this = this;

            this.set('availableCategories', ['Smartphones', 'Smartwatches', 'Home Appliance', 'Gaming', 'Computer Components', 'Audio', 'Headphones', 'Laptops', 'Tablets', 'Cameras', 'Drones']);

            if (this.get("category")) {
                this.set('selectedCategories', this.get("category").split(","));
                this.set('availableCategories', this.availableCategories.filter(function (category) {
                    return !_this.selectedCategories.includes(category);
                }));
            } else {
                this.set('selectedCategories', []);
            }
        },


        actions: {
            toggleDropdown: function toggleDropdown() {

                console.log(" toggle DropDown action is triggered . ");
                this.toggleProperty('showDropdown');
            },
            selectCategory: function selectCategory(category) {
                this.set("categoryError", undefined);
                this.selectedCategories.pushObject(category);
                this.availableCategories.removeObject(category);
                this.set("category", this.selectedCategories.join(","));
                this.set('showDropdown', false);
            },
            removeCategory: function removeCategory(category) {
                this.availableCategories.pushObject(category);
                this.selectedCategories.removeObject(category);
                this.set("category", this.selectedCategories.join(","));
            },
            back: function back() {
                this.get("triggerBack")();
            },
            onSubmit: function onSubmit() {
                var _this2 = this;

                var name = this.get('name');
                var brand = this.get('brand');
                var model = this.get('productModel');
                var category = this.get('selectedCategories').join(",");
                var stock = this.get('stock');
                var price = this.get('price');
                var image = this.get('image') ? this.get('image') : "https://ih1.redbubble.net/image.533910704.5853/fposter,small,wall_texture,product,750x1000.u3.webp";

                var body = {
                    name: name,
                    brand: brand,
                    model: model,
                    category: category,
                    stock: stock,
                    price: price,
                    image: image
                };

                var uri;
                if (this.get('selectedCategories.length') > 0) {
                    if (this.get("isEdit") === true) {

                        uri = new _URIClass.default("product", this.get("productId"));
                        uri.put(body).then(function (data) {

                            if (data["message"] === true) {

                                body["product_id"] = _this2.get("productId");

                                _this2.get("triggerUpdate")(body);
                            } else {
                                _this2.set("error", " try again ! ");
                            }
                        }).catch(function (error) {
                            _this2.get("triggerAfterError")(error);
                        });
                    } else {

                        uri = new _URIClass.default("product");
                        uri.post(body).then(function (data) {
                            if (data["message"] != "null") {
                                body["product_id"] = data["message"];
                                _this2.get("triggerAddedProduct")(body);
                            } else {
                                _this2.set("error", " try again ! ");
                            }
                        }).catch(function (error) {
                            console.log(error);
                            _this2.get("triggerAfterError")(error);
                        });
                    }
                } else {
                    this.set("categoryError", " categories are not selected ");
                }
            },
            validateStock: function validateStock(event) {

                if (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }
            },
            storeStock: function storeStock(event) {

                this.set("stock", event.target.value);
            },
            validatePrice: function validatePrice(event) {

                if (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }
            },
            storePrice: function storePrice(event) {

                this.set("price", event.target.value);
            }
        }

    });
});
define('z-kart/components/add-edit-user', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        passwordComplexity: Ember.inject.service("passwordcomplexity"),
        isCheckPassword: false,
        isCheckConfirmPassword: false,
        isPasswordsMatched: false,
        isMobile: false,
        submitForm: false,

        addError: function addError(message) {
            if (!this.errors.includes(message)) {
                this.errors.pushObject(message);
            }
        },
        didInsertElement: function didInsertElement() {

            this.set("errors", Ember.A([]));
        },
        removeError: function removeError(message) {
            this.errors.removeObject(message);
        },
        checkEmail: function checkEmail(email) {
            var _this = this;

            var body = { "email": email, "sendOtp": 0 };
            var uri = new _URIClass.default("customer");

            if (!this.get("customersData").map(function (item) {
                return item.email;
            }).includes(email) && !this.get("adminsData").map(function (item) {
                return item.email;
            }).includes(email)) {
                uri.get(body).then(function (data) {
                    if (data["message"] === true) {
                        _this.set("submitForm", false);
                        _this.set("emailError", " User already exists !");
                    } else {
                        _this.set("submitForm", true);
                        _this.set("emailVaild", true);
                        _this.set("emailError", undefined);
                    }
                }).catch(function (error) {
                    _this.get("trigerAfterError")(error);
                });
            } else {
                this.set("emailError", " User already exists !");
            }
        },


        isAllowOtp: Ember.computed("isCheckConfirmPassword", "isCheckPassword", "isPasswordsMatched", "isMobile", "submitForm", "toggleForm", function () {
            return this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched && this.isMobile && this.submitForm && this.toggleForm;
        }),

        actions: {
            clearEmailError: function clearEmailError() {
                this.set("emailError", undefined);
            },
            clearNameError: function clearNameError() {
                this.set("nameError", undefined);
            },
            clearMobileError: function clearMobileError() {
                this.set("mobileError", undefined);
            },
            clearAddressError: function clearAddressError() {
                this.set("addressError", undefined);
            },
            checkName: function checkName() {
                if (this.get("name") && this.get("name").trim() !== "") {
                    this.set("nameError", undefined);
                } else {
                    this.set("nameError", " Please Enter The Name . ");
                }
            },
            checkAddress: function checkAddress() {
                if (this.get("address") && this.get("address").trim() !== "") {
                    this.set("addressError", undefined);
                } else {
                    this.set("addressError", " Please Enter an Address . ");
                }
            },
            next: function next() {

                this.set("toggleForm", true);
                if (!this.get("name") || this.get("name") && this.get("name").trim() === "") {
                    this.set("nameError", " Please Enter The Name .");
                    this.set("toggleForm", false);
                }

                if (!this.get("address") || this.get("address") && this.get("address").trim() === "") {
                    this.set("addressError", " Please Enter An Address .");
                    this.set("toggleForm", false);
                }

                if (!this.get("email") || this.get("email") && this.get("email").trim() === "") {
                    this.set("emailError", " Please Enter An Email .");
                    this.set("toggleForm", false);
                }

                if (!this.get("mobile") || this.get("mobile") && this.get("mobile").trim() === "") {
                    this.set("mobileError", " Please Enter an indian Mobile number .");
                    this.set("toggleForm", false);
                }

                if (!this.get("password") || this.get("password") && this.get("password").trim() === "") {
                    this.set("passwordError", " Please Enter a Password .");
                    this.set("toggleForm", false);
                }

                if (!this.get("passwordConfirm") || this.get("passwordConfirm") && this.get("passwordConfirm").trim() === "") {
                    this.set("confirmPasswordError", " Please Enter a Confirm Password .");
                    this.set("toggleForm", false);
                }
            },
            backToEmail: function backToEmail() {
                this.set("toggleForm", false);
            },
            back: function back() {
                console.log("triggered Back ");
                this.get("triggerBack")();
            },
            checkEmailPattern: function checkEmailPattern() {
                var value = this.get("email");
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                this.set("submitForm", false);
                this.set("error", undefined);
                this.set("emailError", undefined);
                this.set("emailVaild", false);

                if (emailPattern.test(value)) {
                    this.checkEmail(value);
                } else {
                    this.set("emailError", "Email invalid");
                }
            },
            validateMobile: function validateMobile(event) {
                var value = event.target.value;
                if (value.length > 9 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }
            },
            storeMobile: function storeMobile(event) {

                this.set("error", undefined);
                this.set("mobile", event.target.value);
                this.set("mobileError", undefined);
                this.set("isMobile", false);

                if (event.target.value.length === 10) {
                    this.set("isMobile", true);
                } else {
                    this.set("mobileError", "The Mobile Number Must be 10 digits Indian Number.");
                    this.set("isMobile", false);
                }
            },
            checkPassword: function checkPassword(event) {
                this.set("error", undefined);
                var password = event.target.value;
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password);
                this.set("isCheckPassword", isValid);
                this.set("passwordError", undefined);

                if (!isValid) {
                    this.set("passwordError", "Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6.");
                } else {
                    this.set("passwordError", undefined);
                }

                this.set("password", password);
                this.set("passwordConfirm", "");
                this.set("isCheckConfirmPassword", false);
            },
            checkConfirmPassword: function checkConfirmPassword(event) {

                this.set("error", undefined);
                var confirmPassword = event.target.value;
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(confirmPassword);
                var matched = this.get("password") === confirmPassword;
                this.set("confirmPasswordError", undefined);

                if (!isValid && matched) {
                    this.set("confirmPasswordError", "Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6.");
                } else if (isValid && !matched) {
                    this.set("confirmPasswordError", "Passwords do not match.");
                } else if (!isValid && !matched) {
                    this.set("confirmPasswordError", "Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6 and passwords don't match.");
                } else {
                    this.set("confirmPasswordError", undefined);
                }

                this.set("passwordConfirm", confirmPassword);
                this.set("isCheckConfirmPassword", isValid);
                this.set("isPasswordsMatched", matched);
            },
            onSubmit: function onSubmit() {
                var _this2 = this;

                if (this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched && this.isMobile && this.submitForm || this.get("isEdit") && this.get("mobile").length === 10) {

                    if (this.get("isEdit")) {

                        var body = {
                            "name": this.get("name"),
                            "mobile": this.get("mobile"),
                            "address": this.get("address"),
                            "userType": this.get('selectedOption')
                        };

                        var uri = new _URIClass.default("customer", this.get("customerId"));

                        uri.put(body).then(function (data) {

                            if (data["message"] === true) {

                                body["customer_id"] = _this2.get("customerId");
                                _this2.get("triggerEditedUser")(body);
                            } else {

                                _this2.set("error", " try again ! ");
                            }
                        }).catch(function (error) {

                            _this2.get("trigerAfterError")(error);
                        });
                    } else {

                        var body = {
                            "email": this.get("email"),
                            "name": this.get("name"),
                            "mobile": this.get("mobile"),
                            "address": this.get("address"),
                            "password": btoa(this.get("password")),
                            "otp": this.get("otp"),
                            "userType": this.get('selectedOption')
                        };

                        console.log(" came to the Registration .", body);

                        var uri = new _URIClass.default("customer");

                        uri.post(body).then(function (data) {

                            console.log("executed", data["message"] !== null);

                            if (data["message"] != "null") {

                                body["customer_id"] = data["message"];
                                console.log(body);
                                _this2.get("triggerAddedUser")(body);
                            } else {
                                _this2.set("error", "Invalid OTP");
                            }
                        }).catch(function (error) {

                            _this2.get("triggerAfterError")(error);
                        });
                    }
                }
            },


            togglePasswordVisibility: function togglePasswordVisibility() {
                this.toggleProperty('showPassword'); // Toggle the visibility of the old password
            },
            toggleNewPasswordVisibility: function toggleNewPasswordVisibility() {
                this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
            },

            // validate OTP .
            validateOtp: function validateOtp(event) {
                var value = event.target.value;

                if (value.length > 3 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                } else {
                    this.set("otp", value);
                }
            },


            // Store OTP
            storeOtp: function storeOtp(event) {

                var value = event.target.value;

                this.set("otp", value);
            }
        }
    });
});
define("z-kart/components/admin-nav-bar-lis", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Changing The Color OF the icon when it is Clicked .
        toggleColors: function toggleColors(colorParam) {
            this.set("customerColor", "black");
            this.set("productColor", "black");
            this.set("adminColor", "black");
            this.set("orderColor", "black");
            this.set(colorParam, "blueviolet");
        },


        actions: {
            addProduct: function addProduct() {
                this.get("triggerAddProduct")();
            },
            addCustomer: function addCustomer() {
                console.log(" triggering the add user . ");
                this.get("triggerAddUser")();
            },


            // Triggering The displayCustomers action of its Parent .
            callDisplayCustomers: function callDisplayCustomers() {
                this.toggleColors("customerColor");
                this.get("triggerCallDisplayCustomers")();
            },


            // Triggering The displayProducts action of its Parent .
            callDisplayProducts: function callDisplayProducts() {
                this.toggleColors("productColor");
                this.get("triggerCallDisplayProducts")();
            },


            // Triggering The displayAdmins action of its Parent .
            callDisplayAdmins: function callDisplayAdmins() {
                this.toggleColors("adminColor");
                this.get("triggerCallDisplayAdmins")();
            },


            // Triggering The displayOrders action of its Parent .
            callDisplayOrders: function callDisplayOrders() {
                this.toggleColors("orderColor");
                this.get("triggerCallDisplayOrders")();
            }
        }
    });
});
define("z-kart/components/admin-nav-bar", ["exports"], function (exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
            value: true
      });
      exports.default = Ember.Component.extend({

            // toggling the Search Bar 
            toggleProperties: function toggleProperties(param) {
                  this.set("customer", false);
                  this.set("product", false);
                  this.set("admin", false);
                  this.set("order", false);
                  this.set(param, true);
            },


            // Only for Super Admin ( user type === 2) .
            allowAddCustomer: Ember.computed(function () {
                  return Ember.getOwner(this).lookup("route:application").modelFor("application").user_type === 2;
            }),

            actions: {
                  back: function back() {
                        this.set("isAddProduct", false);
                        this.set("isAddUser", false);
                  },
                  addProduct: function addProduct() {
                        this.set("isAddProduct", true);
                  },
                  addedProduct: function addedProduct(body) {
                        console.log(" triggered added Product ");
                        this.set("isAddProduct", false);
                        this.get("triggerAddedProduct")(body);
                  },
                  addCustomer: function addCustomer() {
                        this.set("isAddUser", true);
                        this.set('selectedOption', 0);
                        this.set('customer', 0);
                        this.set('admin', 1);
                  },
                  addedUser: function addedUser(body) {
                        this.set("isAddUser", false);
                        this.get("triggerAddedUser")(body);
                  },


                  // To Show The Icons In Mobile View . 
                  showList: function showList() {
                        this.toggleProperty("isMenuVisible");
                  },

                  // Trigger the parent action
                  callDisplayCustomers: function callDisplayCustomers() {
                        this.toggleProperties("customer");
                        this.get('triggerDisplayCustomers')();
                  },


                  // Trigger the parent action
                  callDisplayProducts: function callDisplayProducts() {
                        this.toggleProperties("product");
                        this.get('triggerDisplayProducts')();
                  },


                  // Trigger the parent action
                  callDisplayAdmins: function callDisplayAdmins() {
                        this.toggleProperties("admin");
                        this.get('triggerDisplayAdmins')();
                  },


                  // Trigger the parent action
                  callDisplayOrders: function callDisplayOrders() {
                        this.toggleProperties("order");
                        this.get('triggerDisplayOrders')();
                  },


                  // Trigger The search parent action 
                  searchProducts: function searchProducts(event) {
                        this.get("triggerProductsSearch")(event.target.value);
                  },


                  // Trigger The search parent action 
                  searchCustomers: function searchCustomers(event) {
                        this.get("triggerCustomersSearch")(event.target.value);
                  },


                  // Trigger The search parent action 
                  searchOrders: function searchOrders(event) {
                        console.log(event.target.value, " data ");
                        this.get("triggerOrdersSearch")(event.target.value);
                  },


                  // Trigger The search parent action 
                  searchAdmins: function searchAdmins(event) {
                        this.get("triggerAdminsSearch")(event.target.value);
                  }
            }
      });
});
define("z-kart/components/alert-pop", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        actions: {
            // Triggering The Back parent action
            back: function back() {
                this.get("triggerBack")();
            },


            // Triggering The Confrim parent action
            confirm: function confirm(id) {
                this.get("triggerConfrim")(id);
            }
        }
    });
});
define('z-kart/components/authentication-layout', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define("z-kart/components/cart-product", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        actions: {

            // To Update The Count Of Cart product Triggering Parent Action
            updateCount: function updateCount(param) {
                this.get("triggerUpdateCount")(param);
            },


            // To Update The Count Of Cart product Triggering Parent Action
            deleteProduct: function deleteProduct(id) {
                this.get("triggerDeleteProduct")(id);
            }
        }
    });
});
define('z-kart/components/change-password', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        passwordComplexity: Ember.inject.service("passwordcomplexity"),

        // Default Values ..
        isCheckPassword: false,
        isCheckConfirmPassword: false,
        isPasswordsMatched: false,
        isPasswordNew: false,

        actions: {

            // Triggering The Back Parent Action .
            back: function back() {
                this.get('triggerBack')();
            },


            // Checking the New Password Complexity .
            checkPassword: function checkPassword(event) {

                var password = event.target.value;
                this.set("password", password);
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
                this.set("isCheckPassword", isValid);
                this.set("passwordError", undefined);
                this.set("error", undefined);
                console.log(isValid, " password . ");

                if (password != "") {
                    if (!isValid) {
                        this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
                    } else {
                        this.set("passwordError", undefined);
                    }
                }
            },


            // Checking the Old Password Complexity .
            checkOldPassword: function checkOldPassword(event) {
                var _this = this;

                var applicationRoute = Ember.getOwner(this).lookup('route:application');
                var customerId = applicationRoute.get('currentModel.customer_id'); // Accessing customer_id or the model you need
                this.set("oldPassword", event.target.value);
                var uri = new _URIClass.default("customer", customerId);
                this.set("error", undefined);
                this.set("oldPasswordError", undefined);

                if (this.settingTimeout) {
                    clearTimeout(this.settingTimeout);
                }

                this.settingTimeout = setTimeout(function () {
                    if (_this.get("oldPassword") !== "") {

                        uri.get({
                            "password": btoa(_this.get("oldPassword"))
                        }).then(function (data) {

                            if (_this.isDestroyed || _this.isDestroying) {
                                return; // Exit if the component has been destroyed
                            }

                            if (data["message"] === false) {
                                _this.set("oldPasswordError", "the old password is invalid");
                                _this.set("isPasswordNew", false);
                                _this.set("changeAllow", false);
                            } else {
                                _this.set("oldPasswordError", undefined);
                                _this.set("changeAllow", true);
                                _this.set("isPasswordNew", true);
                            }
                        }).catch(function (error) {
                            _this.get("triggerAfterError")(error);
                        });
                    }
                }, 1000);
            },


            // Checking the Confirm Password Complexity .
            checkConfirmPassword: function checkConfirmPassword(event) {

                var password = event.target.value;
                this.set("passwordConfirm", password);
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
                this.set("isCheckPassword", isValid);
                var matched = this.get("password") === this.get("passwordConfirm");
                this.set("confirmPasswordError", undefined);
                this.set("error", undefined);

                if (password != "") {
                    if (!isValid && matched) {
                        this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                    } else if (isValid && !matched) {
                        this.set("confirmPasswordError", " Passwords Not Matched ");
                    } else if (!isValid && !matched) {
                        this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                    } else {
                        this.set("confirmPasswordError", undefined);
                    }
                }

                this.set("isCheckConfirmPassword", isValid);
                this.set("isPasswordsMatched", matched);
            },


            // On Submitting the Forming .
            onSubmit: function onSubmit() {
                var _this2 = this;

                if (this.isCheckConfirmPassword && this.isPasswordNew && this.isCheckPassword && this.isPasswordsMatched) {
                    this.set("isLoader", true);
                    var body = {
                        "password": btoa(this.get("passwordConfirm"))
                    };

                    var customerId = Ember.getOwner(this).lookup("route:application").modelFor("application").customer_id;

                    var uri = new _URIClass.default('customer', customerId);

                    uri.put(body).then(function (data) {

                        _this2.set("isLoader", false);

                        if (data["message"] === true) {
                            _this2.get("triggerChangePassword")(data["message"]);
                        } else {
                            _this2.set("error", " This Password is Already used !.");
                        }
                    }).catch(function (error) {
                        _this2.set("isLoader", false);

                        _this2.get("triggerAfterError")(error);
                    });
                }
            },


            togglePasswordVisibility: function togglePasswordVisibility() {
                this.toggleProperty('showPassword'); // Toggle the visibility of the confrim password
            },
            toggleOldPasswordVisibility: function toggleOldPasswordVisibility() {
                this.toggleProperty('showOldPassword'); // Toggle the visibility of the old password
            },
            toggleNewPasswordVisibility: function toggleNewPasswordVisibility() {
                this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
            }

        }
    });
});
define('z-kart/components/customers-table', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Allow Super Admin 
        allowSuperAdmin: Ember.computed(function () {
            return Ember.getOwner(this).lookup("route:application").modelFor("application").user_type === 2;
        }),

        actions: {

            // Triggering The Parent action 

            back: function back() {

                this.set("alertPopup", false);
                this.set("isEdit", false);
            },
            editUser: function editUser(customer) {

                var model = Ember.getOwner(this).lookup("route:application").modelFor("application");

                this.set("isEdit", true);
                this.set("isSelfAdmin", customer.customer_id === model.customer_id);
                this.set("isAdmin", model.user_type > 1);

                this.set("name", customer.name);
                this.set("mobile", customer.mobile);
                this.set("address", customer.address);
                this.set("customerId", customer.customer_id);
                console.log(" Customer Type : ", customer.user_type);
                this.set('selectedOption', customer.user_type);
                this.set('customer', 0);
                this.set('admin', 1);
            },
            editedUser: function editedUser(body) {

                console.log(" triggered in customer table .");
                console.log(body);
                this.set("isEdit", false);
                this.get("triggerUpdateCustomer")(body);
            },

            // Delete Pop Up enabling .
            deleteCustomer: function deleteCustomer(customerId) {
                this.set("deleteCustomerId", customerId);
                this.set("alertPopup", true);
            },


            // Deleting the Customer After Confirmation .
            deleteCustomerConfirm: function deleteCustomerConfirm(customerId) {
                var _this = this;

                this.set("alertPopup", false);
                var uri = new _URIClass.default("customer", customerId);

                uri.delete().then(function (data) {
                    if (data["message"] === true) {
                        _this.get("triggerReloadCustomer")(customerId);
                    }
                }).catch(function (error) {
                    var status = error.status; // Get status code
                    var message = encodeURIComponent(error.statusText); // Get status text

                    // Navigate to the error route with code and message
                    _this.transitionTo('errorpage', status, message);
                });
            }
        }
    });
});
define("z-kart/components/filter-bar", ["exports", "z-kart/Classes/URIClass"], function (exports, _URIClass) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    filterStore: Ember.inject.service("filter-store"),
    // Categories Storing ..
    categories: Ember.A([]),

    // Models Storing ..
    models: Ember.A([]),

    // Brands Storing ..
    brands: Ember.A([]),

    lowPrice: undefined,

    highPrice: undefined,

    // After insertion fetching the Categories .
    didInsertElement: function didInsertElement() {
      // Restore lowPrice and highPrice from localStorage if available
      var savedLowPrice;
      var savedHighPrice;
      var savedBrands;
      var savedModels;
      var savedCategories;
      var savedFilteredProducts;

      this.set("inserted", true);

      if (this.get("isGlobal") === true) {
        this.fetchDataIsGlobal("category");
      } else {
        this.fetchData("category");
      }

      if (this.get("isGlobal") === true) {

        console.log(" Stored Categories Data . ", this.get("filterStore.globalLowPrice"));

        savedLowPrice = this.get("filterStore.globalLowPrice");
        savedHighPrice = this.get("filterStore.globalHighPrice");;
        savedBrands = this.get("filterStore.globalBrands");
        savedModels = this.get("filterStore.globalModels");;
        savedCategories = this.get("filterStore.globalCategories");
        savedFilteredProducts = this.get("filterStore.globalFilteredProducts");
      } else {

        savedLowPrice = this.get("filterStore.localLowPrice");
        savedHighPrice = this.get("filterStore.localHighPrice");;
        savedBrands = this.get("filterStore.localBrands");
        savedModels = this.get("filterStore.localModels");;
        savedCategories = this.get("filterStore.localCategories");
        savedFilteredProducts = this.get("filterStore.localFilteredProducts");
      }

      this.set('lowPrice', savedLowPrice);
      this.set('highPrice', savedHighPrice);
      this.set('brands', savedBrands || Ember.A([]));
      this.set('models', savedModels || Ember.A([]));
      this.set('categories', savedCategories || Ember.A([]));
      this.set('filteredProducts', savedFilteredProducts);
    },


    filterCount: Ember.computed("filteredProducts", "submitFilter", function () {

      if (this.get("submitFilter") && this.get("filteredProducts")) {
        return this.get("filteredProducts").length;
      }

      return undefined;
    }),

    willDestroyElement: function willDestroyElement() {

      this._super.apply(this, arguments);

      console.log(" the low price while destroying ", this.get("lowPrice"));

      if (this.get("isGlobal") === true) {

        this.get("filterStore").addGlobal(this.get("categories"), this.get("brands"), this.get("models"), this.get("highPrice"), this.get("lowPrice"), this.get("filteredProducts"));
      } else {

        this.get("filterStore").addLocal(this.get("categories"), this.get("brands"), this.get("models"), this.get("highPrice"), this.get("lowPrice"), this.get("filteredProducts"));
      }
    },


    // Checking If the Categories Are there Are Not .
    isCategories: Ember.computed("categories.length", function () {

      if (!this.get("inserted")) {
        this.set('models', Ember.A([]));
        this.set('brands', Ember.A([]));
      }

      return this.get('categories.length') > 0;
    }),

    isBrands: Ember.computed("brands.length", function () {

      if (!this.get("inserted")) {
        this.set('models', Ember.A([]));
      } else {
        this.set("inserted", false);
      }

      return this.get('brands.length') > 0;
    }),

    isModels: Ember.computed("models.length", function () {

      return this.get('models.length') > 0;
    }),

    isPrices: Ember.computed("lowPrice", "highPrice", function () {

      var lowPrice = this.get("lowPrice");
      var highPrice = this.get("highPrice");

      // Check if lowPrice and highPrice are valid numbers (not undefined, empty string, or null)
      var isHighPriceValid = highPrice !== undefined && highPrice !== "" && highPrice !== null;
      var isLowPriceValid = lowPrice !== undefined && lowPrice !== "" && lowPrice !== null;

      return isLowPriceValid || isHighPriceValid;
    }),

    // global filter
    filter: function filter() {
      var _this = this;

      if (this.get("categories").length > 0 && (this.get("brands").length > 0 .length > 0 || this.get("models") || this.get("lowPrice") || this.get("highPrice"))) {
        this.set("load", true);
        var body = {
          "filterCategories": this.get("categories").join(","),
          "filterBrands": this.get("brands").join(","),
          "filterModels": this.get("models").join(","),
          "filterLowPrice": isNaN(parseInt(this.get("lowPrice"))) ? null : parseInt(this.get("lowPrice")),
          "filterHighPrice": isNaN(parseInt(this.get("highPrice"))) ? null : parseInt(this.get("highPrice"))

          // Clear the previous timeout if it exists
        };if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }

        // Set a new timeout for 1 seconds
        this.searchTimeout = setTimeout(function () {

          if (_this.get("isGlobal") === true) {
            new _URIClass.default("search").get(body).then(function (data) {

              _this.set("filteredProducts", data);
              _this.set("load", false);
            }).catch(function (error) {

              console.log(error);

              _this.get("triggerAfterError")(error);
            });
          } else {
            _this.set("load", false);
            var filteredProducts = _this.filterProducts(_this.get("data"), body);
            _this.set("filteredProducts", filteredProducts);
          }
        }, 2000); // 2 seconds debounce time

      }
    },


    // Filtering The Products Locally with AND logic for all filters
    filterProducts: function filterProducts(products, filters) {
      var models = filters.filterModels ? filters.filterModels.split(",").map(function (m) {
        return m.toLowerCase().trim();
      }) : [];
      var brands = filters.filterBrands ? filters.filterBrands.split(",").map(function (b) {
        return b.toLowerCase().trim();
      }) : [];
      var categories = filters.filterCategories ? filters.filterCategories.split(",").map(function (c) {
        return c.toLowerCase().trim();
      }) : [];
      var lowPrice = filters.filterLowPrice || 0;
      var highPrice = filters.filterHighPrice || Infinity;

      return products.filter(function (product) {
        var productCategory = product.category.toLowerCase().split(",").map(function (cat) {
          return cat.trim();
        });
        var productModel = product.model.toLowerCase().trim();
        var productBrand = product.brand.toLowerCase().trim();

        // Check if the product's category is in the provided categories
        var categoryMatch = categories.length === 0 || productCategory.some(function (cat) {
          return categories.includes(cat);
        });

        // Check if the product's price falls within the range
        var priceMatch = product.price >= lowPrice && product.price <= highPrice;

        // Check if the product's model is in the provided models
        var modelMatch = models.length === 0 || models.includes(productModel);

        // Check if the product's brand is in the provided brands
        var brandMatch = brands.length === 0 || brands.includes(productBrand);

        // Return true only if all conditions are met (AND logic for all filters)
        return categoryMatch && priceMatch && modelMatch && brandMatch;
      });
    },


    submitFilter: Ember.computed("categories.length", "lowPrice", "highPrice", function () {
      var categoriesLength = this.get('categories.length') || 0; // Default to 0 if undefined
      var lowPrice = parseFloat(this.get("lowPrice")) || 0; // Convert lowPrice to a number, default to 0 if NaN
      var highPrice = parseFloat(this.get("highPrice")) || Infinity; // Convert highPrice to a number, default to Infinity if NaN

      // Check if lowPrice and highPrice are valid numbers
      var isHighPriceValid = this.get("highPrice") === undefined || this.get("highPrice") === "" || highPrice >= 0;
      var isLowPriceValid = this.get("lowPrice") === undefined || this.get("lowPrice") === "" || lowPrice >= 0;

      // Ensure lowPrice is less than or equal to highPrice
      var isPriceRangeValid = lowPrice <= highPrice;

      // Return true only if all conditions are met
      return categoriesLength > 0 && isLowPriceValid && isHighPriceValid && isPriceRangeValid;
    }),

    // toggling the filter options .
    toggleData: function toggleData(param) {

      this.set("iscategory", false);
      this.set("isbrand", false);
      this.set("ismodel", false);
      this.set("isprice", false);
      this.set(param, true);
    },


    // fetch the data locally.. 
    fetchData: function fetchData(param) {

      console.log(param);
      if (param === "category") {
        var categories = this.get("data").flatMap(function (product) {
          return product[param].split(',');
        }) // Split comma-separated values and flatten
        .map(function (name) {
          return name.trim().toLowerCase();
        }) // Trim any extra spaces
        .filter(function (name, index, self) {
          return self.indexOf(name) === index;
        }); // Ensure uniqueness

        this.set(param + "data", categories);
        this.toggleData("is" + param);
      } else if (param === "model") {

        var cat = this.categories; // Array of categories to filter by
        var brands = this.brands;

        var catego = this.get("data").filter(function (product) {
          return product.brand.split(',').some(function (brand) {
            return brands.includes(brand.trim().toLowerCase()) && product.category.split(',').some(function (category) {
              return cat.includes(category.trim().toLowerCase());
            });
          });
        }) // Filter by categories that match any value in the cat array
        .map(function (product) {
          return product[param].toLowerCase();
        }) // Get the specific parameter for each filtered product
        .filter(function (name, index, self) {
          return self.indexOf(name) === index;
        }); // Remove duplicates

        this.set(param + "data", catego); // Set the unique values in the data property
        this.toggleData("is" + param); // Toggle some state related to param  

      } else {
        var cat = this.categories; // Array of categories to filter by

        var _catego = this.get("data").filter(function (product) {
          return product.category.split(',').some(function (category) {
            return cat.includes(category.trim().toLowerCase());
          });
        }) // Filter by categories that match any value in the cat array
        .map(function (product) {
          return product[param].toLowerCase();
        }) // Get the specific parameter for each filtered product
        .filter(function (name, index, self) {
          return self.indexOf(name) === index;
        }); // Remove duplicates

        this.set(param + "data", _catego); // Set the unique values in the data property
        this.toggleData("is" + param); // Toggle some state related to param      
      }
    },


    // fetch the products globally ..
    fetchDataIsGlobal: function fetchDataIsGlobal(param) {
      var _this2 = this;

      var uri = new _URIClass.default("product");

      if (param === "brand") {
        uri.get({
          "filterColumns": param,
          "filterCategory": this.categories.join(",")
        }).then(function (data) {

          var uniqueArray = data.map(function (entry) {
            return entry.split(',')[0].trim();
          }).filter(function (item, index) {
            return data.map(function (entry) {
              return entry.split(',')[0].trim();
            }).indexOf(item) === index;
          });

          _this2.set(param + "data", uniqueArray);
          _this2.toggleData("is" + param);
        }).catch(function (error) {

          console.log(error);
          _this2.get("triggerAfterError")(error);
        });
      } else if (param === "model") {

        uri.get({
          "filterColumns": param,
          "filterCategory": this.categories.join(","),
          "filterBrand": this.brands.join(",")
        }).then(function (data) {

          var uniqueArray = data.map(function (entry) {
            return entry.split(',')[0].trim();
          }).filter(function (item, index) {
            return data.map(function (entry) {
              return entry.split(',')[0].trim();
            }).indexOf(item) === index;
          });

          _this2.set(param + "data", uniqueArray);
          _this2.toggleData("is" + param);
        }).catch(function (error) {

          console.log(error);
          _this2.get("triggerAfterError")(error);
        });
      } else {

        uri.get({
          "filterColumns": param
        }).then(function (data) {

          var uniqueArray = data.map(function (entry) {
            return entry.split(',')[0].trim();
          }).filter(function (item, index) {
            return data.map(function (entry) {
              return entry.split(',')[0].trim();
            }).indexOf(item) === index;
          });

          _this2.set(param + "data", uniqueArray);
          _this2.toggleData("is" + param);
        }).catch(function (error) {

          console.log(error);
          _this2.get("triggerAfterError")(error);
        });
      }
    },


    actions: {

      // triggering parent action .
      back: function back() {
        this.get("triggerBack")();
      },


      // display categories .
      displayCategories: function displayCategories() {
        if (this.get("isGlobal") === true) {
          // Globally
          this.fetchDataIsGlobal("category");
        } else {
          // Locally
          this.fetchData("category");
        }
      },


      //display brands
      displayBrands: function displayBrands() {
        if (this.get("isGlobal") === true) {
          this.fetchDataIsGlobal("brand");
        } else {
          this.fetchData("brand");
        }
      },


      //display models
      displayModels: function displayModels() {
        if (this.get("isGlobal") === true) {
          this.fetchDataIsGlobal("model");
        } else {
          this.fetchData("model");
        }
      },


      //display price
      displayPrice: function displayPrice() {
        this.set("isprice", true);
        this.toggleData("isprice");
      },


      // adding the categories .
      addCategoryItem: function addCategoryItem() {
        var category = event.target.value.toLowerCase();
        var categories = this.get("categories");
        if (categories.includes(category)) {
          // Use Ember's 'removeObject' to remove the item
          categories.removeObject(category);
        } else {
          // Use 'pushObject' to add the item
          categories.pushObject(category);
        }

        // Clear the previous timeout if it exists


        // Set a new timeout for 1 seconds

        this.filter();
      },


      // adding the brands .
      addBrandItem: function addBrandItem() {

        var brand = event.target.value.toLowerCase();
        var brands = this.get("brands");
        if (brands.includes(brand)) {
          brands.removeObject(brand);
        } else {
          brands.pushObject(brand);
        }

        this.filter();
      },


      // adding the models .
      addModelItem: function addModelItem() {
        var model = event.target.value.toLowerCase();
        var models = this.get("models");
        if (models.includes(model)) {
          models.removeObject(model);
        } else {
          models.pushObject(model);
        }

        this.filter();
      },


      //to update the low Price .
      updateLowPrice: function updateLowPrice() {

        console.log(" the low price ", event.target.value);
        this.set('lowPrice', event.target.value);

        // Clear the previous timeout if it exists
        if (this.settingTimeout) {
          clearTimeout(this.settingTimeout);
        }

        this.filter();
      },


      //to update the high price .
      updateHighPrice: function updateHighPrice() {
        this.set('highPrice', event.target.value);
        this.filter();
      },
      applyFilter: function applyFilter() {

        if (this.get("filteredProducts")) {
          this.get("triggerFilter")(this.get("filteredProducts"));
        }
      },


      // clearing the filter .
      clear: function clear() {

        this.get('categories').clear();
        this.get('models').clear();
        this.get('brands').clear();
        this.get("triggerClear")();
        this.set('lowPrice', undefined);
        this.set('highPrice', undefined);
        this.set('filteredProducts', undefined);
      },
      validatePrice: function validatePrice(event) {

        if (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
          event.preventDefault();
        }
      }
    }

  });
});
define("z-kart/components/homepage-tour", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        //starting index of the content
        index: 0,

        // get the content with help of index .
        getContent: Ember.computed("index", "content", function () {
            return this.get("content")[this.get("index")];
        }),

        // moving furture 
        allowNext: Ember.computed("content", "index", function () {
            return this.get("content").length - 1 !== this.get("index");
        }),

        actions: {

            // index+1;
            next: function next() {
                this.set("index", this.get("index") + 1);
            },


            // stoping the tour .
            skip: function skip() {
                this.get("triggerSkipTour")();
            }
        },

        // content for tour .
        content: [{
            "title": " Zoho Kart",
            "content": " The Zoho Kart where All the Tech Gagets are Available .",
            "highlight": "logoH",
            "background": "logoB"
        }, {
            "title": " Search Bar",
            "content": " Search Any Products That you want to buy .",
            "highlight": "searchH",
            "background": "searchB"
        }, {
            "title": " Menu Options ",
            "content": " Here You can navigate to any Page in The Application ",
            "highlight": "optionsH",
            "background": "optionsB"
        }]

    });
});
define('z-kart/components/loading-component', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define("z-kart/components/navigation-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    actions: {

      // enable the menu option in mobile view .
      showList: function showList() {
        this.toggleProperty("isMenuVisible");
      }
    }

  });
});
define('z-kart/components/navigation-list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    cartProducts: Ember.inject.service("cart-products"),

    didInsertElement: function didInsertElement() {

      // Get the application route and the current model's user_type
      var user = Ember.getOwner(this).lookup('route:application').modelFor("application");
      // to display the cart and account icons in navigation bar only if user exist .
      if (user === undefined) {
        this.set("isCustomer", false);
        this.set("userType", 0);
      } else {
        this.set("isCustomer", true);
        this.set("userType", user.user_type);
        console.log(this.get("cartProducts").calledInNav, " the called .");
        if (this.get("cartProducts").calledInNav === false) {
          this.get("cartProducts").cartProducts();
          this.set("cartProducts.calledInNav", true);
          console.log(this.get("cartProducts").calledInNav, " the called after .");
        }
      }
    },


    // Computed property based on productCount for displaying cart count
    cartCount: Ember.computed('cartProducts.cartCount', function () {

      var count = this.get('cartProducts.cartCount') || 0;
      if (count > 9) {
        return "9+";
      } else if (count > 0) {
        return count;
      } else {
        return null;
      }
    }),

    // checking whether the user is admin or not .

    isAdmin: Ember.computed('userType', function () {
      return this.get('userType') > 0;
    })

  });
});
define('z-kart/components/order-component', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define('z-kart/components/order-details', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    exports.default = Ember.Component.extend({

        // toggling the properties .
        toggleProperties: function toggleProperties(param) {
            this.setProperties(_defineProperty({
                upi: false,
                card: false,
                cash: false
            }, param, true));
        },


        // to allow card payment if all conditions are ok .
        isAllowCard: Ember.computed('isValidCardNo', 'isValidCardCvv', 'isValidCardDate', function () {
            console.log("Card No : " + this.get('isValidCardNo'));
            console.log("Card CVV : " + this.get('isValidCardCvv'));
            console.log("Card Date : " + this.get('isValidCardDate'));
            return this.get('isValidCardNo') && this.get('isValidCardCvv') && this.get('isValidCardDate');
        }),

        actions: {

            // trigerring parent action .
            back: function back() {
                this.get('triggerBack')();
            },
            buy: function buy() {
                var _this = this;

                var name = this.get("name");
                var mobile = this.get("mobile");
                var address = this.get("address");

                // UPI payment .
                if (this.get("upi")) {
                    this.set("stopUpi", true);
                    setTimeout(function () {
                        _this.set("stopUpi", false);
                        _this.get('triggerBuy')(name, mobile, address); // Calling parent action .
                    }, 4000);

                    // Cash On Delivery .
                } else if (this.get("cash")) {
                    this.get('triggerBuy')(name, mobile, address); // Calling parent action .

                    // Card Payment .
                } else if (this.get("card")) {
                    this.get('triggerBuy')(name, mobile, address); // Calling parent action .
                }
            },
            upi: function upi() {
                this.toggleProperties("upi");
            },
            card: function card() {
                this.toggleProperties("card");
            },
            cash: function cash() {
                this.toggleProperties("cash");
            },


            // UPI validation .
            validateUpi: function validateUpi() {
                var upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
                var value = event.target.value;
                if (upiPattern.test(value)) {
                    this.set("isValidUpi", true);
                    this.set("errorUpi", "");
                } else {
                    this.set("isValidUpi", false);
                    this.set("errorUpi", "invalid UPI ID ");
                }
            },


            // Card Number validation .
            validateCardNumber: function validateCardNumber(event) {
                var value = event.target.value.split(" ").slice(0, 4).join(""); // Remove non-numeric characters

                var formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();

                this.set("cardNumber", formattedValue);

                console.log(value.length);

                if (value.length > 15 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }

                if (value.length === 16) {
                    this.set("errorCard", "");
                    this.set("isValidCardNo", true);
                } else {
                    this.set("isValidCardNo", false);
                }
            },


            // Card CVV number validation .
            validateCardCvv: function validateCardCvv(event) {

                var value = event.target.value;

                if (value.length > 2 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }

                if (value.length === 3) {
                    this.set("errorCard", "");
                    this.set("isValidCardCvv", true);
                } else {
                    this.set("isValidCardCvv", false);
                }
            },


            // OTP validation .
            validateOtp: function validateOtp(event) {

                var value = event.target.value;

                if (value.length > 5 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }
            },


            // validating expire date 
            validateExpiryDate: function validateExpiryDate(event) {
                var value = event.target.value;
                if (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key) || value.length >= 5) {
                    event.preventDefault();
                    return;
                }

                if (value.length === 2 && event.key !== "Backspace") {
                    event.target.value = value + "/";
                }
            },
            validateDate: function validateDate(event) {
                var value = event.target.value;
                value = value.split("/");

                var currentDate = new Date();
                var currentYear = currentDate.getFullYear();
                var currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript

                if (value.length === 2) {
                    var month = parseInt(value[0], 10);
                    var year = parseInt("20" + value[1], 10); // Assuming the year is entered as two digits

                    // Check if the month is valid and if the year is either the current year or later
                    var isValidMonth = month > 0 && month <= 12;
                    var isValidYear = year > currentYear || year === currentYear && month >= currentMonth;

                    this.set("isValidCardDate", isValidMonth && isValidYear);
                } else {
                    this.set("isValidCardDate", false);
                }
            }
        }
    });
});
define('z-kart/components/orderproducts-table', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define("z-kart/components/orders-table", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

        actions: {
            displayOrderProducts: function displayOrderProducts(cartId, orderId) {
                this.get("triggerDisplayOrderProducts")(cartId, orderId);
            }
        }

    });
});
define('z-kart/components/pop-up', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define("z-kart/components/poster-banner", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    // banners content .
    banners: [{
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/Electronics-Page-Banner.jpg?context=bWFzdGVyfHJvb3R8MjEyMDcxM3xpbWFnZS9qcGVnfGFESXpMMmhqT0M4eE5qYzVORGN3TkRJME9EZzJNaTlGYkdWamRISnZibWxqY3kxUVlXZGxMVUpoYm01bGNpNXFjR2N8MGVmNWMxNGJlMTE5MDRmMGQwMDIxODg5ZWU4YTM0MTZkNTEzMzRlNzcxNzgxOWZlZjM4YjIzOWYyZGVkNzJjOA",
      alt: "Electronics Banner",
      linkto: "smartphone",
      class: "max"
    }, {
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/samsung-tv-d-series-web.jpg?context=bWFzdGVyfGltYWdlc3wxODg5NDA1fGltYWdlL2pwZWd8YURSbEwyZzVaUzh5TmpnME56VTFNRE0zTXpreE9DOXpZVzF6ZFc1bkxYUjJMV1F0YzJWeWFXVnpMWGRsWWk1cWNHY3w5ZjNiYzEzZDcxZDMxODU5ZDVmNTlmNzRlY2NkYWNlMzczOTRlZmIxMGZmMDYxY2JmZDdkNjhmZjU1YjlkNWZh",
      alt: "Samsung",
      linkto: "samsung",
      class: "max"
    }, {
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/Macbook-air-13-Shop-now-banner-web.jpg?context=bWFzdGVyfGltYWdlc3wxNTEwNDN8aW1hZ2UvanBlZ3xhR015TDJnME5pOHlOalEwTnprME5UUXdNRE0xTUM5TllXTmliMjlyTFdGcGNpMHhNeTFUYUc5d0xXNXZkeTFpWVc1dVpYSXRkMlZpTG1wd1p3fDlkNzNlYTI3YmVlM2E4NWMwYjNmODVkMGJmMDY4MzE1ZjZkZWQ0YThiMzI4MjIxNDAyNmRlYTFmOWI1MGUwOTY",
      alt: "Apple",
      linkto: "apple",
      class: "minscreen"
    }],

    currentSlide: 0,
    autoSlideInterval: null,

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.startAutoSlide(); // Start the automatic slide when the component is inserted
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.stopAutoSlide(); // Stop the timer when the component is destroyed
    },
    startAutoSlide: function startAutoSlide() {
      this.set('autoSlideInterval', Ember.run.later(this, this.nextSlide, 4000) // Slide every 2 seconds
      );
    },
    stopAutoSlide: function stopAutoSlide() {
      Ember.run.cancel(this.autoSlideInterval); // Cancel the scheduled timer
    },
    nextSlide: function nextSlide() {
      this.incrementProperty('currentSlide');
      if (this.currentSlide >= this.banners.length) {
        this.set('currentSlide', 0);
      }
      this.startAutoSlide(); // Restart the timer after each slide
    },
    prevSlide: function prevSlide() {
      this.decrementProperty('currentSlide');
      if (this.currentSlide < 0) {
        this.set('currentSlide', this.banners.length - 1);
      }
      this.startAutoSlide(); // Restart the timer after manual slide change
    },


    actions: {
      nextSlide: function nextSlide() {
        this.stopAutoSlide(); // Stop the timer to avoid conflicts
        this.nextSlide(); // Call the next slide function manually
      },
      prevSlide: function prevSlide() {
        this.stopAutoSlide(); // Stop the timer to avoid conflicts
        this.prevSlide(); // Call the previous slide function manually
      }
    }
  });
});
define('z-kart/components/product-layout', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define('z-kart/components/products-table', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        actions: {
            editProduct: function editProduct(product) {

                this.set("name", product.name);
                this.set("model", product.model);
                this.set("brand", product.brand);
                this.set("category", product.category);
                this.set("image", product.image);
                this.set("stock", product.stock);
                this.set("price", product.price);
                this.set("productId", product.product_id);
                this.set("isEditProduct", true);
            },


            // calling the parent action .
            back: function back() {

                console.log(" Triggerd Update Products Back.");
                this.set("alertPopup", false);
                this.set("isEditProduct", false);
            },
            updateProduct: function updateProduct(body) {

                console.log(" Triggerd Update Products .");
                this.set("isEditProduct", false);
                this.get("triggerUpdateProduct")(body);
            },


            // delete pop up enabling .
            deleteProduct: function deleteProduct(productId) {
                this.set("deleteProductId", productId);
                this.set("alertPopup", true);
            },


            // deleting the product .
            deleteProductConfirm: function deleteProductConfirm(productId) {
                var _this = this;

                this.set("alertPopup", false);
                var uri = new _URIClass.default("product", productId);

                uri.delete().then(function (data) {
                    if (data["message"] === true) {
                        _this.get("triggerReloadProducts")(productId);
                    }
                }).catch(function (error) {
                    _this.get("triggerAfterError")(error);
                });
            }
        }

    });
});
define('z-kart/components/search-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    actions: {
      searchProducts: function searchProducts(event) {
        var _this = this;

        var content = event.target.value;

        // Clear the previous timeout if it exists
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }

        // Set a new timeout for 1 seconds
        this.searchTimeout = setTimeout(function () {
          localStorage.removeItem('localCategories');
          localStorage.removeItem('localLowPrice');
          localStorage.removeItem('localHighPrice');
          localStorage.removeItem('localBrands');
          localStorage.removeItem('localModels');
          _this.get('triggerSearchProducts')(content.trim()); // Call the actual search action
        }, 1000); // 1 seconds debounce time
      }
    }

  });
});
define('z-kart/components/success-order', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        // Empty ...

    });
});
define('z-kart/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('z-kart/components/zkart-logo', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    // Empty ...

  });
});
define('z-kart/controllers/account', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        actions: {

            // Error Handing Action .
            afterError: function afterError(error) {

                console.log(error);

                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);
            },
            editUser: function editUser() {

                this.set("isEdit", true);
                this.set("name", this.get("model").name);
                this.set("mobile", this.get("model").mobile);
                this.set("address", this.get("model").address);
                this.set("customerId", this.get("model").customer_id);
            },
            editedUser: function editedUser(body) {
                // Update the model properties with new values from the body
                this.set("isEdit", false);
                this.set("model.name", body.name);
                this.set("model.mobile", body.mobile);
                this.set("model.address", body.address);
            },

            // logout option .
            logout: function logout() {
                var _this = this;

                this.set("isLoader", true);
                setTimeout(function () {
                    _this.set("isLoader", false);
                }, 1000);

                var uri = new _URIClass.default('logout');
                uri.get().then(function (data) {
                    if (data["message"] === true) {
                        window.location.reload();
                    }
                }).catch(function (error) {
                    var status = error.status; // Get status code
                    var message = encodeURIComponent(error.statusText); // Get status text
                    // Navigate to the error route with code and message
                    _this.transitionToRoute('errorpage', status, message);
                });
            },

            // chenage password enable .
            changePassword: function changePassword() {
                this.set("allowChangePassword", true);
            },

            // change password disable .
            back: function back() {
                this.set("isEdit", false);
                this.set("allowChangePassword", false);
            },


            // change password confirm .
            changePasswordSubmit: function changePasswordSubmit(data) {
                var _this2 = this;

                if (data === true) {
                    this.set("allowChangePassword", false);

                    var uri = new _URIClass.default('logout');
                    uri.get().then(function (data) {
                        if (data["message"] === true) {
                            _this2.set("isAlert", true);
                            setTimeout(function () {
                                _this2.set("isAlert", false);
                                window.location.reload();
                            }, 2000);
                        }
                    }).catch(function (error) {
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text
                        // Navigate to the error route with code and message
                        _this2.transitionToRoute('errorpage', status, message);
                    });
                }
            }
        }
    });
});
define("z-kart/controllers/admin", ["exports", "z-kart/Classes/URIClass"], function (exports, _URIClass) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    exports.default = Ember.Controller.extend({

        // loading the starting data from the route setController .
        startingLoad: function startingLoad() {
            var _this = this;

            this.searchCache("asd", null);
            this.set("isProducts", true);
            var uri = new _URIClass.default("product");
            var body = {
                "filterProducts": "asc"
            };
            return uri.get(body).then(function (data) {
                _this.set("productsData", data);
                _this.set("products", data.slice(0, 50));
            }).catch(function (error) {

                _this.afterError(error);
            });
        },


        // Data Container Toggle ( table view )
        toggleProperties: function toggleProperties(prop) {
            this.set("isCustomers", false);
            this.set("isProducts", false);
            this.set("isAdmins", false);
            this.set("isOrders", false);
            this.set("isOrderProducts", false);
            this.searchCache("asd");
            this.set(prop, true);
        },


        // To Store the Searched content .   
        searchCache: function searchCache(param, value) {
            this.set("customerSearch", null);
            this.set("productSearch", null);
            this.set("adminSearch", null);
            this.set(param, value);
        },


        // searching products .
        productsSearch: function productsSearch(params) {

            var products = this.get("productsData");

            return products.filter(function (product) {
                return product.product_id.toLowerCase().includes(params.toLowerCase()) || product.name.toLowerCase().includes(params.toLowerCase()) || product.model.toLowerCase().includes(params.toLowerCase()) || product.category.toLowerCase().includes(params.toLowerCase()) || product.brand.toLowerCase().includes(params.toLowerCase());
            });
        },


        // searching customers .
        customersSearch: function customersSearch(params) {

            var customers = this.get("customersData");

            return customers.filter(function (customer) {
                return customer.customer_id.toLowerCase().includes(params.toLowerCase()) || customer.name.toLowerCase().includes(params.toLowerCase()) || customer.email.toLowerCase().includes(params.toLowerCase()) || customer.mobile.toLowerCase().includes(params.toLowerCase()) || customer.address.toLowerCase().includes(params.toLowerCase());
            });
        },


        // searching admins .
        adminsSearch: function adminsSearch(params) {

            var customers = this.get("adminsData");

            return customers.filter(function (customer) {
                return customer.customer_id.toLowerCase().includes(params.toLowerCase()) || customer.name.toLowerCase().includes(params.toLowerCase()) || customer.email.toLowerCase().includes(params.toLowerCase()) || customer.mobile.toLowerCase().includes(params.toLowerCase()) || customer.address.toLowerCase().includes(params.toLowerCase());
            });
        },


        // orders searching .
        ordersSearch: function ordersSearch(params) {

            var orders = this.get("ordersData");

            return orders.filter(function (order) {
                return order.order_id.toLowerCase().includes(params.toLowerCase()) || order.time.toLowerCase().includes(params.toLowerCase()) || order.name.toLowerCase().includes(params.toLowerCase()) || order.total_price == params.toLowerCase() || order.mobile.toLowerCase().includes(params.toLowerCase()) || order.address.toLowerCase().includes(params.toLowerCase()) || order.coupon.toLowerCase().includes(params.toLowerCase());
            });
        },


        // loading products from DB
        productsCall: function productsCall() {
            var _this2 = this;

            var uri = new _URIClass.default("product");

            var body = {
                "filterProducts": "asc"
            };

            return uri.get(body).then(function (data) {

                _this2.set("productsData", data);
            }).catch(function (error) {
                _this2.afterError(error);
            });
        },


        // loading customers from DB 
        customersCall: function customersCall() {
            var _this3 = this;

            var uri = new _URIClass.default("customer");

            return uri.get().then(function (data) {

                _this3.set("customersData", data.filter(function (product) {
                    return product.user_type === 0;
                }));
                _this3.set("adminsData", data.filter(function (product) {
                    return product.user_type === 1;
                }));
            }).catch(function (error) {
                _this3.afterError(error);
            });
        },


        // loading orders from DB 
        ordersCall: function ordersCall() {
            var _this4 = this;

            var uri = new _URIClass.default("order");

            return uri.get().then(function (data) {

                _this4.set("ordersData", data);
            }).catch(function (error) {
                _this4.afterError(error);
            });
        },


        actions: {
            updateDate: function updateDate(selectedDate) {
                this.set("orders", this.ordersSearch(selectedDate.toLowerCase().trim()));
            },


            // Error Handing Action .
            afterError: function afterError(error) {

                console.log(error);

                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);
            },


            // displaying customers .
            displayCustomers: function displayCustomers() {

                this.toggleProperties("isCustomers");

                this.set("customers", this.get("customersData"));
            },


            // displaying products .
            displayProducts: function displayProducts() {

                this.toggleProperties("isProducts");

                this.set("products", this.get("productsData").slice(0, 50));
            },


            // displaying admins .
            displayAdmins: function displayAdmins() {

                this.toggleProperties("isAdmins");

                this.set("admins", this.get("adminsData"));
            },


            // displaying orders .
            displayOrders: function displayOrders() {

                this.toggleProperties("isOrders");

                this.set("orders", this.get("ordersData"));
            },


            // search customer action .
            searchCustomers: function searchCustomers(params) {

                this.set("customers", this.customersSearch(params.trim()));
                this.searchCache("customerSearch", params.trim());
            },


            // search products action .
            searchProducts: function searchProducts(params) {

                this.set("products", this.productsSearch(params.trim()));
                this.searchCache("productSearch", params.trim());
            },


            // search admins action .
            searchAdmins: function searchAdmins(params) {

                this.set("admins", this.adminsSearch(params.trim()));
                this.searchCache("adminSearch", params.trim());
            },


            // search orders action .
            searchOrders: function searchOrders(params) {
                console.log(" triggerd Params ", params);
                this.set("orders", this.ordersSearch(params.trim()));
            },


            // search customers action
            reloadCustomers: function reloadCustomers(id) {
                this.set("customers", this.get("customers").filter(function (customer) {
                    return customer.customer_id != id;
                }));
                this.set("customersData", this.get("customersData").filter(function (customer) {
                    return customer.customer_id != id;
                }));
            },


            // reloading the admins after deletion .
            reloadAdmins: function reloadAdmins(id) {
                this.set("admins", this.get("admins").filter(function (admin) {
                    return admin.customer_id != id;
                }));
                this.set("adminsData", this.get("adminsData").filter(function (admin) {
                    return admin.customer_id != id;
                }));
            },


            // reloading the products after deletion .
            reloadProducts: function reloadProducts(id) {
                this.set("products", this.get("products").filter(function (product) {
                    return product.product_id != id;
                }));
                this.set("productsData", this.get("productsData").filter(function (product) {
                    return product.product_id != id;
                }));
            },


            // reloading the products after Editing  .
            updateProduct: function updateProduct(body) {

                this.set("products", this.get("products").map(function (product) {
                    // If the product_id matches, update it with the new data from body
                    if (product.product_id === body.product_id) {
                        return Object.assign({}, product, body);
                    }
                    return product; // Keep the other products unchanged
                }));

                this.set("productsData", this.get("productsData").map(function (product) {
                    // If the product_id matches, update it with the new data from body
                    if (product.product_id === body.product_id) {
                        return Object.assign({}, product, body);
                    }
                    return product; // Keep the other products unchanged
                }));
            },
            updateCustomer: function updateCustomer(body) {

                if (body.userType == 1) {
                    var customerToMove = this.get("customers").find(function (customer) {
                        return customer.customer_id === body.customer_id;
                    });

                    if (customerToMove) {
                        customerToMove.user_type = 1;

                        // Add the customer to the admins array
                        this.set("admins", [].concat(_toConsumableArray(this.get("admins") || []), [customerToMove]));
                        this.set("adminsData", [].concat(_toConsumableArray(this.get("adminsData") || []), [customerToMove]));

                        // Remove the customer from the customers array
                        this.set("customers", this.get("customers").filter(function (customer) {
                            return customer.customer_id !== body.customer_id;
                        }));
                        this.set("customersData", this.get("customersData").filter(function (customer) {
                            return customer.customer_id !== body.customer_id;
                        }));
                    }
                } else {

                    this.set("customers", this.get("customers").map(function (customer) {
                        // If the customer_id matches, update it with the new data from body .
                        if (customer.customer_id === body.customer_id) {

                            return Object.assign({}, customer, body);
                        }
                        return customer; // Keep the other products unchanged
                    }));

                    this.set("customersData", this.get("customersData").map(function (customer) {
                        // If the customer_id matches, update it with the new data from body .
                        if (customer.customer_id === body.customer_id) {

                            return Object.assign({}, customer, body);
                        }
                        return customer; // Keep the other products unchanged
                    }));
                }
            },
            updateAdmin: function updateAdmin(body) {

                if (body.userType == 0) {

                    var customerToMove = this.get("admins").find(function (customer) {
                        return customer.customer_id === body.customer_id;
                    });

                    if (customerToMove) {
                        customerToMove.user_type = 0;

                        // Add the customer to the admins array
                        this.set("customers", [].concat(_toConsumableArray(this.get("customers") || []), [customerToMove]));
                        this.set("customersData", [].concat(_toConsumableArray(this.get("customersData") || []), [customerToMove]));

                        // Remove the customer from the customers array
                        this.set("admins", this.get("admins").filter(function (customer) {
                            return customer.customer_id !== body.customer_id;
                        }));
                        this.set("adminsData", this.get("adminsData").filter(function (customer) {
                            return customer.customer_id !== body.customer_id;
                        }));
                    }
                } else {
                    this.set("admins", this.get("admins").map(function (admin) {
                        // If the customer_id matches, update it with the new data from body .

                        if (admin.customer_id === body.customer_id) {
                            return Object.assign({}, admin, body);
                        }
                        return admin; // Keep the other products unchanged
                    }));

                    this.set("adminsData", this.get("adminsData").map(function (admin) {
                        // If the customer_id matches, update it with the new data from body .

                        if (admin.customer_id === body.customer_id) {
                            return Object.assign({}, admin, body);
                        }
                        return admin; // Keep the other products unchanged
                    }));
                }
            },


            // reloading the products after Adding .
            addedProduct: function addedProduct(body) {

                // Adding the new product
                this.set("products", [].concat(_toConsumableArray(this.get("products") || []), [body]).sort(function (a, b) {
                    return a.stock - b.stock;
                }));
                this.set("productsData", [].concat(_toConsumableArray(this.get("productsData") || []), [body]).sort(function (a, b) {
                    return a.stock - b.stock;
                }));
            },
            addedCustomer: function addedCustomer(body) {

                console.log(body);

                if (body.userType == 0) {

                    this.set("customers", [].concat(_toConsumableArray(this.get("customers") || []), [body]));
                    this.set("customersData", [].concat(_toConsumableArray(this.get("customersData") || []), [body]));
                } else {

                    this.set("admins", [].concat(_toConsumableArray(this.get("admins") || []), [body]));
                    this.set("adminsData", [].concat(_toConsumableArray(this.get("adminsData") || []), [body]));
                }
            },
            displayOrderProducts: function displayOrderProducts(cartId, orderId) {
                var _this5 = this;

                var uri = new _URIClass.default("order", cartId, orderId, "products");

                uri.get().then(function (data) {
                    if (data) {
                        _this5.set("orderId", orderId);
                        _this5.set("orderProducts", data);
                        _this5.toggleProperties("isOrderProducts");
                    }
                }).catch(function (error) {

                    var status = error.status; // Get status code
                    var message = encodeURIComponent(error.statusText); // Get status text
                    // Navigate to the error route with code and message
                    _this5.transitionToRoute('errorpage', status, message);
                });
            }
        }
    });
});
define('z-kart/controllers/application', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        beforeSession: Ember.computed("currentRouteName", function () {

            return Ember.get(this, "currentRouteName") === "signin" || Ember.get(this, "currentRouteName") === "signup" || Ember.get(this, "currentRouteName") === "changepassword" || Ember.get(this, "currentRouteName").includes("error") || Ember.get(this, "currentRouteName").includes("Edit") || Ember.get(this, "currentRouteName").includes("admin") || Ember.get(this, "currentRouteName").includes("Add");
        }),

        isNoSearch: Ember.computed("currentRouteName", function () {
            return Ember.get(this, "currentRouteName").includes("account") || Ember.get(this, "currentRouteName").includes("about");
        }),

        // admin change password when he loging for first time .
        allowChangePassword: Ember.computed("done", function () {
            if (this.model === null || this.get("done") !== undefined) {
                return false;
            }
            return this.model.log_first === 1 && this.model.user_type > 0;
        }),

        actions: {

            // Error Handing Action .
            afterError: function afterError(error) {

                console.log(error);

                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);
            },

            back: function back() {
                window.location.reload();
            },

            searchProducts: function searchProducts(content) {
                if (content !== "") {
                    this.transitionToRoute("products.search", content);
                } else {
                    this.transitionToRoute("products.index");
                }
            },


            // changing log first after changing the log first .
            changePassword: function changePassword(data) {
                var _this = this;

                if (data === true) {
                    new _URIClass.default("customer", this.get("model").customer_id).put({ "logFirst": 2 }).then(function (data) {
                        if (data["message"] === true) {
                            _this.set("done", true);

                            var uri = new _URIClass.default('logout');
                            uri.get().then(function (data) {
                                if (data["message"] === true) {
                                    _this.set("isAlert", true);
                                    setTimeout(function () {
                                        window.location.reload();
                                        _this.set("isAlert", false);
                                    }, 2000);
                                }
                            }).catch(function (error) {
                                var status = error.status; // Get status code
                                var message = encodeURIComponent(error.statusText); // Get status text
                                // Navigate to the error route with code and message
                                _this.transitionToRoute('errorpage', status, message);
                            });
                        }
                    }).catch(function (error) {
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text

                        _this.transitionToRoute('errorpage', status, message);
                    });
                }
            }
        }

    });
});
define("z-kart/controllers/cart", ["exports", "z-kart/Classes/URIClass"], function (exports, _URIClass) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        // cart products Service injection . 
        cartProductsService: Ember.inject.service("cart-products"),

        cartItems: function cartItems() {
            var _this = this;

            var data = this.get("cartProductsService.cartProductsList").cartProducts;
            console.log(" cart product data . ", data);
            var maxStockProduct = this.get("cartProductsService.cartProductsList").maxStockProducts;

            if (data === undefined) {
                this.get("cartProductsService").cartProducts().then(function (data) {
                    data = _this.get("cartProductsService.cartProductsList").cartProducts;
                    maxStockProduct = _this.get("cartProductsService.cartProductsList").maxStockProducts;

                    _this.cartProcess(data, maxStockProduct);
                });
            } else {
                this.cartProcess(data, maxStockProduct);
            }
        },
        cartProcess: function cartProcess(data, maxStockProduct) {

            console.log(this.get("cartProductsService.cartProductsList"), " The cart data .");
            console.log(" started executing .");

            var totalPrice = data.reduce(function (accumulator, product) {
                return accumulator + product.product.price * product.count;
            }, 0);

            this.set("totalPrice", totalPrice);

            var isCheckOut = true;

            data.forEach(function (cartProduct) {

                isCheckOut = isCheckOut && cartProduct.count <= cartProduct.product.stock;
            });

            this.set("isCheckOut", isCheckOut);

            var similarProducts = data.filter(function (cartProduct) {
                return maxStockProduct.some(function (maxStockProduct) {
                    return cartProduct.product.product_id === maxStockProduct.product_id;
                });
            });

            if (similarProducts.length > 0) {
                var coupon = " "; // Discount Details .
                var discouponPrice = 0; //Discount Price .

                similarProducts.forEach(function (cartProduct) {
                    // we will split the coupon String Discount Details by using ',' .
                    coupon += "Deal Of The Moment Product Id :" + cartProduct.product.product_id + " \ndiscount : 10%  discount price per unit : " + parseInt(cartProduct.product.price * 0.1) + " Rs ,";
                    discouponPrice += cartProduct.count * parseInt(cartProduct.product.price * 0.1); // cartProduct.count * ( 10% discount of Product) 
                });
                // initialization of the Discount Details and Discount Price .
                this.set("coupon", coupon);
                // Deal of the Moment Discount Price .
                this.set("discountPrice", discouponPrice);
            } else {
                this.set("coupon", "");
                this.set("discountPrice", 0);
            }

            this.set("discountPriceCode", 0);
            this.set("couponCode", "");
            this.set("userCoupon", false);
            this.set('selectedOption', "remove"); // default selected option in coupon codes .
        },


        discount: Ember.computed("discountPrice", "discountPriceCode", "totalPrice", function () {
            if (this.get("discountPrice") !== undefined && this.get("discountPriceCode") !== undefined) {
                return parseInt(this.get("discountPrice") + this.get("discountPriceCode"));
            } else if (this.get("discountPriceCode") !== undefined) {
                return parseInt(this.get("discountPriceCode"));
            } else if (this.get("discountPrice") !== undefined) {
                return parseInt(this.get("discountPrice"));
            }
            return undefined;
        }),

        displayTotal: Ember.computed("totalPrice", "discount", "discountPrice", "discountPriceCode", function () {
            // Total Price Without Discount After Adding All Discount Prices.
            return this.get("totalPrice") - this.get("discount");
        }),

        // display coupon details .
        displayCoupon: Ember.computed("coupon", "couponCode", function () {

            //NOTE ABOUT THE COMPUTED PROPERTY

            // logic is as same as the displayTotal computed property.
            // here we are trying to display the Discount Details .

            if (this.get("coupon") !== undefined && this.get("couponCode") !== undefined) {
                this.set("couponInfo", this.get("coupon") + this.get("couponCode"));
            } else if (this.get("couponCode") !== undefined) {
                this.set("couponInfo", this.get("couponCode"));
            } else if (this.get("coupon") !== undefined) {
                this.set("couponInfo", this.get("coupon"));
            } else {
                this.set("couponInfo", "");
            }
            //     Spiting the Discount Details using ','
            return this.get("couponInfo").split(",");
        }),

        // to keep track of the application model .
        applicationModel: Ember.computed(function () {
            return Ember.getOwner(this).lookup('route:application').modelFor('application');
        }),

        // enable customer coupon .
        customerCoupon: Ember.computed("applicationModel.used", "applicationModel.coupon", "applicationModel.discountprice", "applicationModel.orders_count", function () {

            // Checking if user coupon has activated or not .
            // used  === 0 => coupon code is unused.
            // orders count > 2 means orders count = 3 then we can apply the coupon for 4rd order .
            // orders count < 6 means we can apply until this 6th order . only once we can apply .

            var used = this.get("applicationModel.used");

            var orders_count = this.get("applicationModel.orders_count");

            if (used === 0 && orders_count > 2 && orders_count < 6) {

                var userCoupon = {
                    "coupon": this.get("applicationModel.coupon"),
                    "discountPrice": this.get("applicationModel.discountprice")
                };

                return userCoupon;
            }

            return undefined;
        }),

        // enable 20,000 PRICE coupon .
        totalPriceCoupon: Ember.computed("totalPrice", "applicationModel.discountprice", function () {

            if (this.get("totalPrice") >= 20000) {
                if (this.get("customerCoupon") === undefined) {
                    return {
                        "coupon": "20000PRICE",
                        "discountPrice": this.get("applicationModel.discountprice")
                    };
                } else {
                    // user coupon is enabled then 40% is removed from the discountPrice .
                    return {
                        "coupon": "20000PRICE",
                        "discountPrice": this.get("applicationModel.discountprice") - this.get("applicationModel.discountprice") * 0.4
                    };
                }
            }
            return undefined;
        }),

        actions: {

            // update the cart product count .
            updateCount: function updateCount(cartProductId) {
                var _this2 = this;

                var cartProducts = this.get("cartProductsService.cartProductsList");

                // Find the cart product by cartProductId and remove it .
                var updatedCartProduct = cartProducts.cartProducts.filter(function (product) {
                    return product.cp_id === cartProductId;
                })[0];

                if (updatedCartProduct.count < updatedCartProduct.product.stock && parseInt(event.target.value) > 0) {

                    var uri = new _URIClass.default("cart", this.get("applicationModel.customer_id"));
                    var body = {
                        "cartProductId": cartProductId,
                        "count": event.target.value == "" ? 1 : event.target.value
                    };
                    uri.put(body).then(function (data) {

                        // Find the cart product by cartProductId and update its count
                        var updatedCartProducts = cartProducts.cartProducts.map(function (product) {

                            if (product.cp_id === cartProductId) {
                                console.log(data["message"] === true ? body.count : body.count - 1);
                                return Object.assign({}, product, { count: data["message"] === true ? body.count : body.count - 1 });
                            }
                            return product;
                        });

                        Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
                        Ember.set(cartProducts, 'cartProducts', updatedCartProducts);

                        // Set the updated cartProducts array
                        _this2.set("cartProductsService.cartProductsList", cartProducts);

                        // Refresh cart items .
                        _this2.cartItems();
                    }).catch(function (error) {

                        console.log(error);
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text
                        // Navigate to the error route with code and message
                        _this2.transitionToRoute('errorpage', status.toString(), message);
                    });
                } else {

                    var updatedCartProducts = cartProducts.cartProducts.map(function (product) {

                        if (product.cp_id === cartProductId) {
                            return Object.assign({}, product, { count: event.target.value == "" || event.target.value == 0 ? 1 : event.target.value - 1 });
                        }
                        return product;
                    });

                    Ember.set(cartProducts, 'cartProducts', updatedCartProducts);
                }
            },


            // delete the cart product pop up .
            deleteProduct: function deleteProduct(cartproductId) {
                this.set("deleteCartProductId", cartproductId);
                this.set("alterPopup", true);
            },


            // delete the cart product after confirmation .
            deleteProductConfirm: function deleteProductConfirm(cartProductId) {
                var _this3 = this;

                this.set("isBuyProduct", false);
                this.set("alterPopup", false);

                var uri = new _URIClass.default("cart", this.get("applicationModel.customer_id"), cartProductId);

                uri.delete().then(function (data) {

                    _this3.get("cartProductsService").removeCartProduct(_this3.get("cartProductsService.cartProductsList").cartProducts.filter(function (product) {
                        return product.cp_id === cartProductId;
                    })[0].product.product_id);

                    var cartProducts = _this3.get("cartProductsService.cartProductsList");

                    // Find the cart product by cartProductId and remove it .
                    var updatedCartProducts = cartProducts.cartProducts.filter(function (product) {
                        return product.cp_id != cartProductId;
                    });

                    Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
                    Ember.set(cartProducts, 'cartProducts', updatedCartProducts);

                    // Set the updated cartProducts array
                    _this3.set("cartProductsService.cartProductsList", cartProducts);
                    // updation.
                    _this3.cartItems();
                }).catch(function (error) {
                    console.log(error);
                    var status = error.status; // Get status code
                    var message = encodeURIComponent(error.statusText); // Get status text
                    _this3.transitionToRoute('errorpage', status.toString(), message);
                });
            },


            // checking out .
            checkOut: function checkOut(name, mobile, address) {
                var _this4 = this;

                this.set("isBuyProduct", false);
                this.set("isLoader", true);

                var uri = new _URIClass.default("cart", this.get("applicationModel.customer_id"));

                uri.post({
                    "coupon": this.get("couponInfo") || " No Coupon Details ",
                    "discountPrice": parseInt(this.get("discount")),
                    "name": name,
                    "mobile": mobile,
                    "address": address,
                    "userCoupon": this.get("userCoupon")

                }).then(function (data) {
                    if (data["message"] === true) {

                        console.log(" userCoupon :", _this4.get("userCoupon"));

                        var applicationModel = Ember.getOwner(_this4).lookup("route:application").modelFor("application");

                        console.log(" before ", applicationModel);
                        // Notify Ember of the update (this step might be needed depending on your version)

                        var cartProducts = _this4.get("cartProductsService.cartProductsList");

                        Ember.set(applicationModel, 'orders_count', applicationModel.orders_count + 1);
                        Ember.set(applicationModel, "discountprice", data["discountPrice"]);

                        if (_this4.get("userCoupon") === true) {
                            Ember.set(applicationModel, 'used', 1);
                        }
                        _this4.notifyPropertyChange('applicationModel');

                        console.log(" after ", applicationModel);

                        setTimeout(function () {
                            _this4.set("isLoader", false);
                            _this4.set("orderSuccess", true);
                        }, 1000);

                        setTimeout(function () {
                            _this4.set("orderSuccess", false);
                            _this4.transitionToRoute("account");
                            Ember.set(cartProducts, 'cartProducts', undefined);
                            _this4.cartItems();
                        }, 2000);
                    } else {
                        setTimeout(function () {
                            _this4.set("orderError", false);
                        }, 2000);
                    }
                    _this4.set("isBuyProduct", false);
                }).catch(function (error) {
                    console.log(error);
                    _this4.set("isLoader", false);
                    _this4.set("isBuyProduct", false);

                    var status = error.status; // Get status code
                    var message = encodeURIComponent(error.statusText); // Get status text

                    // Navigate to the error route with code and message
                    _this4.transitionToRoute('errorpage', status.toString(), message);
                });
            },


            // add coupon 
            addCoupon: function addCoupon(event) {
                console.log(" triggring .", event.target.value);
                var name = event.target.value;
                if (name === "user") {
                    this.set("discountPriceCode", this.get("customerCoupon").discountPrice * 0.01 * this.get("totalPrice"));
                    this.set("couponCode", "\nCoupon Code : " + this.get("customerCoupon").coupon + " \ndiscount :" + this.get("customerCoupon").discountPrice + "% ,");
                    this.set("userCoupon", true);
                } else if (name === "maxprice") {
                    this.set("discountPriceCode", this.get("totalPriceCoupon").discountPrice * 0.01 * this.get("totalPrice"));
                    this.set("couponCode", "\nCoupon Code : " + this.get("totalPriceCoupon").coupon + " \ndiscount :" + this.get("totalPriceCoupon").discountPrice + "% ,");
                    this.set("userCoupon", false);
                } else if (name === "remove") {
                    this.set("discountPriceCode", 0);
                    this.set("couponCode", "");
                    this.set("userCoupon", false);
                }
                // this.notifyPropertyChange('discount');
            },
            back: function back() {
                this.set("isBuyProduct", false);
                this.set("alterPopup", false);
            },
            buyProduct: function buyProduct() {
                this.set("isBuyProduct", true);
            }
        }

    });
});
define('z-kart/controllers/changepassword', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var uri = new _URIClass.default("customer");

    exports.default = Ember.Controller.extend({

        passwordComplexity: Ember.inject.service("passwordcomplexity"),

        isCheckPassword: false,
        isCheckConfirmPassword: false,
        isPasswordsMatched: false,
        submitForm: false,

        isAllowOtp: Ember.computed("isCheckConfirmPassword", "isCheckPassword", "isPasswordsMatched", "submitForm", "toggleForm", function () {
            return this.get("isCheckConfirmPassword") && this.get("isCheckPassword") && this.get("isPasswordsMatched") && this.get("submitForm") && this.get("toggleForm");
        }),

        checkEmail: function checkEmail(email) {
            var _this = this;

            var body = {
                "email": email,
                "sendOtp": 1
            };
            uri.get(body).then(function (data) {
                if (data["message"] === true) {
                    _this.set("submitForm", true);
                    _this.set("emailError", undefined);
                } else {
                    _this.set("submitForm", false);
                    _this.set("emailError", "User does not exist .");
                }
            }).catch(function (error) {
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                _this.transitionToRoute('errorpage', status, message);
            });
        },


        actions: {
            back: function back() {
                this.set("toggleForm", false);
            },
            next: function next() {

                this.set("toggleForm", true);

                if (!this.get("email") || this.get("email") && this.get("email").trim() === "") {
                    this.set("emailError", " Please Enter An Email .");
                    this.set("toggleForm", false);
                }

                if (!this.get("password") || this.get("password") && this.get("password").trim() === "") {
                    this.set("passwordError", " Please Enter a Password .");
                    this.set("toggleForm", false);
                }

                if (!this.get("passwordConfirm") || this.get("passwordConfirm") && this.get("passwordConfirm").trim() === "") {
                    this.set("confirmPasswordError", " Please Enter a Confirm Password .");
                    this.set("toggleForm", false);
                }
            },
            validateOtp: function validateOtp(event) {
                this.set("error", undefined);
                var value = event.target.value;

                if (value.length > 3 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                } else {
                    this.set("otp", value);
                }
            },
            storeOtp: function storeOtp(event) {
                this.set("error", undefined);
                var value = event.target.value;
                this.set("otp", value);
            },
            clearEmailError: function clearEmailError() {
                this.set("error", undefined);
                this.set("emailError", undefined);
            },
            checkEmailPattern: function checkEmailPattern(event) {
                this.set("emailEmail", undefined);
                this.set("error", undefined);

                var value = event.target.value;
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var temp = emailPattern.test(value);
                if (temp) {
                    this.set("emailPattern", true);

                    this.checkEmail(value);
                } else {
                    this.set("emailError", "Email invalid");
                    this.set("emailPattern", false);
                }

                this.set("email", value);
            },
            checkPassword: function checkPassword(event) {
                this.set("error", undefined);
                var password = event.target.value;
                this.set("passwordError", undefined);
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
                this.set("isCheckPassword", isValid);
                if (!isValid) {
                    this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
                }
                this.set("password", password);
                this.set("passwordConfirm", "");
                this.set("isCheckConfirmPassword", false);
            },
            checkConfirmPassword: function checkConfirmPassword(event) {

                this.set("error", undefined);
                var password = event.target.value;
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method

                this.set("isCheckPassword", isValid);

                var matched = this.get("password") === password;

                if (!isValid && matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                } else if (isValid && !matched) {
                    this.set("confirmPasswordError", "Passwords do not match.");
                } else if (!isValid && !matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6 and passwords doesn;t matched .");
                } else {
                    this.set("confirmPasswordError", undefined);
                }

                this.set("passwordConfirm", password);
                this.set("isCheckConfirmPassword", isValid);
                this.set("isPasswordsMatched", matched);
            },
            onSubmit: function onSubmit() {
                var _this2 = this;

                if (this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched) {
                    this.set("isLoader", true);
                    var body = {
                        "email": this.get('email'),
                        "password": btoa(this.get('password')),
                        "otp": this.get("otp")
                    };

                    uri.put(body).then(function (data) {

                        if (data["message"] == true) {
                            setTimeout(function () {
                                _this2.set("isLoader", false);
                                _this2.transitionToRoute("signin");
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                _this2.set("isLoader", false);

                                if (data["error"] === "password") {
                                    _this2.set("toggleForm", false);
                                    _this2.set("passwordError", " This Password is Already used ! ");
                                    _this2.set("confirmPasswordError", " This Password is Already used ! ");
                                } else {
                                    _this2.set("error", " OTP is Invalid !");
                                }
                            }, 1000);
                        }
                    }).catch(function (error) {

                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text

                        // Navigate to the error route with code and message
                        _this2.transitionToRoute('errorpage', status, message);
                    });
                } else {
                    this.set("error", "Invalid details!");
                }
            },

            togglePasswordVisibility: function togglePasswordVisibility() {
                this.toggleProperty('showPassword'); // Toggle the visibility of the old password
            },
            toggleNewPasswordVisibility: function toggleNewPasswordVisibility() {
                this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
            }
        }

    });
});
define("z-kart/controllers/error", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        actions: {
            goToIndex: function goToIndex() {
                this.transitionToRoute("index");

                setTimeout(function () {
                    window.location.reload();
                }, 1);
            }
        }
    });
});
define("z-kart/controllers/errorpage", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        actions: {
            goToIndex: function goToIndex() {
                this.transitionToRoute("index");

                setTimeout(function () {
                    window.location.reload();
                }, 1);
            }
        }
    });
});
define('z-kart/controllers/index', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    // allowing the tour .
    allowTour: Ember.computed("done", function () {
      var applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application");
      if (this.get("done") !== undefined || applicationModel === undefined) {
        return false;
      }
      return applicationModel.log_first >= 1;
    }),

    // caterories content .  
    categories: Ember.computed(function () {

      return [{
        "name": "Smartphones & Tablets",
        "image": "https://fliponn.ae/wp-content/uploads/2024/02/mobile.jpg",
        "value": "smartphone"

      }, {
        "name": "Laptops & Accessories",
        "image": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/category/laptop/xps/fy24-family-launch/prod-312204-apjc-laptop-xps-16-9640-14-9440-13-9340-800x620-pl-gr.png?fmt=png-alpha&wid=800&hei=620",
        "value": "laptop"
      }, {
        "name": "Home Appliances",
        "image": "https://www.ecoredux.com/wp-content/uploads/home-appliance.jpg",
        "value": "Home Appliance"
      }, {
        "name": "Audio & Headphones",
        "image": "https://media.licdn.com/dms/image/v2/D5612AQELOuIYM83W1w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1710946583440?e=2147483647&v=beta&t=YnL2ENrcoriziKrmCFI0Ek02dFSigt5s42-_QzLkLgw",
        "value": "audio"
      }, {
        "name": "Gaming Consoles & Accessories",
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRB9XchBo3M4R893Ri05p2o6Tuyi5UvMthgJjHq_PbMv84NF8eAra7Z032TohZaveGBuWOVQX8QG9sYswo3Aga8VRTE96fsAki7dz7ePbeDHIoj8MOqyKEUnw&usqp=CAE",
        "value": "gaming"

      }, {
        "name": "Cameras & Drones",
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwFXBCBgND6F73qjiKvK5O07LHFmisg69mHj1UhUt22OMYYmeec9WZbKyk6Ret3huym7rHkjaYbqEKI0UO-YJeJ80JK-_2Ke6yY8qJV34hIUoQFlXiEgIv&usqp=CAE",
        "value": "cameras"

      }, {
        "name": "Smartwatches",
        "image": "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/2400x1600/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24259063/226428_Garmin_Venu_Sq_2_AKrales_0049.jpg",
        "value": "smartwatch"

      }, {
        "name": "Computer Components",
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpt48lS6gkY8ndMUy2l8caQBlOCHtGkpvdiT4Y068rRPCMJ8RY3XB7cptAQ7SJQEefrWRI3-1TEeswP4EHoJ307Ti7qAv9ovf-3qfKK-cX4TuMCHpdKSUd&usqp=CAE",
        "value": "components"
      }];
    }),

    actions: {

      // start the tour . 
      startTour: function startTour() {
        this.set('showTour', false);
      },


      // skip the tour .
      skipTour: function skipTour() {
        var _this = this;

        var uri = new _URIClass.default("customer", this.get("model").customer_id);

        uri.put({ "logFirst": 0 }).then(function (data) {
          if (data["message"] === true) {
            _this.set("done", true);
          }
        }).catch(function (error) {
          var status = error.status; // Get status code
          var message = encodeURIComponent(error.statusText); // Get status text
          _this.transitionToRoute('errorpage', status, message);
        });
      }
    }
  });
});
define('z-kart/controllers/products/index', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var uri = new _URIClass.default("product");

    exports.default = Ember.Controller.extend({
        callProducts: function callProducts() {
            var _this = this;

            return uri.get({ "filterProducts": "exist" }).then(function (data) {
                _this.set("productsData", data);
                if (_this.get("filteredProducts")) {
                    _this.set("products", _this.get("filteredProducts"));
                    _this.set("isRecentlyAdded", false);
                } else {
                    _this.set("products", data);
                }
            }).catch(function (error) {
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text

                // Navigate to the error route with code and message
                _this.transitionToRoute('errorpage', status, message);
            });
        },


        // enabling the previous button .
        isPrevious: Ember.computed('last', function () {
            return this.get("last") > 10;
        }),

        // enabling the next button .
        isNext: Ember.computed('last', 'products', function () {
            return this.get("products").length > this.get("last");
        }),

        // displaying product with in the last-10, last .
        displayProducts: Ember.computed('productsData', 'products', 'last', function () {
            return this.get("products").slice(this.get("last") - 10, this.get("last"));
        }),

        isFilteredProducts: Ember.computed('filteredProducts.length', function () {

            return this.get('filteredProducts.length') > 0;
        }),

        actions: {

            // last - 10
            previous: function previous() {
                this.set("last", this.get("last") - 10);
            },


            // last + 10
            next: function next() {
                this.set("last", this.get("last") + 10);
            },


            // disable the filter .
            back: function back() {
                this.set("isFilter", false);
            },


            // display filter .
            displayFilter: function displayFilter() {
                this.set("isGlobal", true);
                this.set("isFilter", true);
            },


            // filter data showing . 
            filter: function filter(data) {
                this.set("isRecentlyAdded", false);
                this.set("products", data);
                this.set("filteredProducts", data);
                this.set("isFilter", false);
                this.set("last", 10);
            },


            // clearing the filter .
            clear: function clear() {
                this.set("products", this.get("productsData"));
                this.set("isFilter", false);
                this.set("isRecentlyAdded", true);
                this.set("filteredProducts", undefined);
            },


            // Error Handing Action .
            afterError: function afterError(error) {

                console.log(error);

                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);
            }
        }
    });
});
define('z-kart/controllers/products/product', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    exports.default = Ember.Controller.extend({

        relateProducts: null,

        last: 10, // Ensure 'last' is initialized properly

        magnifiedStyle: Ember.computed(function () {
            return '';
        }),

        addedToCart: "Add To Cart",

        cartProducts: Ember.inject.service("cart-products"),

        afterError: function afterError(error) {
            var status = error.status; // Get status code
            var message = encodeURIComponent(error.statusText); // Get status text

            // Navigate to the error route with code and message
            this.transitionToRoute('errorpage', status, message);
        },
        cartButtonAnimation: function cartButtonAnimation() {
            var _this = this;

            console.log(" animation triggred .");
            this.set("addedToCart", "Adding...");
            this.set("addingChange", true);

            this.addingTime = setTimeout(function () {
                _this.set("addedToCart", "Added ");
                _this.set("addingChange", false);
                _this.set("addedChange", true);
                _this.get("cartProducts").addCartProducts(_this.get("model").product.product_id);
            }, 1000);

            this.addedTime = setTimeout(function () {

                _this.set("addedToCart", "Add To Cart");
                _this.set("addedChange", false);
            }, 2000);
        },
        relatedProducts: function relatedProducts() {

            if (this.addingTime || this.addedTime) {

                clearTimeout(this.addedTime);
                clearTimeout(this.addingTime);

                this.set("addingTime", undefined);
                this.set("addedTime", undefined);
                this.set("addedChange", false);
                this.set("addingChange", false);
                this.set("addedToCart", "Add To Cart");
            }
        },


        isPrevious: Ember.computed('last', function () {
            return this.get("last") > 10;
        }),

        // enabling the next button .
        isNext: Ember.computed('last', 'relateProducts', function () {
            return this.get("relateProducts") ? this.get("relateProducts").length > this.get("last") : false;
        }),

        displayProducts: Ember.computed('relateProducts', 'last', function () {
            return this.get("relateProducts") && this.get("last") ? this.get("relateProducts").slice(this.get("last") - 10, this.get("last")) : null;
        }),

        actions: {
            handleMouseMove: function handleMouseMove(event) {
                var image = event.target.src;
                var rect = event.target.getBoundingClientRect();

                // Calculate relative mouse position
                var x = event.pageX - rect.left;
                var y = event.pageY - rect.top;

                var backgroundX = x / rect.width * 100;
                var backgroundY = y / rect.height * 100;

                // Update the magnified style with the background image and position


                this.set('magnifiedStyle', ' \n                background-image: url(\'' + image + '\');\n                background-size: ' + rect.width * 3.5 + 'px ' + rect.height * 3.5 + 'px;\n                background-position: ' + backgroundX + '% ' + backgroundY + '%;');
            },
            handleMouseLeave: function handleMouseLeave() {
                this.set('magnifiedStyle', 'display: none;');
            },


            // last - 10
            previous: function previous() {
                this.set("last", this.get("last") - 10);
            },


            // last + 10
            next: function next() {
                this.set("last", this.get("last") + 10);
            },


            back: function back() {
                this.set("isBuyProduct", false);
                this.set("added", false);
            },

            // buying the product alone .
            buy: function buy(name, mobile, address) {
                var _this2 = this;

                this.set("isBuyProduct", false);
                this.set("isLoader", true);
                var body = {
                    "name": name,
                    "mobile": mobile,
                    "address": address,
                    "cartId": this.get("customerId"),
                    "discountPrice": this.get("isMaxStock") ? this.get("model").product.price - this.get("discountedPrice") : 0,
                    "coupon": this.get("isMaxStock") ? " The Deal of the moment . " : "No Coupon Details"
                };

                var uri = new _URIClass.default("product", this.get("model").product.product_id);

                uri.post(body).then(function (data) {

                    if (data["message"] === true) {

                        _this2.set("isBuyProduct", false);
                        _this2.set("isMaxStock", false);
                        _this2.set("discountedPrice", 0);
                        _this2.set("name", "");
                        _this2.set("mobile", "");
                        _this2.set("address", "");

                        var applicationModel = Ember.getOwner(_this2).lookup("route:application").modelFor("application");

                        console.log(" before ", applicationModel);
                        // Notify Ember of the update (this step might be needed depending on your version)
                        Ember.set(applicationModel, 'orders_count', applicationModel.orders_count + 1);

                        _this2.notifyPropertyChange('applicationModel');

                        console.log(" after ", applicationModel);

                        setTimeout(function () {
                            _this2.set("isLoader", false);
                            _this2.set("orderSuccess", true);
                        }, 1000);

                        setTimeout(function () {
                            _this2.set("orderSuccess", false);
                            _this2.transitionToRoute("account");
                        }, 2000);
                    } else {
                        _this2.set("orderError", true);
                        setTimeout(function () {
                            _this2.set("orderError", false);
                        }, 2000);
                    }
                }).catch(function (error) {
                    console.log(error);
                    _this2.afterError(error);
                });
            },


            // adding the product to the cart .
            addToCart: function addToCart() {
                var _this3 = this;

                var applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application");
                var customerId = applicationModel.customer_id;

                var uri = new _URIClass.default("cart", customerId);

                var cartProduct = this.get("cartProducts.cartProductsList").cartProducts.filter(function (product) {
                    return product.product.product_id === _this3.get("model").product.product_id;
                })[0];
                console.log(cartProduct, " cartProduct");
                if (cartProduct) {

                    if (cartProduct.count < this.get("model").product.stock) {
                        var body = {
                            "cartProductId": cartProduct.cp_id,
                            "count": cartProduct.count + 1
                        };
                        uri.put(body).then(function (data) {

                            var cartProducts = _this3.get("cartProducts.cartProductsList");

                            // Find the cart product by cartProductId and update its count
                            var updatedCartProducts = cartProducts.cartProducts.map(function (product) {

                                if (product.cp_id === cartProduct.cp_id) {
                                    console.log(data["message"] === true ? body.count : body.count - 1);
                                    return Object.assign({}, product, { count: data["message"] === true ? body.count : body.count - 1 });
                                }
                                return product;
                            });

                            Ember.set(cartProducts, 'cartProducts', updatedCartProducts);
                            Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);

                            // Set the updated cartProducts array
                            _this3.set("cartProducts.cartProductsList", cartProducts);

                            // Refresh cart items .

                            _this3.cartButtonAnimation();
                        }).catch(function (error) {

                            console.log(error);
                            _this3.afterError(error);
                        });
                    } else {

                        alert(" The Product " + this.get("model").product.product_id + " reached max Quantity in cart ");
                    }
                } else {

                    uri.post({
                        "productId": this.get("model").product.product_id
                    }).then(function (data) {
                        if (data["message"] != null) {

                            var cartItem = {

                                "product": _this3.get("model").product,
                                "count": 1,
                                "cp_id": data["message"]

                            };

                            console.log("before ", _this3.get("cartProducts.cartProductsList").cartProducts);

                            var cartProducts = _this3.get("cartProducts.cartProductsList");
                            Ember.set(cartProducts, 'cartProducts', [].concat(_toConsumableArray(cartProducts.cartProducts || []), [cartItem]));
                            Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);

                            // Set the updated cartProducts array
                            _this3.set("cartProducts.cartProductsList", cartProducts);

                            console.log(" after ", _this3.get("cartProducts.cartProductsList").cartProducts);

                            _this3.cartButtonAnimation();
                        } else {

                            alert(" The Product " + _this3.get("model").product.product_id + " is out of Stock ");
                        }
                    }).catch(function (error) {
                        console.log(error);

                        _this3.afterError(error);
                    });
                }
            },
            buyProduct: function buyProduct() {
                this.set("isBuyProduct", true);
            }
        }
    });
});
define('z-kart/controllers/products/search', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    // filtering the searched products .

    init: function init() {
      this.set("last", 10);
    },


    isPrevious: Ember.computed('last', function () {
      return this.get("last") > 10;
    }),

    isNext: Ember.computed('last', 'products', function () {
      return this.get("products").length > this.get("last");
    }),

    displayProducts: Ember.computed('products', 'last', function () {
      return this.get("products").slice(this.get("last") - 10, this.get("last"));
    }),

    isFilteredProducts: Ember.computed('filteredProducts.length', function () {

      return this.get("filteredProducts.length") > 0;
    }),

    actions: {
      previous: function previous() {
        this.set("last", this.get("last") - 10);
      },
      next: function next() {
        this.set("last", this.get("last") + 10);
      },
      back: function back() {
        this.set('isFilter', false);
      },
      displayFilter: function displayFilter() {
        this.set('isGlobal', false);
        this.set('isFilter', true);
      },
      filter: function filter(data) {
        this.set('products', data);
        this.set("filteredProducts", data);
        this.set('isFilter', false);
        this.set("last", 10);
      },
      clear: function clear() {
        this.set('products', this.model);
        this.set('isFilter', false);
        this.set('filteredProducts', []);
      },


      // Error Handing Action .
      afterError: function afterError(error) {

        console.log(error);

        var status = error.status; // Get status code
        var message = encodeURIComponent(error.statusText); // Get status text
        // Navigate to the error route with code and message
        this.transitionToRoute('errorpage', status, message);
      }
    }
  });
});
define('z-kart/controllers/signin', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var uri = new _URIClass.default('customer');

    exports.default = Ember.Controller.extend({

        emailTrue: false,

        done: false,

        isEmailValid: Ember.computed("emailTrue", "done", function () {
            return this.get("emailTrue") && this.get("done");
        }),

        actions: {
            next: function next() {
                this.set("done", true);
                if (!this.get("emailTrue")) {
                    this.set("emailError", " Invalid Email !");
                }
            },
            back: function back() {
                this.set("done", false);
            },
            clearPasswordError: function clearPasswordError() {

                this.set("passwordError", undefined);
            },
            clearEmailError: function clearEmailError() {

                this.set("emailError", undefined);
            },


            // sign in form submition .
            onSubmit: function onSubmit() {
                var _this = this;

                this.set("isLoader", true);
                var body = {
                    "email": this.get('email'),
                    "password": btoa(this.get('password'))
                };

                if (this.get("emailTrue")) {
                    uri.post(body).then(function (data) {

                        if (data === null) {
                            setTimeout(function () {
                                _this.set("isLoader", false);
                                _this.set("passwordError", "password incorrect ! .");
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                _this.set("isLoader", false);
                                window.location.reload();
                            }, 1000);
                        }
                    }).catch(function (error) {
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text
                        _this.transitionToRoute('errorpage', status, message);
                    });
                } else {
                    this.set("passwordError", "invalid details");
                    this.set("isLoader", false);
                }
            },

            // cheching the email in db .
            checkEmail: function checkEmail() {
                var _this2 = this;

                var body = {
                    "email": this.get('email')
                };

                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (this.get('email') && emailPattern.test(this.get('email'))) {

                    uri.get(body).then(function (data) {
                        if (data && data["message"] === true) {
                            _this2.set("emailTrue", true);
                            _this2.set("emailError", undefined);
                        } else {
                            _this2.set("emailTrue", false);
                            _this2.set("emailError", " user does not exist Please sign up !");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text

                        _this2.transitionToRoute('errorpage', status, message);
                    });
                } else {
                    this.set("emailTrue", false);
                    this.set("emailError", "invalid email");
                }
            },

            // toggle the password type .
            togglePasswordVisibility: function togglePasswordVisibility() {
                this.toggleProperty('showPassword'); // Toggle the visibility of the password
            }

        }

    });
});
define('z-kart/controllers/signup', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var uri = new _URIClass.default("customer");

    exports.default = Ember.Controller.extend({

        passwordComplexity: Ember.inject.service("passwordcomplexity"),
        isCheckPassword: false,
        isCheckConfirmPassword: false,
        isPasswordsMatched: false,
        isMobile: false,
        submitForm: false,
        done: false,

        isAllowOtp: Ember.computed("isCheckConfirmPassword", "isCheckPassword", "isPasswordsMatched", "isMobile", "submitForm", "toggleForm", function () {
            return this.get("isCheckConfirmPassword") && this.get("isCheckPassword") && this.get("isPasswordsMatched") && this.get("isMobile") && this.get("submitForm") && this.get("toggleForm");
        }),

        checkEmail: function checkEmail(email) {
            var _this = this;

            var body = {
                "email": email,
                "sendOtp": 0
            };

            var uri = new _URIClass.default("customer");
            uri.get(body).then(function (data) {
                if (data["message"] === true) {
                    _this.set("submitForm", false);
                    _this.set("emailError", "User already exists. Please sign in !");
                } else {
                    _this.set("submitForm", true);
                }
            }).catch(function (error) {
                console.log(error);
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                _this.transitionToRoute('errorpage', status, message);
            });
        },


        actions: {

            // This action prevents number input
            preventNumbers: function preventNumbers(event) {

                var key = event.key;
                // Check if the key pressed is a number (0-9)
                if (/\d/.test(key)) {
                    event.preventDefault(); // Prevent entering numbers
                }
            },
            clearEmailError: function clearEmailError() {
                this.set("emailError", undefined);
                this.set("error", undefined);
            },
            clearNameError: function clearNameError(event) {
                this.set("nameError", undefined);
                this.set("error", undefined);
                this.set("name", event.target.value);
            },
            checkName: function checkName() {
                if (this.get("name").trim() === "") {
                    this.set("nameError", "invalid Name !");
                }
            },
            clearMobileError: function clearMobileError(event) {

                this.set("mobileError", undefined);
                this.set("error", undefined);
            },
            clearAddressError: function clearAddressError() {
                this.set("addressError", undefined);
                this.set("error", undefined);
            },
            checkAddress: function checkAddress() {
                if (this.get("address").trim() === "") {
                    this.set("addressError", "invalid Details !");
                }
            },
            next: function next() {

                this.set("toggleForm", true);
                if (!this.get("name") || this.get("name") && this.get("name").trim() === "") {
                    this.set("nameError", " Please Enter The Name .");
                    this.set("toggleForm", false);
                }

                if (!this.get("address") || this.get("address") && this.get("address").trim() === "") {
                    this.set("addressError", " Please Enter An Address .");
                    this.set("toggleForm", false);
                }

                if (!this.get("email") || this.get("email") && this.get("email").trim() === "") {
                    this.set("emailError", " Please Enter An Email .");
                    this.set("toggleForm", false);
                }

                if (!this.get("mobile") || this.get("mobile") && this.get("mobile").trim() === "") {
                    this.set("mobileError", " Please Enter an indian Mobile number .");
                    this.set("toggleForm", false);
                }

                if (!this.get("password") || this.get("password") && this.get("password").trim() === "") {
                    this.set("passwordError", " Please Enter a Password .");
                    this.set("toggleForm", false);
                }

                if (!this.get("passwordConfirm") || this.get("passwordConfirm") && this.get("passwordConfirm").trim() === "") {
                    this.set("confirmPasswordError", " Please Enter a Confirm Password .");
                    this.set("toggleForm", false);
                }
            },
            back: function back() {
                this.set("toggleForm", false);
            },


            // check the email pattern .
            checkEmailPattern: function checkEmailPattern() {

                this.set("submitForm", false);
                var value = this.get("email");
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var temp = emailPattern.test(value);

                if (temp) {
                    this.set("emailPattern", true);
                    this.checkEmail(value);
                } else {
                    this.set("emailError", "Invalid Email ! ");
                }
                this.set("email", value);
            },


            // validate mobile .
            validateMobile: function validateMobile(event) {

                var value = event.target.value;

                if (value.length > 9 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                }
            },


            // store the mobile number .
            storeMobile: function storeMobile(event) {
                this.set("mobile", event.target.value);
                this.set("isMobile", false);

                if (event.target.value.length === 10 && event.target.value.trim() != "") {
                    this.set("isMobile", true);
                    this.set("error", "");
                } else {
                    this.set("isMobile", false);
                    this.set("mobileError", " Invalid Mobile Number ! ");
                }
            },


            //  validate the OTP .
            validateOtp: function validateOtp(event) {

                var value = event.target.value;

                if (value.length > 3 || !/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) {
                    event.preventDefault();
                } else {
                    this.set("otp", value);
                }
            },


            // store the otp .
            storeOtp: function storeOtp(event) {

                var value = event.target.value;

                this.set("otp", value);
            },


            // check the new passsword 
            checkPassword: function checkPassword(event) {
                var password = event.target.value;
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method

                this.set("isCheckPassword", isValid);

                if (!isValid) {
                    this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
                } else {
                    this.set("passwordError", undefined);
                }
                this.set("password", password);
                this.set("passwordConfirm", "");
                this.set("isCheckConfirmPassword", false);
            },


            // check the confirm password .
            checkConfirmPassword: function checkConfirmPassword(event) {
                var password = event.target.value;
                var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method

                this.set("isCheckPassword", isValid);

                var matched = this.get("password") === password;

                if (!isValid && matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                } else if (isValid && !matched) {
                    this.set("confirmPasswordError", "Passwords do not match.");
                } else if (!isValid && !matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6 and passwords doesn;t matched .");
                } else {
                    this.set("confirmPasswordError", undefined);
                }

                this.set("passwordConfirm", password);
                this.set("isCheckConfirmPassword", isValid);
                this.set("isPasswordsMatched", matched);
            },


            // submit the sign up form .
            onSubmit: function onSubmit() {
                var _this2 = this;

                if (this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched && this.isMobile && this.submitForm) {

                    this.set("isLoader", true);

                    var body = {
                        "email": this.get("email"),
                        "name": this.get("name"),
                        "mobile": this.get("mobile"),
                        "address": this.get("address"),
                        "password": btoa(this.get("password")),
                        "otp": this.get("otp")
                    };

                    uri.post(body).then(function (data) {
                        if (data["message"] != "null") {
                            setTimeout(function () {
                                _this2.set("isLoader", false);
                                _this2.transitionToRoute("signin");
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                _this2.set("isLoader", false);
                                _this2.set("error", "invalid OTP !");
                            }, 1000);
                        }
                    }).catch(function (error) {
                        console.log(error);
                        var status = error.status; // Get status code
                        var message = encodeURIComponent(error.statusText); // Get status text
                        // Navigate to the error route with code and message
                        _this2.transitionToRoute('errorpage', status, message);
                    });
                } else {
                    this.set("error", "Invalid details!");
                }
            },


            togglePasswordVisibility: function togglePasswordVisibility() {
                this.toggleProperty('showPassword'); // Toggle the visibility of the old password
            },
            toggleNewPasswordVisibility: function toggleNewPasswordVisibility() {
                this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
            }
        }
    });
});
define('z-kart/helpers/app-version', ['exports', 'z-kart/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('z-kart/helpers/contains', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contains = contains;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function contains(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        selectedCategories = _ref2[0],
        category = _ref2[1];

    return selectedCategories.includes(category.toLowerCase());
  }

  exports.default = Ember.Helper.helper(contains);
});
define('z-kart/helpers/eq', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.eq = eq;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function eq(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        param1 = _ref2[0],
        param2 = _ref2[1];

    return param1 === param2;
  }

  exports.default = Ember.Helper.helper(eq);
});
define("z-kart/helpers/format-time", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatTime = formatTime;
  function formatTime(params /*, hash*/) {
    var date = params[0].split(" ");
    return date[0];
  }

  exports.default = Ember.Helper.helper(formatTime);
});
define('z-kart/helpers/mul', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mul = mul;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function mul(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    var numA = parseInt(a, 10);
    var numB = parseInt(b, 10);

    console.log(numA);
    console.log(numB);

    if (isNaN(numA) || isNaN(numB)) {
      throw new Error('Invalid input: Both inputs must be valid numbers.');
    }

    return String(numA * numB);
  }

  exports.default = Ember.Helper.helper(mul);
});
define("z-kart/helpers/order-coupon", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.orderCoupon = orderCoupon;
  function orderCoupon(params /*, hash*/) {

    if (params[0].length < 6) {
      return " No Discount Is Applied To This Order .";
    }
    return params[0];
  }

  exports.default = Ember.Helper.helper(orderCoupon);
});
define('z-kart/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('z-kart/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('z-kart/helpers/sum', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sum = sum;
  function sum(params /*, hash*/) {
    return params[0] + params[1];
  }

  exports.default = Ember.Helper.helper(sum);
});
define('z-kart/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'z-kart/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('z-kart/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('z-kart/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('z-kart/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('z-kart/initializers/export-application-global', ['exports', 'z-kart/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('z-kart/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('z-kart/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('z-kart/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("z-kart/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('z-kart/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('z-kart/router', ['exports', 'z-kart/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('signup');
    this.route('changepassword');
    this.route('signin');
    this.route('about');
    this.route('account', function () {
      this.route('products', { path: "/:order_id" });
    });
    this.route('error', { path: '*path' });
    this.route('admin');
    this.route('products', function () {
      this.route('index', { path: "/" });
      this.route('search', { path: '/:searchContent' });
      this.route('product', { path: '/product/:product_id' });
    });
    this.route('Cart', { path: "cart" });
    this.route('errorpage', { path: '/errorpage/:code/:description' });
  });

  exports.default = Router;
});
define("z-kart/routes/about", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        // about data .
        model: function model() {
            return [{
                "align": 1,
                "image": "https://c8.alamy.com/comp/2J3NEEE/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-and-password-safety-measures-2J3NEEE.jpg",
                "title": "User-Friendly Authentication",
                "body": "Experience seamless sign-up and login with our user-friendly authentication system. Customers are guided through the process, ensuring security with encrypted passwords. Existing users are prompted to log in, making navigation intuitive and hassle-free."
            }, {
                "image": "https://static.vecteezy.com/system/resources/previews/014/435/776/non_2x/best-deal-banner-best-deal-badge-icon-discount-price-offer-modern-illustration-vector.jpg",
                "title": "Deal of The Moment",
                "body": "Don't miss out on our special discounts! The item with the highest stock is featured as the Deal of the Moment, giving you an automatic 10% discount. This deal refreshes with every purchase, ensuring you always get the best price."
            }, {
                "align": 1,
                "image": "https://img.freepik.com/premium-vector/free-delivery-icon-fast-food-service-scooter-sign_8071-38373.jpg",
                "title": "Free Delivery on Orders",
                "body": "Enjoy free delivery on all orders over a specified amount! We ensure your gadgets reach you safely and swiftly without any additional cost, enhancing your shopping experience."
            }, {
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHFu1IN6nxgpeOu3TpXvTXsQtx85qUBsDaw&s",
                "title": "Exclusive Discount Codes",
                "body": "Unlock exclusive discounts as you shop! Customers who exceed a certain spending threshold receive unique discount codes between 20% - 30% for their next purchases. These codes add extra value to your shopping experience."
            }];
        }
    });
});
define("z-kart/routes/account", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {

            if (this.modelFor("application") !== undefined) {
                return this.modelFor("application");
            } else {
                this.transitionTo("index");
            }
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model);
            controller.set("isLoader", false);
        }
    });
});
define('z-kart/routes/account/index', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        // orders details of the customer .
        model: function model() {
            var _this = this;

            var uri = new _URIClass.default("order", this.modelFor('application').customer_id);
            return uri.get().then(function (data) {
                return data;
            }).catch(function (error) {
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                _this.transitionTo('errorpage', status, message);
            });
        }
    });
});
define('z-kart/routes/account/products', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        // checking whether the user is there or not .
        beforeModel: function beforeModel() {

            if (this.modelFor('application') === undefined) {
                this.transitionTo("account");
            }
        },


        // order products .
        model: function model(params) {
            var _this = this;

            var id = params.order_id;
            var uri = new _URIClass.default("order", this.modelFor('application').customer_id, id, "products");

            return uri.get().then(function (data) {

                if (data !== null) {
                    return data;
                } else {
                    _this.transitionTo("account");
                }
            }).catch(function (error) {
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                _this.transitionTo('errorpage', status, message);
            });
        }
    });
});
define("z-kart/routes/admin", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        // allow admins .
        beforeModel: function beforeModel() {
            if (this.modelFor("application")) {

                if (this.modelFor("application").user_type <= 0) {
                    this.transitionTo("index");
                }
            } else {
                this.transitionTo("index");
            }
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model);

            controller.toggleProperties("isProducts");
            controller.startingLoad();
            controller.customersCall();
            controller.ordersCall();

            var today = new Date();
            var formattedDate = today.toISOString().split("T")[0]; // formats to YYYY-MM-DD
            controller.set('today', formattedDate); // Set today’s date as the max date
        }
    });
});
define('z-kart/routes/application', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var uri = new _URIClass.default("sessionData");

  exports.default = Ember.Route.extend({
    model: function model() {
      var _this = this;

      return uri.get().then(function (data) {
        if (data != null) {
          console.log(data);
          return data; // Return the data if it's available
        } else {
            // Returning null or nothing to ensure no action is taken here
          }
      }).catch(function (error) {
        var status = error.status; // Get status code
        var message = encodeURIComponent(error.statusText); // Get status text

        // Navigate to the error route with code and message
        _this.transitionTo('errorpage', status, message);
      });
    }
  });
});
define("z-kart/routes/cart", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    afterModel: function afterModel() {

      if (!this.modelFor("application")) {
        this.transitionTo("index");
      }
    },
    setupController: function setupController(controller, model) {

      this._super(controller, model);

      controller.set("isLoader", false);
      controller.set('selectedOption', "remove"); // default selected option in coupon codes .
      controller.set('user', "user"); // value for User Coupon Code Option tag .
      controller.set('maxprice', 'maxprice'); // value for 20000PRICE coupon code option tag
      controller.set("cartProducts", undefined);
      controller.cartItems(); // loading the cartproducts .
    }
  });
});
define('z-kart/routes/changepassword', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {

      if (this.modelFor('application')) {
        this.transitionTo("index");
      }
    },
    setupController: function setupController(controller, model) {

      this._super(controller, model);
      controller.set("isLoader", false);
      controller.set("email", "");
      controller.set("otp", "");
      controller.set("password", "");
      controller.set("passwordConfirm", "");
      controller.set("toggleForm", false);
      controller.set("emailError", undefined);
      controller.set("passwordError", undefined);
      controller.set("confirmPasswordError", undefined);
      controller.set("error", undefined);
    }
  });
});
define("z-kart/routes/error", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {

            this.transitionTo("index");
        }
    });
});
define('z-kart/routes/errorpage', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return {
        code: params.code,
        description: decodeURIComponent(params.description)
      };
    }
  });
});
define('z-kart/routes/index', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        // Empty ...

    });
});
define('z-kart/routes/products/index', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var uri = new _URIClass.default("product");
  exports.default = Ember.Route.extend({
    model: function model() {
      var _this = this;

      // max stock products .
      return uri.get({ filterProducts: 'maxStock' }) // Fetching data
      .then(function (data) {
        return data;
      }) // Return data if successful
      .catch(function (error) {
        var status = error.status || 500; // Default to 500 if status is undefined
        var message = encodeURIComponent(error.statusText || 'Unknown Error');
        // Navigate to the error route with code and message
        _this.transitionTo('errorpage', status, message);
      });
    },
    setupController: function setupController(controller, model) {

      this._super(controller, model);

      controller.callProducts();
      controller.set("last", 10);
      controller.set("isGlobal", true);
      controller.set("isRecentlyAdded", true);
      controller.set("productsData", []);
      controller.set("products", []);
    }
  });
});
define('z-kart/routes/products/product', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model(params) {
            var _this = this;

            var uri = new _URIClass.default("product", params.product_id);
            return uri.get().then(function (data) {
                return data;
            }).catch(function (error) {
                var status = error.status; // Get status code
                var message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                _this.transitionTo('errorpage', status, message);
            });
        },
        setupController: function setupController(controller, model) {

            this._super(controller, model);
            var customerData = this.modelFor("application");
            window.scrollTo(0, 0); // Scrolls to the top of the page
            this.set("isLoader", false);
            controller.set("inStock", false);

            if (customerData !== undefined) {

                controller.set("name", customerData.name);
                controller.set("mobile", customerData.mobile);
                controller.set("address", customerData.address);
                controller.set("customerId", customerData.customer_id);
                controller.set("isCustomer", true);
                controller.set("inStock", model.product.stock > 0);
            } else {
                controller.set("isCustomer", false);
            }
            controller.set("isMaxStock", false);

            model.maxStock.forEach(function (product) {
                if (product.product_id === model.product.product_id) {
                    controller.set("isMaxStock", true);
                    controller.set("discountedPrice", Math.round(model.product.price * 0.9));
                }
            });

            controller.set("last", 10);
            controller.set('magnifiedStyle', 'display: none;');
            controller.relatedProducts();
            controller.set("relateProducts", model.relatedProducts.filter(function (product) {
                return product.product_id != model.product.product_id;
            }));
        }
    });
});
define('z-kart/routes/products/search', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });


   var uri = new _URIClass.default("search");

   var categorySynonyms = {
      audio: ["sound", "music", "earphones", "headphones"],
      components: ["parts", "hardware", "pieces"],
      gaming: ["video games", "games", "game console", "console", "playstation", "xbox"],
      "Home Appliance": ["appliances", "household", "kitchen", "electronic devices"],
      Laptops: ["notebook", "computer", "laptop"],
      Smartphones: ["phones", "mobile", "cellphone"],
      Audio: ["sound", "stereo"],
      Cameras: ["camera", "photography", "lens"],
      Televisions: ["tv", "television", "screen"],
      smartwatch: ["watch", "wearable", "smart watch"]
   };

   exports.default = Ember.Route.extend({
      filterStore: Ember.inject.service("filter-store"),

      model: function model(param) {
         var _this = this;

         var content = param.searchContent.toLowerCase();

         // Find the category by checking if any synonym includes the input content
         var category = Object.keys(categorySynonyms).find(function (key) {
            return key.toLowerCase().includes(content) || categorySynonyms[key].some(function (synonym) {
               return content.includes(synonym);
            });
         }) || content;

         console.log(" categorry is ", category);
         return uri.get({
            "searchContext": category
         }).then(function (data) {
            return data;
         }).catch(function (error) {
            var status = error.status;
            var message = encodeURIComponent(error.statusText);
            _this.transitionTo('errorpage', status, message);
         });
      },
      setupController: function setupController(controller, model) {
         this._super(controller, model);
         this.get("filterStore").clear();

         controller.set("products", model);
         controller.set("filteredProducts", []);
      }
   });
});
define('z-kart/routes/signin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      // application model is not null then redirect to index .
      if (this.modelFor('application')) {
        this.transitionTo("index");
      }
    },
    setupController: function setupController(controller, model) {

      this._super(controller, model);
      controller.set("isLoader", false);
      controller.set("emailError", undefined);
      controller.set("passwordError", undefined);
      controller.set("password", "");
      controller.set("done", false);
      controller.set("email", "");
      controller.set("emailTrue", false);
    }
  });
});
define('z-kart/routes/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      // application model is not null then redirect to index .
      if (this.modelFor('application')) {
        this.transitionTo("index");
      }
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set("isLoader", false);
      controller.set("email", "");
      controller.set("name", "");
      controller.set("mobile", "");
      controller.set("password", "");
      controller.set("passwordConfim", "");
      controller.set("otp", "");
      controller.set("address", "");
      controller.set("error", undefined);
      controller.set("emailError", undefined);
      controller.set("nameError", undefined);
      controller.set("addressError", undefined);
      controller.set("mobileError", undefined);
      controller.set("passwordError", undefined);
      controller.set("confirmPasswordError", undefined);
      controller.set("toggleForm", false);
    }
  });
});
define('z-kart/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('z-kart/services/cart-products', ['exports', 'z-kart/Classes/URIClass'], function (exports, _URIClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({

        calledInNav: false,

        cartProductsList: "",

        cartProducts: function cartProducts() {
            var _this = this;

            return new _URIClass.default("cart", Ember.getOwner(this).lookup("route:application").modelFor("application").customer_id).get().then(function (data) {
                // Map the product IDs to a new array
                _this.set("cartProductIds", Ember.A(data.cartProducts.map(function (product) {
                    return product.product.product_id;
                })));
                // Update cart count
                _this.set("cartCount", _this.get("cartProductIds").length);

                _this.set("cartProductsList", data);
                return data;
            }).catch(function (error) {
                console.error("Error fetching cart products:", error);
                return error;
            });
        },
        addCartProducts: function addCartProducts(id) {
            if (!this.get("cartProductIds").includes(id)) {
                this.get("cartProductIds").pushObject(id);
                this.set("cartCount", this.get("cartProductIds").length);
            }
        },
        removeCartProduct: function removeCartProduct(id) {
            this.get("cartProductIds").removeObject(id);
            this.set("cartCount", this.get("cartProductIds").length);
        }
    });
});
define('z-kart/services/filter-store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    localCategories: undefined,
    localModels: undefined,
    localBrands: undefined,
    localHighPrice: undefined,
    localLowPrice: undefined,
    localFilteredProducts: undefined,

    globalCategories: undefined,
    globalModels: undefined,
    globalBrands: undefined,
    globalHighPrice: undefined,
    globalLowPrice: undefined,
    globalFilteredProducts: undefined,

    // Clears all local variables by setting them to undefined
    clear: function clear() {
      this.set('localCategories', undefined);
      this.set('localModels', undefined);
      this.set('localBrands', undefined);
      this.set('localHighPrice', undefined);
      this.set('localLowPrice', undefined);
      this.set('localFilteredProducts', undefined);
    },


    // Updates the local variables with the provided parameters
    addLocal: function addLocal(categories, brands, models, highPrice, lowPrice, filterProducts) {
      this.set('localCategories', categories);
      this.set('localModels', models);
      this.set('localBrands', brands);
      this.set('localHighPrice', highPrice);
      this.set('localLowPrice', lowPrice);
      this.set('localFilteredProducts', filterProducts);
    },


    // Updates the global variables with the provided parameters
    addGlobal: function addGlobal(categories, brands, models, highPrice, lowPrice, filterProducts) {
      this.set('globalCategories', categories);
      this.set('globalModels', models);
      this.set('globalBrands', brands);
      this.set('globalHighPrice', highPrice);
      this.set('globalLowPrice', lowPrice);
      this.set('globalFilteredProducts', filterProducts);
    }
  });
});
define('z-kart/services/passwordcomplexity', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({

        // To Check The Password Requriements .
        checkPasswordComplexity: function checkPasswordComplexity(password) {

            var lowerCasePattern = /(?=(.*[a-z].*)){2}/; // At least 2 lowercase letters
            var upperCasePattern = /(?=(.*[A-Z].*)){2}/; // At least 2 uppercase letters
            var numberPattern = /(?=(.*\d.*)){2}/; // At least 2 numbers
            var symbolPattern = /(?=(.*[\W_].*)){0,}/; // Accepts symbols, but not mandatory
            var lengthRequirement = password.length >= 6; // Minimum length of 6

            return lowerCasePattern.test(password) && upperCasePattern.test(password) && numberPattern.test(password) && lengthRequirement && symbolPattern.test(password) // Check for symbols, if present
            ;
        }

    });
});
define("z-kart/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mtbcITGU", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"about-banner\"],[13],[0,\"\\n\\n    \"],[1,[33,[\"zkart-logo\"],null,[[\"logoSize\",\"sloganSize\"],[100,0]]],false],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"Experience the Future of Electronics\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"features\"],[13],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"feature\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"feature\",\"align\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"feature\",\"image\"]],\"');\"]]],[13],[0,\"\\n\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[1,[28,[\"feature\",\"title\"]],false],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[13],[1,[28,[\"feature\",\"body\"]],false],[0,\" \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[1,[28,[\"feature\",\"title\"]],false],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[1,[28,[\"feature\",\"body\"]],false],[0,\" \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n     \"],[11,\"div\",[]],[15,\"class\",\"image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"feature\",\"image\"]],\"');\"]]],[13],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[\"feature\"]},null],[0,\"\\n\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/about.hbs" } });
});
define("z-kart/templates/account", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VqkuVMiP", "block": "{\"statements\":[[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"allowChangePassword\"]]],null,{\"statements\":[[1,[33,[\"change-password\"],null,[[\"triggerAfterError\",\"triggerBack\",\"triggerChangePassword\",\"customerId\",\"isBackAllowed\"],[[33,[\"action\"],[[28,[null]],\"afterError\"],null],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"changePasswordSubmit\"],null],[28,[\"model\",\"customer_id\"]],true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isAlert\"]]],null,{\"statements\":[[1,[33,[\"alert-pop\"],null,[[\"confirm\",\"title\"],[true,\"Password Changed\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"\\n    \"],[1,[33,[\"add-edit-user\"],null,[[\"emailVaild\",\"name\",\"mobile\",\"address\",\"customerId\",\"isEdit\",\"selectedOption\",\"isAdmin\",\"triggerBack\",\"triggerEditedUser\"],[true,[28,[\"name\"]],[28,[\"mobile\"]],[28,[\"address\"]],[28,[\"customerId\"]],[28,[\"isEdit\"]],[28,[\"model\",\"user_type\"]],false,[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"editedUser\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"account\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"side-bar\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"picture\"],[13],[0,\"\\n  \"],[11,\"i\",[]],[15,\"class\",\"fa-sharp-duotone fa-solid fa-circle-user\"],[13],[14],[0,\"\\n  \"],[11,\"p\",[]],[15,\"style\",\"color: #848484;\"],[13],[1,[28,[\"model\",\"customer_id\"]],false],[14],[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\"Welocome, \"],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[28,[\"model\",\"email\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"icons\"],[13],[0,\"\\n\\n  \"],[11,\"a\",[]],[15,\"title\",\" Edit Details\"],[5,[\"action\"],[[28,[null]],\"editUser\"]],[13],[0,\" \"],[11,\"button\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen-to-square\"],[13],[14],[14],[14],[0,\"\\n   \\n   \"],[6,[\"link-to\"],[\"Cart\"],[[\"title\"],[\"got to Cart Page\"]],{\"statements\":[[0,\" \"],[11,\"button\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-cart-shopping\"],[13],[14],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n      \\n      \"],[11,\"button\",[]],[15,\"title\",\" Log Out\"],[5,[\"action\"],[[28,[null]],\"logout\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-share-from-square\"],[13],[14],[0,\" \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n          \"],[11,\"p\",[]],[15,\"class\",\"change\"],[15,\"style\",\"color:darkblue\"],[5,[\"action\"],[[28,[null]],\"changePassword\"]],[13],[0,\" change password\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/account.hbs" } });
});
define("z-kart/templates/account/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ak5S49QH", "block": "{\"statements\":[[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"orders-title\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"  Order Details \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\" \"],[1,[33,[\"order-component\"],null,[[\"order\"],[[28,[\"order\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"order\"]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/account/index.hbs" } });
});
define("z-kart/templates/account/products", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0sVqVyGO", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"orders-title\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"  Ordered Products \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"bought-products\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"product-container\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"products.product\",[28,[\"product\",\"product\",\"product_id\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"product-card\"],[13],[0,\"\\n                \"],[11,\"img\",[]],[16,\"src\",[28,[\"product\",\"product\",\"image\"]],null],[15,\"alt\",\"Product Image\"],[13],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"product-details\"],[13],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"product-info\"],[13],[0,\"\\n\\n                        \"],[11,\"h1\",[]],[13],[1,[28,[\"product\",\"order_id\"]],false],[14],[0,\"\\n                        \"],[11,\"strong\",[]],[13],[11,\"p\",[]],[13],[1,[28,[\"product\",\"product\",\"name\"]],false],[14],[14],[0,\"\\n                        \"],[11,\"p\",[]],[13],[1,[28,[\"product\",\"product\",\"brand\"]],false],[14],[0,\"\\n                        \"],[11,\"p\",[]],[13],[0,\"Quantity \"],[1,[28,[\"product\",\"count\"]],false],[14],[0,\"\\n\\n                        \"],[11,\"p\",[]],[15,\"style\",\"color: red;\"],[13],[0,\"Price:\"],[1,[28,[\"product\",\"product\",\"price\"]],false],[0,\" Rs\"],[14],[0,\"\\n                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"product-price\"],[13],[0,\"\\n                   \"],[11,\"h1\",[]],[15,\"style\",\"color: green;\"],[13],[0,\" \"],[1,[33,[\"mul\"],[[28,[\"product\",\"product\",\"price\"]],[28,[\"product\",\"count\"]]],null],false],[0,\" Rs \"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"product\"]},null],[0,\"    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\"],[11,\"h2\",[]],[13],[0,\" The Product Has Been Deleted .\"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"products-button\"],[13],[0,\"\\n\\n     \"],[6,[\"link-to\"],[\"account\"],null,{\"statements\":[[11,\"button\",[]],[15,\"style\",\"color:white;\"],[13],[0,\"Back \"],[14]],\"locals\":[]},null],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/account/products.hbs" } });
});
define("z-kart/templates/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "m7f8ydgr", "block": "{\"statements\":[[0,\"\\n\"],[1,[33,[\"admin-nav-bar\"],null,[[\"product\",\"triggerDisplayCustomers\",\"triggerDisplayProducts\",\"triggerDisplayAdmins\",\"triggerDisplayOrders\",\"triggerProductsSearch\",\"triggerCustomersSearch\",\"triggerAdminsSearch\",\"triggerOrdersSearch\",\"triggerAddedProduct\",\"triggerAddedUser\",\"triggerAfterError\",\"customersData\",\"adminsData\"],[true,[33,[\"action\"],[[28,[null]],\"displayCustomers\"],null],[33,[\"action\"],[[28,[null]],\"displayProducts\"],null],[33,[\"action\"],[[28,[null]],\"displayAdmins\"],null],[33,[\"action\"],[[28,[null]],\"displayOrders\"],null],[33,[\"action\"],[[28,[null]],\"searchProducts\"],null],[33,[\"action\"],[[28,[null]],\"searchCustomers\"],null],[33,[\"action\"],[[28,[null]],\"searchAdmins\"],null],[33,[\"action\"],[[28,[null]],\"searchOrders\"],null],[33,[\"action\"],[[28,[null]],\"addedProduct\"],null],[33,[\"action\"],[[28,[null]],\"addedCustomer\"],null],[33,[\"action\"],[[28,[null]],\"afterError\"],null],[28,[\"customersData\"]],[28,[\"adminsData\"]]]]],false],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"id\",\"data-display\"],[15,\"class\",\"data-container\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isAdmins\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"h1\",[]],[15,\"style\",\"text-align:center\"],[13],[0,\" Admin Details \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"admins\"]]],null,{\"statements\":[[0,\"\\n  \"],[1,[33,[\"customers-table\"],null,[[\"triggerUpdateCustomer\",\"customers\",\"triggerReloadCustomer\",\"triggerAfterError\"],[[33,[\"action\"],[[28,[null]],\"updateAdmin\"],null],[28,[\"admins\"]],[33,[\"action\"],[[28,[null]],\"reloadAdmins\"],null],[33,[\"action\"],[[28,[null]],\"afterError\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"No Record\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isCustomers\"]]],null,{\"statements\":[[0,\"\\n  \"],[11,\"h1\",[]],[15,\"style\",\"text-align:center\"],[13],[0,\" Customer Details \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"customers\"]]],null,{\"statements\":[[0,\"\\n  \"],[1,[33,[\"customers-table\"],null,[[\"triggerUpdateCustomer\",\"customers\",\"triggerReloadCustomer\",\"triggerAfterError\"],[[33,[\"action\"],[[28,[null]],\"updateCustomer\"],null],[28,[\"customers\"]],[33,[\"action\"],[[28,[null]],\"reloadCustomers\"],null],[33,[\"action\"],[[28,[null]],\"afterError\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[11,\"p\",[]],[13],[0,\"No Records\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isProducts\"]]],null,{\"statements\":[[0,\" \\n\\n      \"],[11,\"h1\",[]],[15,\"style\",\"text-align:center\"],[13],[0,\" Product Details \"],[14],[0,\"\\n\\n    \\n\\n\"],[6,[\"if\"],[[28,[\"products\"]]],null,{\"statements\":[[0,\"    \\n \\n  \"],[1,[33,[\"products-table\"],null,[[\"triggerAfterError\",\"triggerUpdateProduct\",\"products\",\"triggerReloadProducts\"],[[33,[\"action\"],[[28,[null]],\"afterError\"],null],[33,[\"action\"],[[28,[null]],\"updateProduct\"],null],[28,[\"products\"]],[33,[\"action\"],[[28,[null]],\"reloadProducts\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"No Records\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isOrders\"]]],null,{\"statements\":[[0,\"\\n      \"],[11,\"h1\",[]],[15,\"style\",\"text-align:center\"],[13],[0,\" Order Details \"],[14],[0,\"\\n\\n      \"],[11,\"label\",[]],[15,\"for\",\"date\"],[13],[0,\"Filter By date:\"],[14],[0,\"\\n      \"],[11,\"input\",[]],[15,\"type\",\"date\"],[15,\"id\",\"date\"],[16,\"max\",[26,[\"today\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"updateDate\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\" \\n\"],[6,[\"if\"],[[28,[\"orders\"]]],null,{\"statements\":[[0,\"\\n  \"],[1,[33,[\"orders-table\"],null,[[\"orders\",\"triggerDisplayOrderProducts\"],[[28,[\"orders\"]],[33,[\"action\"],[[28,[null]],\"displayOrderProducts\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[0,\"No Records\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isOrderProducts\"]]],null,{\"statements\":[[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\" Order ID \"],[1,[26,[\"orderId\"]],false],[14],[0,\"\\n\\n  \"],[11,\"button\",[]],[15,\"style\",\"width: 150px; font-size:17px; padding : 10px;margin:10px\"],[5,[\"action\"],[[28,[null]],\"displayOrders\"]],[13],[0,\" Back To Orders\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"orderProducts\"]]],null,{\"statements\":[[0,\"\\n  \"],[1,[33,[\"orderproducts-table\"],null,[[\"orderProducts\"],[[28,[\"orderProducts\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[13],[0,\"No Records\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[0,\"No data available\"],[14],[0,\"\\n  \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/admin.hbs" } });
});
define("z-kart/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dx0+W1kP", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"allowChangePassword\"]]],null,{\"statements\":[[1,[33,[\"change-password\"],null,[[\"triggerAfterError\",\"triggerBack\",\"triggerChangePassword\",\"customerId\"],[[33,[\"action\"],[[28,[null]],\"afterError\"],null],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"changePassword\"],null],[28,[\"model\",\"customer_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isAlert\"]]],null,{\"statements\":[[1,[33,[\"alert-pop\"],null,[[\"confirm\",\"title\"],[true,\"Password Changed\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"beforeSession\"]]],null,{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isNoSearch\"]]],null,{\"statements\":[[1,[26,[\"navigation-bar\"]],false],[0,\"\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"navigation-bar\"],null,null,{\"statements\":[[1,[33,[\"search-bar\"],null,[[\"triggerSearchProducts\"],[[33,[\"action\"],[[28,[null]],\"searchProducts\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/application.hbs" } });
});
define("z-kart/templates/cart", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SguXCwg1", "block": "{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\" \\n\"],[6,[\"if\"],[[28,[\"alterPopup\"]]],null,{\"statements\":[[1,[33,[\"alert-pop\"],null,[[\"title\",\"message\",\"id\",\"triggerBack\",\"triggerConfrim\"],[\"Delete Alert\",\" Do you Want To delete Cart Product \",[28,[\"deleteCartProductId\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"deleteProductConfirm\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"orderError\"]]],null,{\"statements\":[[1,[33,[\"success-order\"],null,[[\"error\"],[true]]],false],[0,\"  \\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"orderSuccess\"]]],null,{\"statements\":[[1,[26,[\"success-order\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isBuyProduct\"]]],null,{\"statements\":[[1,[33,[\"order-details\"],null,[[\"name\",\"mobile\",\"address\",\"triggerBack\",\"triggerBuy\"],[[28,[\"applicationModel\",\"name\"]],[28,[\"applicationModel\",\"mobile\"]],[28,[\"applicationModel\",\"address\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"checkOut\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"cart-product\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"cart-header\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"  \"],[11,\"i\",[]],[15,\"style\",\"cursor: text;\"],[15,\"class\",\"fa-solid fa-cart-shopping\"],[13],[14],[0,\" Cart Items\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \\n\"],[6,[\"if\"],[[28,[\"customerCoupon\"]]],null,{\"statements\":[[0,\"  \"],[11,\"p\",[]],[15,\"style\",\"color: green; text-align:center\"],[13],[0,\" The Customer Coupon is Enabled .\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"cartProductsService\",\"cartProductsList\",\"cartProducts\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"each\"],[[28,[\"cartProductsService\",\"cartProductsList\",\"cartProducts\"]]],null,{\"statements\":[[0,\"\\n\"],[1,[33,[\"cart-product\"],null,[[\"cartProduct\",\"triggerUpdateCount\",\"triggerDeleteProduct\"],[[28,[\"cartProduct\"]],[33,[\"action\"],[[28,[null]],\"updateCount\"],null],[33,[\"action\"],[[28,[null]],\"deleteProduct\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[\"cartProduct\"]},null],[0,\"    \\n\"],[11,\"div\",[]],[15,\"class\",\"coupons\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\"Discount Details \"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayCoupon\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[0,\" \"],[1,[28,[\"coupon\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"coupon\"]},null],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isCheckOut\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"addCouponCode\"],[13],[0,\"\\n\\n        \"],[11,\"h3\",[]],[13],[0,\" Coupon Code \"],[14],[0,\"\\n\\n        \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"addCoupon\"],null],null],[13],[0,\"\\n          \"],[11,\"option\",[]],[15,\"value\",\"remove\"],[16,\"selected\",[33,[\"eq\"],[\"remove\",[28,[\"selectedOption\"]]],null],null],[13],[0,\"Select Coupon\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"customerCoupon\"]]],null,{\"statements\":[[0,\"              \"],[11,\"option\",[]],[15,\"value\",\"user\"],[16,\"selected\",[33,[\"eq\"],[\"user\",[28,[\"selectedOption\"]]],null],null],[13],[1,[28,[\"customerCoupon\",\"coupon\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"totalPriceCoupon\"]]],null,{\"statements\":[[0,\"              \"],[11,\"option\",[]],[15,\"value\",\"maxprice\"],[16,\"selected\",[33,[\"eq\"],[\"maxprice\",[28,[\"selectedOption\"]]],null],null],[13],[1,[28,[\"totalPriceCoupon\",\"coupon\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"prices\"],[13],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"price-row\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-brands fa-ethereum\"],[13],[14],[0,\" Discount Price \"],[14],[0,\" \"],[11,\"h3\",[]],[13],[1,[26,[\"discount\"]],false],[0,\" Rs\"],[14],[0,\" \\n    \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"price-row\"],[13],[0,\"\\n     \"],[11,\"h3\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-brands fa-ethereum\"],[13],[14],[0,\" Total Price \"],[14],[0,\" \"],[11,\"h3\",[]],[13],[1,[26,[\"totalPrice\"]],false],[0,\" Rs\"],[14],[0,\" \\n    \"],[14],[0,\"\\n    \\n      \"],[11,\"div\",[]],[15,\"class\",\"price-row\"],[13],[0,\"\\n     \"],[11,\"h3\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-brands fa-ethereum\"],[13],[14],[0,\" Final Price  \"],[14],[0,\" \"],[11,\"h3\",[]],[15,\"class\",\"final-price\"],[15,\"style\",\"color: green;\"],[13],[1,[26,[\"displayTotal\"]],false],[0,\" Rs\"],[14],[0,\" \\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"buyProduct\"]],[13],[0,\" Check Out\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"style\",\"color: red;\"],[13],[0,\" Please Check The availability of Products \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"cart-header\"],[13],[0,\"\\n          \"],[11,\"video\",[]],[15,\"playsinline\",\"\"],[15,\"autoplay\",\"\"],[15,\"loop\",\"\"],[15,\"muted\",\"\"],[15,\"class\",\"max-w-[500px] min-w-[250px] max-h-[330px]\"],[15,\"style\",\"width: 50%; border-radius:20px; margin:auto;\"],[13],[11,\"source\",[]],[15,\"src\",\"https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-cart-animation-download-in-lottie-json-gif-static-svg-file-formats--no-item-shopping-shpping-bascket-food-delivery-pack-e-commerce-animations-4391074.mp4\"],[15,\"type\",\"video/mp4\"],[13],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n              \"],[6,[\"link-to\"],[\"products.index\"],null,{\"statements\":[[11,\"button\",[]],[15,\"style\",\"background-color: rgb(255, 140, 0);\"],[13],[0,\"Add Products\"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/cart.hbs" } });
});
define("z-kart/templates/changepassword", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BT6O560z", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"authentication-layout\"],null,null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"form-content\"],[13],[0,\"\\n\"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n\\n\"],[11,\"h1\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-key\"],[13],[14],[0,\" Change Password\"],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"isAllowOtp\"]]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[15,\"style\",\"color: green;\"],[13],[0,\" Please Check Your Mail for OTP .\"],[14],[0,\"\\n      \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"error\"]],\"error\"],null]]]],[15,\"type\",\"number\"],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateOtp\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"storeOtp\"],null],null],[16,\"value\",[26,[\"otp\"]],null],[15,\"placeholder\",\"* Otp\"],[15,\"required\",\"\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"error\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"submit-buttons\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-backward\"],[13],[14],[0,\" Back\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\" Submit\"],[14],[0,\"   \\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\\n        \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"emailError\"]],\"error\"],null]]]],[15,\"type\",\"email\"],[16,\"value\",[26,[\"email\"]],null],[15,\"placeholder\",\"* Email\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"clearEmailError\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"checkEmailPattern\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"emailError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"emailError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n\\n\\n          \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"passwordError\"]],\"error\"],null]]]],[16,\"type\",[33,[\"if\"],[[28,[\"showNewPassword\"]],\"text\",\"password\"],null],null],[16,\"value\",[26,[\"password\"]],null],[15,\"placeholder\",\"* Password\"],[15,\"required\",\"\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkPassword\"],null],null],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n                \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"toggleNewPasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showNewPassword\"]]],null,{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n                \"]],\"locals\":[]}],[14],[0,\"\\n\\n            \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"passwordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"passwordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n\\n          \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"confirmPasswordError\"]],\"error\"],null]]]],[16,\"type\",[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null],null],[16,\"value\",[26,[\"passwordConfirm\"]],null],[15,\"placeholder\",\"* Confirm Password\"],[15,\"required\",\"\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkConfirmPassword\"],null],null],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n                \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"togglePasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPassword\"]]],null,{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n                \"]],\"locals\":[]}],[14],[0,\"\\n\\n            \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n            \"],[6,[\"if\"],[[28,[\"confirmPasswordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"confirmPasswordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n            \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-forward\"],[13],[14],[0,\" Next\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"signin\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\"  Sign in \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"link-to\"],[\"signup\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\" Sign up \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/changepassword.hbs" } });
});
define("z-kart/templates/components/add-edit-product", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "l9ilZ9/p", "block": "{\"statements\":[[6,[\"pop-up\"],null,null,{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"isEdit\"]],true],null]],null,{\"statements\":[[0,\"    \"],[11,\"h1\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\" Edit Product\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"h1\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-plus\"],[13],[14],[0,\" Add Product\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[11,\"p\",[]],[15,\"style\",\"color:red\"],[13],[1,[26,[\"error\"]],false],[14],[0,\"\\n    \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n\\n            \"],[11,\"label\",[]],[13],[0,\"Product Name\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"required\"],[[28,[\"name\"]],true]]],false],[0,\"\\n            \\n            \"],[11,\"label\",[]],[13],[0,\"Product Brand\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"required\"],[[28,[\"brand\"]],true]]],false],[0,\"\\n            \\n            \"],[11,\"label\",[]],[13],[0,\"Product Model\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"required\"],[[28,[\"productModel\"]],true]]],false],[0,\"\\n            \\n            \"],[11,\"label\",[]],[13],[0,\"Product Category\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"category-input-wrapper\"],[13],[0,\"\\n            \\n\"],[6,[\"if\"],[[28,[\"selectedCategories\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"category-input\"],[5,[\"action\"],[[28,[null]],\"toggleDropdown\"]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"selectedCategories\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"category-tag\"],[13],[1,[28,[\"category\"]],false],[0,\" \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"removeCategory\",[28,[\"category\"]]]],[13],[0,\"×\"],[14],[14],[0,\"\\n\"]],\"locals\":[\"category\"]},null],[0,\"            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"categoryError\"]],\"error\"],null]]]],[15,\"style\",\"cursor: pointer; width: 100%\"],[15,\"type\",\"text\"],[15,\"readonly\",\"\"],[16,\"value\",[34,[[26,[\"category\"]]]]],[5,[\"action\"],[[28,[null]],\"toggleDropdown\"]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"categoryError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"categoryError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showDropdown\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"availableCategories\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"dropdown\"],[13],[0,\"\\n                    \"],[1,[28,[\"category\"]],false],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[\"category\"]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n            \\n\"],[6,[\"if\"],[[28,[\"showDropdown\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"availableCategories\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"dropdown-item\"],[5,[\"action\"],[[28,[null]],\"selectCategory\",[28,[\"category\"]]]],[13],[0,\"\\n                    \"],[1,[28,[\"category\"]],false],[0,\"\\n                    \"],[14],[0,\"\\n\"]],\"locals\":[\"category\"]},null],[0,\"                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n            \"],[14],[0,\"\\n\\n\\n            \\n            \"],[11,\"label\",[]],[13],[0,\"Product Stock\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"min\",\"0\"],[16,\"value\",[26,[\"stock\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateStock\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"storeStock\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \\n            \"],[11,\"label\",[]],[13],[0,\"Product Price\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"min\",\"0\"],[16,\"value\",[26,[\"price\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validatePrice\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"storePrice\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n           \\n            \"],[11,\"label\",[]],[13],[0,\"Product Image  \"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\" \"],[11,\"span\",[]],[13],[0,\"*\"],[14],[0,\" \"]],\"locals\":[]},null],[0,\" \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"input\"],null,[[\"value\",\"required\"],[[28,[\"image\"]],true]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[1,[33,[\"input\"],null,[[\"value\"],[[28,[\"image\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\" \\n           \"],[11,\"button\",[]],[16,\"onmousedown\",[33,[\"action\"],[[28,[null]],\"back\"],null],null],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-regular fa-circle-xmark\"],[13],[14],[0,\" Exit\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\" Update\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-plus\"],[13],[14],[0,\" Add\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/add-edit-product.hbs" } });
});
define("z-kart/templates/components/add-edit-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HPOl90wn", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\" \\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"pop-up\"],null,null,{\"statements\":[[0,\"\\n    \"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\" \"],[11,\"h1\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\" Edit Details\"],[14],[0,\"  \"]],\"locals\":[]},{\"statements\":[[0,\" \"],[11,\"h1\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-plus\"],[13],[14],[0,\" Add Customer\"],[14],[0,\" \"]],\"locals\":[]}],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"isAllowOtp\"]]],null,{\"statements\":[[0,\"  \\n         \"],[11,\"label\",[]],[13],[0,\"OTP\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[0,\" \\n         \"],[11,\"p\",[]],[15,\"style\",\"color: green;\"],[13],[0,\" Please Check Your Mail for OTP .\"],[14],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"number\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"error\"]],\"error\"],null]]]],[16,\"value\",[26,[\"otp\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateOtp\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"storeOtp\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"error\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\" \\n           \\n                    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-regular fa-circle-xmark\"],[13],[14],[0,\" Exit\"],[14],[0,\"\\n                    \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-plus\"],[13],[14],[0,\" Add\"],[14],[0,\"\\n                    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"backToEmail\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-backward\"],[13],[14],[0,\" Back\"],[14],[0,\"\\n\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"isAllowOtp\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"unless\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"            \"],[11,\"label\",[]],[13],[0,\"Email\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"class\",\"value\",\"change\",\"input\"],[\"email\",[33,[\"if\"],[[28,[\"emailError\"]],\"error\"],null],[28,[\"email\"]],[33,[\"action\"],[[28,[null]],\"checkEmailPattern\"],null],[33,[\"action\"],[[28,[null]],\"clearEmailError\"],null]]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"emailError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"emailError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n            \"],[11,\"label\",[]],[13],[0,\"Name\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"input\",\"change\"],[[28,[\"name\"]],[33,[\"if\"],[[28,[\"nameError\"]],\"error\"],null],[33,[\"action\"],[[28,[null]],\"clearNameError\"],null],[33,[\"action\"],[[28,[null]],\"checkName\"],null]]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"nameError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"nameError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \\n            \"],[11,\"label\",[]],[13],[0,\"Mobile\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"number\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"mobileError\"]],\"error\"],null]]]],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"clearMobileError\"],null],null],[16,\"value\",[26,[\"mobile\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateMobile\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"storeMobile\"],null],null],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"mobileError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"mobileError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n            \"],[11,\"label\",[]],[13],[0,\"Address\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"input\",\"change\"],[[28,[\"address\"]],[33,[\"if\"],[[28,[\"addressError\"]],\"error\"],null],[33,[\"action\"],[[28,[null]],\"clearAddressError\"],null],[33,[\"action\"],[[28,[null]],\"checkAddress\"],null]]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"addressError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"addressError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \\n\"],[6,[\"unless\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"            \"],[11,\"label\",[]],[13],[0,\"Password\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n    \\n            \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"passwordError\"]],\"error\"],null]]]],[16,\"type\",[33,[\"if\"],[[28,[\"showNewPassword\"]],\"text\",\"password\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkPassword\"],null],null],[16,\"value\",[26,[\"password\"]],null],[13],[14],[0,\"   \\n            \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"toggleNewPasswordVisibility\"]],[13],[0,\"\\n       \\n\"],[6,[\"if\"],[[28,[\"showNewPassword\"]]],null,{\"statements\":[[0,\"                     \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n            \"]],\"locals\":[]}],[0,\" \"],[14],[0,\"\\n\\n            \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"passwordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"passwordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n            \"],[11,\"label\",[]],[13],[0,\"Confirm Password\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n                \"],[11,\"input\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"confirmPasswordError\"]],\"error\"],null]]]],[16,\"type\",[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkConfirmPassword\"],null],null],[16,\"value\",[26,[\"passwordConfirm\"]],null],[13],[14],[0,\"\\n                 \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"togglePasswordVisibility\"]],[13],[0,\"\\n        \\n\"],[6,[\"if\"],[[28,[\"showPassword\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n                \"]],\"locals\":[]}],[14],[0,\"\\n\\n            \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"confirmPasswordError\"]]],null,{\"statements\":[[11,\"p\",[]],[13],[1,[26,[\"confirmPasswordError\"]],false],[14]],\"locals\":[]},null],[0,\"\\n\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isAdmin\"]]],null,{\"statements\":[[6,[\"unless\"],[[28,[\"isSelfAdmin\"]]],null,{\"statements\":[[0,\"\\n            \"],[11,\"label\",[]],[13],[0,\"User Type\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n\\n            \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"selectedOption\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\\n            \"],[11,\"option\",[]],[16,\"value\",[26,[\"customer\"]],null],[16,\"selected\",[33,[\"eq\"],[[28,[\"customer\"]],[28,[\"selectedOption\"]]],null],null],[13],[0,\"Customer\"],[14],[0,\"\\n    \\n            \"],[11,\"option\",[]],[16,\"value\",[26,[\"admin\"]],null],[16,\"selected\",[33,[\"eq\"],[[28,[\"admin\"]],[28,[\"selectedOption\"]]],null],null],[13],[0,\"Admin\"],[14],[0,\"\\n\\n            \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\" \\n           \\n                    \"],[11,\"button\",[]],[16,\"onmousedown\",[33,[\"action\"],[[28,[null]],\"back\"],null],null],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-regular fa-circle-xmark\"],[13],[14],[0,\" Exit\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"button\",[]],[16,\"type\",[34,[[33,[\"unless\"],[[28,[\"mobileError\"]],\"submit\",\"button\"],null]]]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\"  Update\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-forward\"],[13],[14],[0,\" Next\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n                \"],[14],[0,\"\\n                \\n\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\\n            \\n        \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/add-edit-user.hbs" } });
});
define("z-kart/templates/components/admin-nav-bar-lis", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YVmEORBZ", "block": "{\"statements\":[[0,\"\\n\\n    \"],[11,\"a\",[]],[15,\"title\",\" display Customers\"],[5,[\"action\"],[[28,[null]],\"callDisplayCustomers\"]],[13],[11,\"i\",[]],[16,\"style\",[34,[\"color: \",[26,[\"customerColor\"]],\";\"]]],[15,\"class\",\"fa-solid fa-user-group\"],[13],[14],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"title\",\" display Products\"],[5,[\"action\"],[[28,[null]],\"callDisplayProducts\"]],[13],[11,\"i\",[]],[16,\"style\",[34,[\"color: \",[26,[\"productColor\"]],\";\"]]],[15,\"class\",\"fa-brands fa-product-hunt displayProducts\"],[13],[14],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"title\",\" display Admins\"],[5,[\"action\"],[[28,[null]],\"callDisplayAdmins\"]],[13],[11,\"i\",[]],[16,\"style\",[34,[\"color: \",[26,[\"adminColor\"]],\";\"]]],[15,\"class\",\"fa-solid fa-chess\"],[13],[14],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"title\",\" display Orders\"],[5,[\"action\"],[[28,[null]],\"callDisplayOrders\"]],[13],[11,\"i\",[]],[16,\"style\",[34,[\"color: \",[26,[\"orderColor\"]],\";\"]]],[15,\"class\",\"fa-solid fa-circle-dollar-to-slot\"],[13],[14],[14],[0,\"\\n    \"],[6,[\"link-to\"],[\"index\"],[[\"title\"],[\" back to Home \"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-house\"],[13],[14]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"a\",[]],[15,\"title\",\" Add Product \"],[5,[\"action\"],[[28,[null]],\"addProduct\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-plus\"],[13],[14],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"allowAddCustomer\"]]],null,{\"statements\":[[0,\"    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"addCustomer\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-user-plus last\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/admin-nav-bar-lis.hbs" } });
});
define("z-kart/templates/components/admin-nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6htQgL4o", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isAddProduct\"]]],null,{\"statements\":[[1,[33,[\"add-edit-product\"],null,[[\"triggerBack\",\"triggerAddedProduct\",\"triggerAfterError\"],[[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"addedProduct\"],null],[28,[\"triggerAfterError\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"allowAddCustomer\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"isAddUser\"]]],null,{\"statements\":[[1,[33,[\"add-edit-user\"],null,[[\"triggerBack\",\"isAdmin\",\"isSelfAdmin\",\"isEdit\",\"selectedOption\",\"customer\",\"admin\",\"triggerAddedUser\",\"triggerAfterError\",\"customersData\",\"adminsData\"],[[33,[\"action\"],[[28,[null]],\"back\"],null],[28,[\"allowAddCustomer\"]],false,false,[28,[\"selectedOption\"]],[28,[\"customer\"]],[28,[\"admin\"]],[33,[\"action\"],[[28,[null]],\"addedUser\"],null],[28,[\"triggerAfterError\"]],[28,[\"customersData\"]],[28,[\"adminsData\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\" \\n\"],[11,\"div\",[]],[15,\"class\",\"nav-bar\"],[13],[0,\"\\n \"],[11,\"div\",[]],[15,\"class\",\"logo-threeLines\"],[13],[0,\"\\n\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"     \"],[1,[33,[\"zkart-logo\"],null,[[\"logoSize\",\"sloganSize\"],[50,0]]],false]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isMenuVisible\"]]],null,{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x threeLines\"],[5,[\"action\"],[[28,[null]],\"showList\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-list-ul threeLines\"],[5,[\"action\"],[[28,[null]],\"showList\"]],[13],[0,\" \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \\n \"],[14],[0,\" \\n \\n      \"],[11,\"div\",[]],[15,\"class\",\"admin-search-form\"],[13],[0,\"\\n        \\n         \"],[6,[\"if\"],[[28,[\"customer\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"title\",\" Search Customers\"],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchCustomers\"],null],null],[15,\"placeholder\",\" Search Customer\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"product\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"title\",\" Search Products\"],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchProducts\"],null],null],[15,\"placeholder\",\" Search Products\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"admin\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"title\",\" Search Admins\"],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchAdmins\"],null],null],[15,\"placeholder\",\" Search Admins\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"order\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"title\",\" Search Orders\"],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchOrders\"],null],null],[15,\"placeholder\",\" Search Orders\"],[13],[14],[0,\" \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n    \"],[14],[0,\"\\n\\n   \"],[11,\"div\",[]],[15,\"class\",\"nav-link-container\"],[13],[0,\"\\n\\n  \"],[1,[33,[\"admin-nav-bar-lis\"],null,[[\"productColor\",\"allowAddCustomer\",\"triggerCallDisplayCustomers\",\"triggerCallDisplayProducts\",\"triggerCallDisplayAdmins\",\"triggerCallDisplayOrders\",\"triggerAddedProduct\",\"triggerAfterError\",\"triggerAddedUser\",\"triggerAddUser\",\"triggerAddProduct\"],[\"blueviolet\",[28,[\"allowAddCustomer\"]],[33,[\"action\"],[[28,[null]],\"callDisplayCustomers\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayProducts\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayAdmins\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayOrders\"],null],[28,[\"triggerAddedProduct\"]],[28,[\"triggerAfterError\"]],[28,[\"triggerAddedUser\"]],[33,[\"action\"],[[28,[null]],\"addCustomer\"],null],[33,[\"action\"],[[28,[null]],\"addProduct\"],null]]]],false],[0,\" \\n\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isMenuVisible\"]]],null,{\"statements\":[[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"min-screen\"],[13],[0,\"\\n\\n \"],[11,\"div\",[]],[15,\"class\",\"min-nav-link-container\"],[13],[0,\"\\n\\n  \"],[1,[33,[\"admin-nav-bar-lis\"],null,[[\"allowAddCustomer\",\"triggerCallDisplayCustomers\",\"triggerCallDisplayProducts\",\"triggerCallDisplayAdmins\",\"triggerCallDisplayOrders\",\"triggerAddedProduct\",\"triggerAfterError\",\"triggerAddUser\",\"triggerAddProduct\"],[[28,[\"allowAddCustomer\"]],[33,[\"action\"],[[28,[null]],\"callDisplayCustomers\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayProducts\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayAdmins\"],null],[33,[\"action\"],[[28,[null]],\"callDisplayOrders\"],null],[28,[\"triggerAddedProduct\"]],[28,[\"triggerAfterError\"]],[33,[\"action\"],[[28,[null]],\"addCustomer\"],null],[33,[\"action\"],[[28,[null]],\"addProduct\"],null]]]],false],[0,\" \\n  \\n  \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"min-admin-screen-search\"],[13],[0,\"\\n         \\n         \"],[6,[\"if\"],[[28,[\"customer\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchCustomers\"],null],null],[15,\"placeholder\",\" Search Customer\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"product\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchProducts\"],null],null],[15,\"placeholder\",\" Search Products\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"admin\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchAdmins\"],null],null],[15,\"placeholder\",\" Search Admins\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"order\"]]],null,{\"statements\":[[0,\" \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchOrders\"],null],null],[15,\"placeholder\",\" Search Orderss\"],[13],[14],[0,\" \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"         \\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/admin-nav-bar.hbs" } });
});
define("z-kart/templates/components/alert-pop", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+0pR3WH5", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"alert-popup\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"alert-content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"confirm\"]]],null,{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"style\",\"color: green;font-size:60px\"],[15,\"class\",\"fa-sharp fa-solid fa-circle-check\"],[13],[14],[0,\"\\n    \"],[11,\"h2\",[]],[13],[1,[26,[\"title\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"close-button\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x\"],[13],[14],[14],[0,\"\\n     \"],[11,\"h2\",[]],[13],[1,[26,[\"title\"]],false],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[1,[26,[\"message\"]],false],[0,\" \"],[1,[26,[\"id\"]],false],[0,\" ?\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"confirm-button\"],[5,[\"action\"],[[28,[null]],\"confirm\",[28,[\"id\"]]]],[13],[0,\"Confirm\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/alert-pop.hbs" } });
});
define("z-kart/templates/components/authentication-layout", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SU2dY7sn", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"formBase\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"formBase-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"formBase-content-logo\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"content-logo\"],[13],[0,\"\\n                    \"],[1,[33,[\"zkart-logo\"],null,[[\"logoSize\",\"sloganSize\"],[50,15]]],false],[0,\"\\n                \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"formBase-content-form\"],[13],[0,\"\\n            \"],[18,\"default\"],[0,\"\\n        \"],[14],[0,\"\\n        \\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/authentication-layout.hbs" } });
});
define("z-kart/templates/components/cart-product", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lwyJYqAq", "block": "{\"statements\":[[0,\" \"],[11,\"div\",[]],[15,\"class\",\"cart-item\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"products.product\",[28,[\"cartProduct\",\"product\",\"product_id\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"product-image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"cartProduct\",\"product\",\"image\"]],\"');\"]]],[13],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"product-details\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"details-header\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[15,\"class\",\"product-name\"],[13],[1,[28,[\"cartProduct\",\"product\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"btn-remove\"],[5,[\"action\"],[[28,[null]],\"deleteProduct\",[28,[\"cartProduct\",\"cp_id\"]]]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x\"],[13],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"stock-info\"],[13],[0,\"Product Id: \"],[1,[28,[\"cartProduct\",\"product\",\"product_id\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"style\",\"color: green;\"],[15,\"class\",\"stock-info\"],[13],[0,\"Stock: \"],[1,[28,[\"cartProduct\",\"product\",\"stock\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"product-price\"],[13],[0,\"Price: Rs\"],[1,[28,[\"cartProduct\",\"product\",\"price\"]],false],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"quantity-section\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"quantity\"],[13],[0,\"Quantity:\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"style\",\"color: red;\"],[15,\"id\",\"quantity\"],[15,\"type\",\"number\"],[15,\"min\",\"1\"],[15,\"name\",\"count\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"updateCount\",[28,[\"cartProduct\",\"cp_id\"]]],null],null],[16,\"value\",[28,[\"cartProduct\",\"count\"]],null],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"p\",[]],[15,\"class\",\"total-price\"],[13],[0,\"Total Price: Rs \"],[1,[33,[\"mul\"],[[28,[\"cartProduct\",\"product\",\"price\"]],[28,[\"cartProduct\",\"count\"]]],null],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"cartProduct\",\"product\",\"stock\"]],[28,[\"cartProduct\",\"count\"]]],null]],null,{\"statements\":[[0,\"\\n    \"],[11,\"p\",[]],[15,\"style\",\"color: green;\"],[13],[0,\" Maximum Quantity Reached . \"],[14],[0,\"\\n\\n\\n    \"],[11,\"p\",[]],[15,\"style\",\"color: red;\"],[13],[0,\" The Product Availability is \"],[1,[28,[\"cartProduct\",\"product\",\"stock\"]],false],[0,\" Only ! . \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n       \"],[14],[0,\"\\n \\n  \"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/cart-product.hbs" } });
});
define("z-kart/templates/components/change-password", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "D7DDYEex", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \\n\"],[6,[\"pop-up\"],null,null,{\"statements\":[[0,\" \"],[11,\"h1\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-key\"],[13],[14],[0,\" Change Password\"],[14],[0,\" \\n \"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[15,\"style\",\"text-align: center;\"],[13],[1,[26,[\"error\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n\\n            \"],[11,\"label\",[]],[13],[0,\"Old Password\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n        \\n            \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n            \"],[11,\"input\",[]],[16,\"class\",[33,[\"if\"],[[28,[\"oldPasswordError\"]],\"error\"],null],null],[16,\"type\",[33,[\"if\"],[[28,[\"showOldPassword\"]],\"text\",\"password\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkOldPassword\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"toggleOldPasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showOldPassword\"]]],null,{\"statements\":[[0,\"            \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n            \"]],\"locals\":[]}],[14],[0,\"\\n\\n        \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n         \"],[6,[\"if\"],[[28,[\"oldPasswordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"oldPasswordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n            \\n  \"],[11,\"label\",[]],[13],[0,\"New Password\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n    \\n    \"],[11,\"input\",[]],[16,\"type\",[33,[\"if\"],[[28,[\"showNewPassword\"]],\"text\",\"password\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkPassword\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"  \\n      \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"toggleNewPasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showNewPassword\"]]],null,{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]}],[14],[0,\"\\n\\n    \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"passwordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"passwordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n           \\n\"],[11,\"label\",[]],[13],[0,\"Confirm Password\"],[11,\"span\",[]],[13],[0,\"*\"],[14],[14],[0,\"\\n\\n\\n \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n    \\n    \"],[11,\"input\",[]],[16,\"type\",[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkConfirmPassword\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"togglePasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPassword\"]]],null,{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]}],[14],[0,\"\\n\\n    \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"confirmPasswordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"confirmPasswordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n    \\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isBackAllowed\"]]],null,{\"statements\":[[0,\"           \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-regular fa-circle-xmark\"],[13],[14],[0,\" Exit\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-pen\"],[13],[14],[0,\" Change\"],[14],[0,\"\\n\\n        \"],[14],[0,\"\\n        \\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/change-password.hbs" } });
});
define("z-kart/templates/components/customers-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sgGHGFiX", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"alertPopup\"]]],null,{\"statements\":[[1,[33,[\"alert-pop\"],null,[[\"title\",\"message\",\"id\",\"triggerBack\",\"triggerConfrim\"],[\"Delete Alert\",\" Do you Want To delete Customer \",[28,[\"deleteCustomerId\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"deleteCustomerConfirm\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEdit\"]]],null,{\"statements\":[[1,[33,[\"add-edit-user\"],null,[[\"emailVaild\",\"triggerAfterError\",\"triggerBack\",\"isEdit\",\"triggerUpdatedUser\",\"isAdmin\",\"isSelfAdmin\",\"triggerEditedUser\",\"name\",\"mobile\",\"address\",\"customerId\",\"selectedOption\",\"customer\",\"admin\"],[true,[28,[\"triggerAfterError\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[28,[\"isEdit\"]],[28,[\"triggerUpdatedUser\"]],[28,[\"isAdmin\"]],[28,[\"isSelfAdmin\"]],[33,[\"action\"],[[28,[null]],\"editedUser\"],null],[28,[\"name\"]],[28,[\"mobile\"]],[28,[\"address\"]],[28,[\"customerId\"]],[28,[\"selectedOption\"]],[28,[\"customer\"]],[28,[\"admin\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"table\",[]],[15,\"border\",\"1\"],[15,\"cellpadding\",\"10\"],[15,\"cellspacing\",\"0\"],[15,\"width\",\"100%\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"ID\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Name\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Email\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Mobile\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Address\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"allowSuperAdmin\"]]],null,{\"statements\":[[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Edit\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Delete\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\" \\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"customers\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"customer\",\"customer_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"customer\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"customer\",\"email\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"customer\",\"mobile\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"customer\",\"address\"]],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"allowSuperAdmin\"]]],null,{\"statements\":[[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"a\",[]],[15,\"style\",\"cursor: pointer; color:blue;\"],[5,[\"action\"],[[28,[null]],\"editUser\",[28,[\"customer\"]]]],[13],[0,\"Edit\"],[14],[14],[0,\"\\n\\n        \"],[11,\"td\",[]],[15,\"style\",\"cursor: pointer; color:red;\"],[5,[\"action\"],[[28,[null]],\"deleteCustomer\",[28,[\"customer\",\"customer_id\"]]]],[13],[0,\"Delete\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"customer\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/customers-table.hbs" } });
});
define("z-kart/templates/components/filter-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "93cDQfaw", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"background-body\"],[13],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"filter-base\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-arrow-down-wide-short\"],[13],[14],[0,\" Filter The Products\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n         \"],[11,\"div\",[]],[15,\"class\",\"filter-options\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n              \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isCategories\"]],\"selected\"],null],\" \",[33,[\"if\"],[[28,[\"iscategory\"]],\"highlight\"],null]]]],[5,[\"action\"],[[28,[null]],\"displayCategories\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-right\"],[13],[14],[0,\" Categories\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isCategories\"]]],null,{\"statements\":[[0,\"              \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isBrands\"]],\"selected\"],null],\" \",[33,[\"if\"],[[28,[\"isbrand\"]],\"highlight\"],null]]]],[5,[\"action\"],[[28,[null]],\"displayBrands\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-right\"],[13],[14],[0,\"  Brands\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isBrands\"]]],null,{\"statements\":[[0,\"              \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isModels\"]],\"selected\"],null],\" \",[33,[\"if\"],[[28,[\"ismodel\"]],\"highlight\"],null]]]],[5,[\"action\"],[[28,[null]],\"displayModels\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-right\"],[13],[14],[0,\" Models\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"              \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isPrices\"]],\"selected\"],null],\" \",[33,[\"if\"],[[28,[\"isprice\"]],\"highlight\"],null]]]],[5,[\"action\"],[[28,[null]],\"displayPrice\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-right\"],[13],[14],[0,\" Price\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"              \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"load\"]]],null,{\"statements\":[[0,\"                \"],[11,\"p\",[]],[13],[0,\" \"],[11,\"i\",[]],[15,\"style\",\"font-size: 20px;\"],[15,\"class\",\"fa-solid fa-spinner spin \"],[13],[14],[0,\" Keep Adding Filters ...\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[6,[\"if\"],[[28,[\"filterCount\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[0,\"Filtered Products \"],[11,\"span\",[]],[13],[1,[26,[\"filterCount\"]],false],[14],[0,\" \"],[14]],\"locals\":[]},{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[0,\" Filter Not Yet Applyed \"],[14],[0,\"  \"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"display-content\"],[13],[0,\"\\n    \\n\"],[6,[\"if\"],[[28,[\"iscategory\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"categorydata\"]]],null,{\"statements\":[[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"data\"],[13],[0,\"\\n\\n        \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[16,\"value\",[34,[[28,[\"category\"]]]]],[16,\"checked\",[33,[\"contains\"],[[28,[null,\"categories\"]],[28,[\"category\"]]],null],null],[5,[\"action\"],[[28,[null]],\"addCategoryItem\"],[[\"on\"],[\"change\"]]],[13],[14],[0,\" \"],[11,\"p\",[]],[13],[1,[28,[\"category\"]],false],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"]],\"locals\":[\"category\"]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isbrand\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"branddata\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"data\"],[13],[0,\"\\n          \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[16,\"value\",[34,[[28,[\"brand\"]]]]],[16,\"checked\",[33,[\"contains\"],[[28,[null,\"brands\"]],[28,[\"brand\"]]],null],null],[5,[\"action\"],[[28,[null]],\"addBrandItem\"],[[\"on\"],[\"change\"]]],[13],[14],[0,\" \"],[11,\"p\",[]],[13],[1,[28,[\"brand\"]],false],[14],[0,\"\\n  \"],[14],[0,\"     \"]],\"locals\":[\"brand\"]},null],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"ismodel\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"modeldata\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"data\"],[13],[0,\"\\n\\n          \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[16,\"value\",[34,[[28,[\"model\"]]]]],[16,\"checked\",[33,[\"contains\"],[[28,[null,\"models\"]],[28,[\"model\"]]],null],null],[5,[\"action\"],[[28,[null]],\"addModelItem\"],[[\"on\"],[\"change\"]]],[13],[14],[0,\" \"],[11,\"p\",[]],[13],[1,[28,[\"model\"]],false],[14],[0,\"\\n  \"],[14],[0,\"     \\n  \\n\"]],\"locals\":[\"model\"]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"isprice\"]]],null,{\"statements\":[[0,\"\\n   \"],[11,\"div\",[]],[15,\"class\",\"price\"],[13],[0,\"\\n\\n    \"],[11,\"input\",[]],[15,\"placeholder\",\"Minimum Price\"],[16,\"value\",[26,[\"lowPrice\"]],null],[16,\"onkeydown\",[33,[\"action\"],[[28,[null]],\"validatePrice\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"updateLowPrice\"],null],null],[13],[14],[0,\"\\n    \"],[11,\"input\",[]],[15,\"placeholder\",\"Maximum Price\"],[16,\"value\",[26,[\"highPrice\"]],null],[16,\"onkeydown\",[33,[\"action\"],[[28,[null]],\"validatePrice\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"updateHighPrice\"],null],null],[13],[14],[0,\"\\n\\n   \"],[14],[0,\"\\n\\n    \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\\n\\n\\n      \"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"base-buttons\"],[13],[0,\" \\n\"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-backward\"],[13],[14],[0,\" Back\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"submitFilter\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"load\"]]],null,{\"statements\":[[0,\" \"],[11,\"button\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-spinner spin\"],[13],[14],[0,\" Loading\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\" \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"applyFilter\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-filter\"],[13],[14],[0,\" Apply\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"clear\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-regular fa-trash-can\"],[13],[14],[0,\" Clear\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/filter-bar.hbs" } });
});
define("z-kart/templates/components/homepage-tour", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u9jok9qv", "block": "{\"statements\":[[0,\"  \"],[11,\"div\",[]],[16,\"class\",[34,[\"navbar \",[28,[\"getContent\",\"highlight\"]]]]],[13],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"background \",[28,[\"getContent\",\"background\"]]]]],[13],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"textcontent\"],[13],[0,\"\\n      \"],[1,[26,[\"screenWidth\"]],false],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"      \"],[1,[28,[\"getContent\",\"content\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"back-buttons\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"allowNext\"]]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"skip\"]],[13],[0,\"Skip\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[0,\"Next\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"skip\"]],[13],[0,\"Stop\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n  \"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/homepage-tour.hbs" } });
});
define("z-kart/templates/components/loading-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+vqtPbmI", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"loading-overlay\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"loading-spinner\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"spinner\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/loading-component.hbs" } });
});
define("z-kart/templates/components/navigation-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U43a3k4Q", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"nav-bar\"],[13],[0,\"\\n \"],[11,\"div\",[]],[15,\"class\",\"logo-threeLines\"],[13],[0,\"\\n\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"     \"],[1,[33,[\"zkart-logo\"],null,[[\"logoSize\",\"sloganSize\"],[50,0]]],false]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isMenuVisible\"]]],null,{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x threeLines\"],[5,[\"action\"],[[28,[null]],\"showList\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-list-ul threeLines\"],[5,[\"action\"],[[28,[null]],\"showList\"]],[13],[0,\" \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n \"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"search-panel\"],[13],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"],[14],[0,\"\\n\"],[1,[33,[\"navigation-list\"],null,[[\"className\"],[\"unorder-list\"]]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isMenuVisible\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"min-screen\"],[13],[0,\"\\n\\n\"],[1,[33,[\"navigation-list\"],null,[[\"className\"],[\"min-unorder-list\"]]],false],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n \"],[11,\"div\",[]],[15,\"class\",\"min-search\"],[13],[0,\"\\n    \"],[18,\"default\"],[0,\"\\n  \"],[14],[0,\"\\n  \\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/navigation-bar.hbs" } });
});
define("z-kart/templates/components/navigation-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u7wzgWe7", "block": "{\"statements\":[[0,\"    \"],[11,\"ul\",[]],[16,\"class\",[34,[[26,[\"className\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isAdmin\"]]],null,{\"statements\":[[0,\"\\n        \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"admin\"],[[\"title\"],[\"Click to navigate to the Admin Page\"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chess-king\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"index\"],[[\"title\"],[\"Click to navigate to the Home Page\"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-house\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"products\"],[[\"title\"],[\"Click to navigate to the Products dashboard \"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-brands fa-product-hunt\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"about\"],[[\"title\"],[\"Click to navigate to the About Page\"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-circle-info\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n      \\n\"],[6,[\"if\"],[[28,[\"isCustomer\"]]],null,{\"statements\":[[0,\"       \\n\"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"Cart\"],[[\"title\"],[\"Click to navigate to the Cart page\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"cart-icon-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"cartCount\"]]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"cartCount\"],[13],[1,[26,[\"cartCount\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-cart-shopping\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\\n      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"account\"],[[\"title\"],[\"Click to navigate to the User Account Page \"]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-user\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n      \\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"signin\"],[[\"title\"],[\"Click to navigate to the Sign In Page\"]],{\"statements\":[[0,\" \"],[11,\"i\",[]],[15,\"class\",\"fa-sharp fa-solid fa-arrow-right-to-bracket\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/navigation-list.hbs" } });
});
define("z-kart/templates/components/order-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cDnXibg4", "block": "{\"statements\":[[0,\"\\n\\n \"],[11,\"div\",[]],[15,\"class\",\"order-details\"],[13],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"order_id\"],[13],[0,\"\\n\\n\"],[11,\"i\",[]],[15,\"class\",\"fa-sharp fa-regular fa-circle-check\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"id\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[1,[28,[\"order\",\"order_id\"]],false],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[1,[33,[\"format-time\"],[[28,[\"order\",\"time\"]]],null],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n\\n \"],[11,\"address\",[]],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[0,\"Address\"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[28,[\"order\",\"name\"]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        +91 \"],[1,[28,[\"order\",\"mobile\"]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[28,[\"order\",\"address\"]],false],[0,\"\\n      \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"coupon\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[0,\"Discount Details\"],[14],[0,\"\\n\\n      \"],[11,\"p\",[]],[13],[1,[33,[\"order-coupon\"],[[28,[\"order\",\"coupon\"]]],null],false],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"bill\"],[13],[0,\"\\n  \\n  \"],[6,[\"link-to\"],[\"account.products\",[28,[\"order\",\"order_id\"]]],null,{\"statements\":[[0,\"View Products\"]],\"locals\":[]},null],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"prices\"],[13],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"price-price\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Discount Price\"],[14],[0,\"\\n\"],[11,\"h2\",[]],[13],[1,[28,[\"order\",\"discountprice\"]],false],[0,\" \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"total-price\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Total Price\"],[14],[0,\"\\n\"],[11,\"h2\",[]],[13],[1,[33,[\"sum\"],[[28,[\"order\",\"total_price\"]],[28,[\"order\",\"discountprice\"]]],null],false],[0,\" \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"final-price\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Final Price\"],[14],[0,\"\\n\"],[11,\"h2\",[]],[13],[1,[28,[\"order\",\"total_price\"]],false],[0,\" \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n \"],[14],[0,\"\\n \\n \\n \\n \\n \\n \\n \\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/order-component.hbs" } });
});
define("z-kart/templates/components/order-details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Zu4scNld", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"stopUpi\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-order\"],[15,\"style\",\"zindex:120;  background-color:rgb(251, 224, 177)\"],[13],[0,\"\\n\"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-hand-point-right\"],[13],[14],[0,\" \\n \"],[11,\"p\",[]],[15,\"class\",\"tick\"],[13],[0,\"...Please Open Your Upi App To Make Payment... \"],[14],[0,\"\\n \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-hand-point-left\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"popup-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"popup-container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"popup-header\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Order Details\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[15,\"class\",\"close-btn\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x\"],[13],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"form\",[]],[15,\"class\",\"address-form\"],[5,[\"action\"],[[28,[null]],\"buy\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[15,\"style\",\"font-weight:500;\"],[13],[0,\"Name\"],[14],[0,\"  \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"required\"],[[28,[\"name\"]],\" Enter Name\",true]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[15,\"style\",\"font-weight:500;\"],[13],[0,\"Mobile\"],[14],[0,\" \"],[1,[33,[\"input\"],null,[[\"type\",\"min\",\"max\",\"value\",\"placeholder\",\"required\"],[\"number\",999999999,9999999999,[28,[\"mobile\"]],\" Enter Mobile\",true]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"field\"],[13],[0,\"\\n     \"],[11,\"p\",[]],[15,\"style\",\"font-weight:500;\"],[13],[0,\"Address\"],[14],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"required\"],[[28,[\"address\"]],\" Enter Address\",true]]],false],[0,\"\\n    \"],[14],[0,\"\\n   \\n  \"],[11,\"div\",[]],[15,\"class\",\"payment-methods\"],[13],[0,\"\\n    \"],[11,\"h3\",[]],[13],[0,\"Select Payment Method\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"payment-option\"],[16,\"style\",[33,[\"if\"],[[28,[\"cash\"]],\"background-color:#e6e6e6;\"],null],null],[5,[\"action\"],[[28,[null]],\"cash\"]],[13],[0,\"\\n      \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-truck\"],[13],[14],[0,\"Cash on Delivery\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"payment-option\"],[16,\"style\",[33,[\"if\"],[[28,[\"upi\"]],\"background-color:#e6e6e6;\"],null],null],[5,[\"action\"],[[28,[null]],\"upi\"]],[13],[0,\"\\n      \"],[11,\"i\",[]],[15,\"class\",\"fa fa-qrcode\"],[13],[14],[0,\" UPI Payment\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"payment-option\"],[16,\"style\",[33,[\"if\"],[[28,[\"card\"]],\"background-color:#e6e6e6;\"],null],null],[5,[\"action\"],[[28,[null]],\"card\"]],[13],[0,\"\\n      \"],[11,\"i\",[]],[15,\"class\",\"fa fa-credit-card\"],[13],[14],[0,\" Card Payment\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"cash\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"upi-form\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"submit-btn\"],[13],[0,\"Submit\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"upi\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"upi-form\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[1,[26,[\"errorUpi\"]],false],[14],[0,\"\\n      \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Enter UPI ID\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"validateUpi\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isValidUpi\"]]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"submit-btn\"],[13],[0,\"Submit\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"card\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-form\"],[13],[0,\"\\n      \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Card Number\"],[16,\"value\",[26,[\"cardNumber\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateCardNumber\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n      \"],[11,\"input\",[]],[15,\"placeholder\",\"CVV Code\"],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateCardCvv\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n      \"],[11,\"input\",[]],[15,\"placeholder\",\"Expiry Date\"],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateExpiryDate\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"validateDate\"],null],null],[13],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isAllowCard\"]]],null,{\"statements\":[[0,\"      \"],[11,\"input\",[]],[15,\"minlength\",\"4\"],[15,\"placeholder\",\"Enter OTP\"],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateOtp\"],null],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"submit-btn\"],[13],[0,\"Pay Now\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/order-details.hbs" } });
});
define("z-kart/templates/components/orderproducts-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oiOcgzf4", "block": "{\"statements\":[[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"border\",\"1\"],[15,\"cellpadding\",\"10\"],[15,\"cellspacing\",\"0\"],[15,\"width\",\"100%\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Image\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"product id\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"OrderProduct Id\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Name\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Brand\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Category\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Model\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Stock\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Product Price\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Quantity\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Total Price\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"orderProducts\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"small-image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"product\",\"product\",\"image\"]],\"');\"]]],[13],[14],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"product_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"purchased_product_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"brand\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"category\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"model\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"stock\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product\",\"price\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"count\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[33,[\"mul\"],[[28,[\"product\",\"count\"]],[28,[\"product\",\"product\",\"price\"]]],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"product\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/orderproducts-table.hbs" } });
});
define("z-kart/templates/components/orders-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "A2OF24K/", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"order-table-container\"],[13],[0,\"\\n\"],[11,\"table\",[]],[15,\"class\",\"order-details-table\"],[15,\"border\",\"1\"],[15,\"cellpadding\",\"10\"],[15,\"cellspacing\",\"0\"],[15,\"width\",\"100%\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Order Id\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Cart Id\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Time\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Name\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Mobile\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Address\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Discount Offered\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Order Price\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Order Products\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Discount Details\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"orders\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"order_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"cart_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"time\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"mobile\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"address\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"discountprice\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"order\",\"total_price\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"style\",\"color:blue; cursor:pointer\"],[5,[\"action\"],[[28,[null]],\"displayOrderProducts\",[28,[\"order\",\"cart_id\"]],[28,[\"order\",\"order_id\"]]]],[13],[0,\" Order Products\"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"style\",\"width: 100%;\"],[13],[11,\"p\",[]],[15,\"class\",\"discount-details\"],[13],[1,[28,[\"order\",\"coupon\"]],false],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"order\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/orders-table.hbs" } });
});
define("z-kart/templates/components/pop-up", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4VqhZBuZ", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"account-password-change\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"edit-form\"],[13],[0,\"\\n   \"],[18,\"default\"],[0,\"\\n\"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/pop-up.hbs" } });
});
define("z-kart/templates/components/poster-banner", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gBIkYSb0", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"full-width-banner-out with-gray-background\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"banner-slider\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"banners\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"products.search\",[28,[\"banner\",\"linkto\"]]],null,{\"statements\":[[0,\"     \\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"banner-slide \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"index\"]],[28,[\"currentSlide\"]]],null],\"active\",\"inactive\"],null]]]],[13],[0,\"\\n        \"],[11,\"img\",[]],[16,\"class\",[34,[\"img-fluid \",[28,[\"banner\",\"class\"]]]]],[16,\"src\",[28,[\"banner\",\"src\"]],null],[16,\"alt\",[28,[\"banner\",\"alt\"]],null],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[\"banner\",\"index\"]},null],[0,\"  \"],[14],[0,\"\\n\\n  \"],[11,\"button\",[]],[15,\"class\",\"prev-btn\"],[5,[\"action\"],[[28,[null]],\"prevSlide\"]],[13],[0,\"❮\"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"next-btn\"],[5,[\"action\"],[[28,[null]],\"nextSlide\"]],[13],[0,\"❯\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/poster-banner.hbs" } });
});
define("z-kart/templates/components/product-layout", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ijQqWTR4", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"category\"]]],null,{\"statements\":[[6,[\"link-to\"],[\"products.search\",[28,[\"category\",\"value\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"category\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"category\",\"image\"]],\"');\"]]],[13],[0,\" \"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[1,[28,[\"category\",\"name\"]],false],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\"],[6,[\"link-to\"],[\"products.product\",[28,[\"product\",\"product_id\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"product\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isDeal\"]]],null,{\"statements\":[[11,\"p\",[]],[15,\"class\",\"deal\"],[15,\"data-deal\",\"👉🏻 Deal of The Moment 10% Discount 👈🏻\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"image product-image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"product\",\"image\"]],\"');\"]]],[13],[0,\" \"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[1,[28,[\"product\",\"name\"]],false],[14],[0,\"\\n            \"],[11,\"p\",[]],[15,\"style\",\"color:black\"],[13],[1,[28,[\"product\",\"brand\"]],false],[14],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"Price : \"],[1,[28,[\"product\",\"price\"]],false],[0,\" Rs\"],[14],[0,\"\\n            \"],[18,\"default\"],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/product-layout.hbs" } });
});
define("z-kart/templates/components/products-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qvCVGelE", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"alertPopup\"]]],null,{\"statements\":[[1,[33,[\"alert-pop\"],null,[[\"title\",\"message\",\"id\",\"triggerBack\",\"triggerConfrim\"],[\"Delete Alert\",\" Do you Want To delete Product \",[28,[\"deleteProductId\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"deleteProductConfirm\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEditProduct\"]]],null,{\"statements\":[[1,[33,[\"add-edit-product\"],null,[[\"triggerAfterError\",\"triggerBack\",\"triggerUpdate\",\"name\",\"productModel\",\"brand\",\"category\",\"image\",\"stock\",\"price\",\"productId\",\"isEdit\"],[[28,[\"triggerAfterError\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"updateProduct\"],null],[28,[\"name\"]],[28,[\"model\"]],[28,[\"brand\"]],[28,[\"category\"]],[28,[\"image\"]],[28,[\"stock\"]],[28,[\"price\"]],[28,[\"productId\"]],[28,[\"isEditProduct\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"table\",[]],[15,\"border\",\"1\"],[15,\"cellpadding\",\"10\"],[15,\"cellspacing\",\"0\"],[15,\"width\",\"100%\"],[13],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Image\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"product id\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Name\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Brand\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Category\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Model\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Quantity\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Price\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Edit\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Delete\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"products\"]]],null,{\"statements\":[[0,\"      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[11,\"div\",[]],[15,\"class\",\"small-image\"],[16,\"style\",[34,[\"background-image: url('\",[28,[\"product\",\"image\"]],\"');\"]]],[13],[14],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"product_id\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"name\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"brand\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"category\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"model\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"stock\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[13],[1,[28,[\"product\",\"price\"]],false],[14],[0,\"\\n        \"],[11,\"td\",[]],[5,[\"action\"],[[28,[null]],\"editProduct\",[28,[\"product\"]]]],[13],[11,\"a\",[]],[15,\"style\",\"cursor: pointer; color:blue;\"],[13],[0,\"Edit\"],[14],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"style\",\"cursor: pointer; color:red;\"],[13],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"deleteProduct\",[28,[\"product\",\"product_id\"]]]],[13],[0,\"Delete\"],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"product\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/products-table.hbs" } });
});
define("z-kart/templates/components/search-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tI0L+K+L", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"search-form\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"input-container\"],[13],[0,\"\\n    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-magnifying-glass\"],[13],[14],[0,\"\\n    \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"searchProducts\"],null],null],[15,\"placeholder\",\"Search Products\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/search-bar.hbs" } });
});
define("z-kart/templates/components/success-order", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ch2mhCkb", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-order\"],[16,\"style\",[33,[\"if\"],[[28,[\"error\"]],\"background-color: red;\"],null],null],[13],[0,\"\\n  \"],[11,\"p\",[]],[15,\"class\",\"tick\"],[13],[0,\" \\n\"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-x\"],[13],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa-sharp fa-solid fa-check\"],[13],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/success-order.hbs" } });
});
define("z-kart/templates/components/zkart-logo", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GPLOuE09", "block": "{\"statements\":[[11,\"div\",[]],[15,\"title\",\" Home Page \"],[15,\"class\",\"logo\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[15,\"id\",\"zkart\"],[16,\"style\",[34,[\"font-size:\",[28,[null,\"logoSize\"]],\"px \"]]],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"id\",\"z\"],[13],[0,\"Z\"],[14],[0,\"\\n    Kart\\n\"],[14],[0,\"\\n\"],[11,\"p\",[]],[15,\"id\",\"z-kart-slogan\"],[16,\"style\",[34,[\"font-size:\",[28,[null,\"sloganSize\"]],\"px \"]]],[13],[0,\"experience the future of electronics\"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/components/zkart-logo.hbs" } });
});
define("z-kart/templates/error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QJUkmsDk", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-page\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"error-title\"],[13],[0,\"Oops! Something went wrong.\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[15,\"class\",\"error-message\"],[13],[0,\"We couldn't find the page you're looking for.\"],[14],[0,\"\\n \"],[11,\"button\",[]],[15,\"class\",\"back-button\"],[5,[\"action\"],[[28,[null]],\"goToIndex\"]],[13],[0,\"Go Home\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/error.hbs" } });
});
define("z-kart/templates/errorpage", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jf7Yd+IR", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-page\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"error-title\"],[13],[1,[28,[\"model\",\"code\"]],false],[14],[0,\"\\n  \"],[11,\"p\",[]],[15,\"class\",\"error-message\"],[13],[0,\"Please Try again after some time \"],[14],[0,\"\\n \"],[11,\"button\",[]],[15,\"class\",\"back-button\"],[5,[\"action\"],[[28,[null]],\"goToIndex\"]],[13],[0,\"Go Home\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/errorpage.hbs" } });
});
define("z-kart/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZxGpB+mN", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"allowTour\"]]],null,{\"statements\":[[1,[33,[\"homepage-tour\"],null,[[\"triggerSkipTour\"],[[33,[\"action\"],[[28,[null]],\"skipTour\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[1,[26,[\"poster-banner\"]],false],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"offer\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"  Categories \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"categories\"]]],null,{\"statements\":[[0,\"\\n   \"],[1,[33,[\"product-layout\"],null,[[\"category\",\"category\"],[true,[28,[\"category\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[\"category\"]},null],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/index.hbs" } });
});
define("z-kart/templates/products/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CuipD+49", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isFilter\"]]],null,{\"statements\":[[0,\"\\n\"],[1,[33,[\"filter-bar\"],null,[[\"triggerAfterError\",\"isGlobal\",\"triggerBack\",\"triggerFilter\",\"triggerClear\"],[[33,[\"action\"],[[28,[null]],\"afterError\"],null],[28,[\"isGlobal\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"filter\"],null],[33,[\"action\"],[[28,[null]],\"clear\"],null]]]],false],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\" \\n\"],[11,\"div\",[]],[15,\"class\",\"filter-button\"],[13],[0,\"\\n  \"],[11,\"button\",[]],[15,\"style\",\"background-color:navy\"],[15,\"title\",\" Global Filter \"],[5,[\"action\"],[[28,[null]],\"displayFilter\"]],[13],[11,\"i\",[]],[16,\"style\",[33,[\"if\"],[[28,[\"isFilteredProducts\"]],\"color:lightgreen;\"],null],null],[15,\"class\",\"fa-solid fa-filter\"],[13],[14],[0,\" Filter\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isRecentlyAdded\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"offer\"],[13],[0,\"\\n\\n  \"],[11,\"h1\",[]],[13],[0,\"  Deal  of the  Moment \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"\\n      \"],[1,[33,[\"product-layout\"],null,[[\"isDeal\",\"product\"],[true,[28,[\"product\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[\"product\"]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isRecentlyAdded\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"offer\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\" Recently Added Products \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"offer\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\" Filtered Products \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"displayProducts\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayProducts\"]]],null,{\"statements\":[[0,\"\\n      \"],[1,[33,[\"product-layout\"],null,[[\"product\"],[[28,[\"product\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[\"product\"]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\"],[11,\"video\",[]],[15,\"playsinline\",\"\"],[15,\"autoplay\",\"\"],[15,\"loop\",\"\"],[15,\"muted\",\"\"],[15,\"class\",\"max-w-[500px] min-w-[250px] max-h-[330px]\"],[15,\"style\",\"width: 400px; border-radius:20px\"],[13],[11,\"source\",[]],[15,\"src\",\"https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-cart-animation-download-in-lottie-json-gif-static-svg-file-formats--no-item-shopping-shpping-bascket-food-delivery-pack-e-commerce-animations-4391074.mp4\"],[15,\"type\",\"video/mp4\"],[13],[14],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"next-prev\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isPrevious\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-left\"],[5,[\"action\"],[[28,[null]],\"previous\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isNext\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-right\"],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/products/index.hbs" } });
});
define("z-kart/templates/products/product", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "W9D9fGns", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"orderError\"]]],null,{\"statements\":[[1,[33,[\"success-order\"],null,[[\"error\"],[true]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"orderSuccess\"]]],null,{\"statements\":[[1,[26,[\"success-order\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isCustomer\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"isBuyProduct\"]]],null,{\"statements\":[[1,[33,[\"order-details\"],null,[[\"name\",\"mobile\",\"address\",\"triggerBack\",\"triggerBuy\"],[[28,[\"name\"]],[28,[\"mobile\"]],[28,[\"address\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"buy\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n       \"],[11,\"div\",[]],[15,\"class\",\"magnified\"],[16,\"style\",[26,[\"magnifiedStyle\"]],null],[13],[0,\"\\n      \"],[14],[0,\"\\n   \"],[11,\"div\",[]],[15,\"class\",\"images\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"image\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[16,\"src\",[34,[[28,[\"model\",\"product\",\"image\"]]]]],[15,\"alt\",\"model.name\"],[16,\"onmousemove\",[33,[\"action\"],[[28,[null]],\"handleMouseMove\"],null],null],[16,\"onmouseleave\",[33,[\"action\"],[[28,[null]],\"handleMouseLeave\"],null],null],[15,\"width\",\"90%\"],[13],[14],[0,\"\\n\\n\\n      \"],[14],[0,\"\\n       \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[1,[28,[\"model\",\"product\",\"name\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[0,\"Product Id : \"],[1,[28,[\"model\",\"product\",\"product_id\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[1,[28,[\"model\",\"product\",\"model\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[1,[28,[\"model\",\"product\",\"brand\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"description\"],[13],[1,[28,[\"model\",\"product\",\"category\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"count\"],[13],[0,\"Available: \"],[1,[28,[\"model\",\"product\",\"stock\"]],false],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isMaxStock\"]]],null,{\"statements\":[[0,\"\\n           \"],[11,\"h3\",[]],[15,\"style\",\"color: green;\"],[13],[0,\"Price : \"],[1,[26,[\"discountedPrice\"]],false],[0,\" Rs\"],[14],[0,\" \\n          \"],[11,\"del\",[]],[13],[0,\" \"],[11,\"h4\",[]],[15,\"style\",\"color: red;\"],[13],[0,\"Price : \"],[1,[28,[\"model\",\"product\",\"price\"]],false],[0,\" Rs\"],[14],[0,\" \"],[14],[0,\"\\n\\n           \"],[11,\"h4\",[]],[15,\"style\",\"color:red;\"],[13],[0,\"Deal of the Moment Discount : 10% \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n        \"],[11,\"h2\",[]],[15,\"style\",\"color: green; text-align:left\"],[13],[0,\"Price : \"],[1,[28,[\"model\",\"product\",\"price\"]],false],[0,\" Rs\"],[14],[0,\"\\n\\n\"]],\"locals\":[]}],[0,\"\\n\\n   \"],[14],[0,\"\\n    \"],[14],[0,\"\\n \\n \"],[11,\"div\",[]],[15,\"class\",\"content-buttons\"],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isCustomer\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"inStock\"]]],null,{\"statements\":[[0,\"     \\n    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"buyProduct\"]],[13],[0,\"Buy\"],[14],[0,\"\\n\\n    \"],[11,\"a\",[]],[16,\"style\",[34,[[33,[\"if\"],[[28,[\"addingChange\"]],\"background-color:gray; \"],null],\" \",[33,[\"if\"],[[28,[\"addedChange\"]],\"background-color: #ff8c00;\"],null]]]],[5,[\"action\"],[[28,[null]],\"addToCart\"]],[13],[1,[26,[\"addedToCart\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"h2\",[]],[15,\"style\",\"color: red;\"],[13],[0,\" Out Of Stock\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n    \"],[6,[\"link-to\"],[\"signin\"],null,{\"statements\":[[0,\" Sign In \"]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"link-to\"],[\"signup\"],null,{\"statements\":[[0,\" Sign Up \"]],\"locals\":[]},null],[0,\"\\n\\n\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\\n \"],[14],[0,\"\\n\\n   \\n\\n  \"],[14],[0,\"\\n\\n\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"relateProducts\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"offer\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\" Related products\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\" \\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayProducts\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"product-layout\"],null,[[\"product\"],[[28,[\"product\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"product\"]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"next-prev\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isPrevious\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-left\"],[5,[\"action\"],[[28,[null]],\"previous\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isNext\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-right\"],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/products/product.hbs" } });
});
define("z-kart/templates/products/search", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G7lKy4b3", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isFilter\"]]],null,{\"statements\":[[1,[33,[\"filter-bar\"],null,[[\"isGlobal\",\"triggerAfterError\",\"data\",\"triggerBack\",\"triggerFilter\",\"triggerClear\"],[[28,[\"isGlobal\"]],[33,[\"action\"],[[28,[null]],\"afterError\"],null],[28,[\"model\"]],[33,[\"action\"],[[28,[null]],\"back\"],null],[33,[\"action\"],[[28,[null]],\"filter\"],null],[33,[\"action\"],[[28,[null]],\"clear\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"displayProducts\"]]],null,{\"statements\":[[0,\"\\n \\n\"],[11,\"div\",[]],[15,\"class\",\"filter-button\"],[13],[0,\"\\n  \"],[11,\"button\",[]],[15,\"title\",\" Local Filter \"],[5,[\"action\"],[[28,[null]],\"displayFilter\"]],[13],[11,\"i\",[]],[16,\"style\",[33,[\"if\"],[[28,[\"isFilteredProducts\"]],\"color:lightgreen;\"],null],null],[15,\"class\",\"fa-solid fa-filter\"],[13],[14],[0,\"  Filter\"],[14],[0,\"\\n\"],[14],[0,\"\\n \\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"displayProducts\"]]],null,{\"statements\":[[0,\"  \\n      \"],[1,[33,[\"product-layout\"],null,[[\"product\"],[[28,[\"product\"]]]]],false],[0,\"\\n\\n\"]],\"locals\":[\"product\"]},null],[0,\"\\n\\n\\n\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"next-prev\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isPrevious\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-left\"],[5,[\"action\"],[[28,[null]],\"previous\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isNext\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa-solid fa-chevron-right\"],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n\"],[11,\"video\",[]],[15,\"playsinline\",\"\"],[15,\"autoplay\",\"\"],[15,\"loop\",\"\"],[15,\"muted\",\"\"],[15,\"class\",\"max-w-[500px] min-w-[250px] max-h-[330px]\"],[15,\"style\",\"width: 500px; border-radius:20px\"],[13],[11,\"source\",[]],[15,\"src\",\"https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-cart-animation-download-in-lottie-json-gif-static-svg-file-formats--no-item-shopping-shpping-bascket-food-delivery-pack-e-commerce-animations-4391074.mp4\"],[15,\"type\",\"video/mp4\"],[13],[14],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"products\"],[13],[0,\"\\n  \"],[6,[\"link-to\"],[\"products.index\"],null,{\"statements\":[[11,\"button\",[]],[15,\"style\",\"background-color: rgb(255, 140, 0);\"],[13],[0,\"Products\"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n \\n\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/products/search.hbs" } });
});
define("z-kart/templates/signin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BSODlfih", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"authentication-layout\"],null,null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"form-content\"],[13],[0,\"\\n\"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n\\n\"],[11,\"h1\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-right-to-bracket\"],[13],[14],[0,\" Sign in\"],[14],[0,\"\\n\\n\"],[6,[\"unless\"],[[28,[\"isEmailValid\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"input\"],null,[[\"class\",\"type\",\"value\",\"placeholder\",\"input\",\"required\",\"focus-out\"],[[33,[\"if\"],[[28,[\"emailError\"]],\"error\"],null],\"email\",[28,[\"email\"]],\" Enter Email\",[33,[\"action\"],[[28,[null]],\"clearEmailError\"],null],true,[33,[\"action\"],[[28,[null]],\"checkEmail\"],null]]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[1,[26,[\"emailError\"]],false],[14],[0,\"\\n\\n        \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-forward\"],[13],[14],[0,\"  Next \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEmailValid\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n                \"],[1,[33,[\"input\"],[[33,[\"-input-type\"],[[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null]],null]],[[\"class\",\"type\",\"input\",\"value\",\"placeholder\",\"required\"],[[33,[\"if\"],[[28,[\"passwordError\"]],\"error\"],null],[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null],[33,[\"action\"],[[28,[null]],\"clearPasswordError\"],null],[28,[\"password\"]],\"Enter Password\",true]]],false],[0,\" \\n        \\n                \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"togglePasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPassword\"]]],null,{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n                \"]],\"locals\":[]}],[14],[0,\"\\n        \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n       \"],[11,\"p\",[]],[13],[1,[26,[\"passwordError\"]],false],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"submit-buttons\"],[13],[0,\" \\n\\n        \"],[11,\"button\",[]],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-backward\"],[13],[14],[0,\" Back \"],[14],[0,\" \\n        \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-right-to-bracket\"],[13],[14],[0,\"  Sign In\"],[14],[0,\" \\n\\n\"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n     \"],[6,[\"link-to\"],[\"signup\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\" Sign up \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"link-to\"],[\"changepassword\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\" Change Password \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/signin.hbs" } });
});
define("z-kart/templates/signup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GEAvVgLM", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isLoader\"]]],null,{\"statements\":[[1,[26,[\"loading-component\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\" \\n\"],[6,[\"authentication-layout\"],null,null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"form-content\"],[13],[0,\"\\n\"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"onSubmit\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n\\n\"],[11,\"h1\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-plus\"],[13],[14],[0,\" Sign up\"],[14],[0,\" \\n\\n\"],[6,[\"if\"],[[28,[\"isAllowOtp\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"p\",[]],[15,\"style\",\"color: green;\"],[13],[0,\" Please Check Your Mail for OTP .\"],[14],[0,\"\\n    \"],[11,\"input\",[]],[15,\"type\",\"number\"],[16,\"class\",[33,[\"if\"],[[28,[\"error\"]],\"error\"],null],null],[16,\"value\",[26,[\"otp\"]],null],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateOtp\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"storeOtp\"],null],null],[15,\"placeholder\",\"* Otp\"],[15,\"required\",\"\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n   \"],[6,[\"if\"],[[28,[\"error\"]]],null,{\"statements\":[[11,\"p\",[]],[13],[1,[26,[\"error\"]],false],[14]],\"locals\":[]},null],[0,\"\\n   \"],[11,\"div\",[]],[15,\"class\",\"submit-buttons\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-backward\"],[13],[14],[0,\"  Back \"],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-user\"],[13],[14],[0,\" Sign up\"],[14],[0,\" \\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\" \\n    \"],[1,[33,[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"input\",\"change\",\"required\"],[\"email\",[33,[\"if\"],[[28,[\"emailError\"]],\"error\"],null],[28,[\"email\"]],\"* Email\",[33,[\"action\"],[[28,[null]],\"clearEmailError\"],null],[33,[\"action\"],[[28,[null]],\"checkEmailPattern\"],null],true]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"emailError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"emailError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"input\",[]],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"preventNumbers\"],null],null],[16,\"value\",[26,[\"name\"]],null],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"nameError\"]],\"error\"],null]]]],[15,\"placeholder\",\"* Name\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"clearNameError\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"checkName\"],null],null],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"nameError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"nameError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"input\",[]],[15,\"type\",\"number\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"mobileError\"]],\"error\"],null]]]],[16,\"value\",[26,[\"mobile\"]],null],[15,\"placeholder\",\"+91  * Mobile\"],[16,\"onkeypress\",[33,[\"action\"],[[28,[null]],\"validateMobile\"],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"storeMobile\"],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"clearMobileError\"],null],null],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"mobileError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"mobileError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n    \"],[1,[33,[\"input\"],null,[[\"class\",\"value\",\"placeholder\",\"change\",\"input\"],[[33,[\"if\"],[[28,[\"addressError\"]],\"error\"],null],[28,[\"address\"]],\"* Address\",[33,[\"action\"],[[28,[null]],\"checkAddress\"],null],[33,[\"action\"],[[28,[null]],\"clearAddressError\"],null]]]],false],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"addressError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"addressError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n        \"],[11,\"input\",[]],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkPassword\"],null],null],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"passwordError\"]],\"error\"],null]]]],[16,\"value\",[26,[\"password\"]],null],[16,\"type\",[33,[\"if\"],[[28,[\"showNewPassword\"]],\"text\",\"password\"],null],null],[15,\"placeholder\",\"* Password\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n      \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"toggleNewPasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showNewPassword\"]]],null,{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]}],[14],[0,\"\\n\\n\\n    \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"passwordError\"]]],null,{\"statements\":[[0,\" \"],[11,\"p\",[]],[13],[1,[26,[\"passwordError\"]],false],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\\n\\n \"],[11,\"div\",[]],[15,\"class\",\"password-container\"],[13],[0,\"\\n        \"],[11,\"input\",[]],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"checkConfirmPassword\"],null],null],[15,\"type\",\"password\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"confirmPasswordError\"]],\"error\"],null]]]],[16,\"type\",[33,[\"if\"],[[28,[\"showPassword\"]],\"text\",\"password\"],null],null],[16,\"value\",[26,[\"passwordConfirm\"]],null],[15,\"placeholder\",\"* Confirm Password\"],[13],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n        \"],[11,\"span\",[]],[15,\"class\",\"eye-icon\"],[5,[\"action\"],[[28,[null]],\"togglePasswordVisibility\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPassword\"]]],null,{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye\"],[13],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[0,\"         \"],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-eye-slash\"],[13],[14],[0,\"\\n         \"]],\"locals\":[]}],[14],[0,\"\\n\\n    \"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"confirmPasswordError\"]]],null,{\"statements\":[[11,\"p\",[]],[13],[1,[26,[\"confirmPasswordError\"]],false],[14]],\"locals\":[]},null],[0,\"\\n\\n        \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"next\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa-solid fa-forward\"],[13],[14],[0,\" Next \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"signin\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\" Sign in \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"link-to\"],[\"changepassword\"],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[13],[0,\" Change Password \"],[14],[0,\" \"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "z-kart/templates/signup.hbs" } });
});


define('z-kart/config/environment', ['ember'], function(Ember) {
  var prefix = 'z-kart';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("z-kart/app")["default"].create({"name":"z-kart","version":"0.0.0+0bdca3d4"});
}
//# sourceMappingURL=z-kart.map
