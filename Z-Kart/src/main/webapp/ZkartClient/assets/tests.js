'use strict';

define('z-kart/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('Classes/URIClass.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'Classes/URIClass.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-edit-product.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-edit-product.js should pass ESLint\n\n28:13 - Unexpected console statement. (no-console)\n106:19 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-edit-user.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-edit-user.js should pass ESLint\n\n128:13 - Unexpected console statement. (no-console)\n251:21 - \'body\' is already defined. (no-redeclare)\n261:17 - Unexpected console statement. (no-console)\n263:21 - \'uri\' is already defined. (no-redeclare)\n268:21 - Unexpected console statement. (no-console)\n273:25 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/admin-nav-bar-lis.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/admin-nav-bar-lis.js should pass ESLint\n\n21:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/admin-nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/admin-nav-bar.js should pass ESLint\n\n33:13 - Unexpected console statement. (no-console)\n92:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/alert-pop.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/alert-pop.js should pass ESLint\n\n');
  });

  QUnit.test('components/authentication-layout.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/authentication-layout.js should pass ESLint\n\n');
  });

  QUnit.test('components/cart-product.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/cart-product.js should pass ESLint\n\n');
  });

  QUnit.test('components/change-password.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/change-password.js should pass ESLint\n\n31:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/customers-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/customers-table.js should pass ESLint\n\n35:13 - Unexpected console statement. (no-console)\n44:13 - Unexpected console statement. (no-console)\n45:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/filter-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/filter-bar.js should pass ESLint\n\n43:7 - Unexpected console statement. (no-console)\n46:65 - Unnecessary semicolon. (no-extra-semi)\n48:59 - Unnecessary semicolon. (no-extra-semi)\n56:63 - Unnecessary semicolon. (no-extra-semi)\n58:57 - Unnecessary semicolon. (no-extra-semi)\n88:5 - Unexpected console statement. (no-console)\n179:19 - Unexpected console statement. (no-console)\n258:5 - Unexpected console statement. (no-console)\n289:11 - \'cat\' is already defined. (no-redeclare)\n326:9 - Unexpected console statement. (no-console)\n350:9 - Unexpected console statement. (no-console)\n373:9 - Unexpected console statement. (no-console)\n481:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/homepage-tour.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/homepage-tour.js should pass ESLint\n\n');
  });

  QUnit.test('components/loading-component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/loading-component.js should pass ESLint\n\n');
  });

  QUnit.test('components/navigation-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/navigation-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/navigation-list.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/navigation-list.js should pass ESLint\n\n19:9 - Unexpected console statement. (no-console)\n23:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/order-component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/order-component.js should pass ESLint\n\n');
  });

  QUnit.test('components/order-details.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/order-details.js should pass ESLint\n\n19:13 - Unexpected console statement. (no-console)\n20:13 - Unexpected console statement. (no-console)\n21:13 - Unexpected console statement. (no-console)\n95:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/orderproducts-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/orderproducts-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/orders-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/orders-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/pop-up.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pop-up.js should pass ESLint\n\n');
  });

  QUnit.test('components/poster-banner.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/poster-banner.js should pass ESLint\n\n');
  });

  QUnit.test('components/product-layout.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/product-layout.js should pass ESLint\n\n');
  });

  QUnit.test('components/products-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/products-table.js should pass ESLint\n\n26:13 - Unexpected console statement. (no-console)\n34:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/search-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/search-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/success-order.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/success-order.js should pass ESLint\n\n');
  });

  QUnit.test('components/zkart-logo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/zkart-logo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/account.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/account.js should pass ESLint\n\n11:17 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/admin.js should pass ESLint\n\n170:17 - Unexpected console statement. (no-console)\n241:21 - Unexpected console statement. (no-console)\n385:17 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass ESLint\n\n39:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/cart.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/cart.js should pass ESLint\n\n12:9 - Unexpected console statement. (no-console)\n31:9 - Unexpected console statement. (no-console)\n32:9 - Unexpected console statement. (no-console)\n204:29 - Unexpected console statement. (no-console)\n222:21 - Unexpected console statement. (no-console)\n281:21 - Unexpected console statement. (no-console)\n308:21 - Unexpected console statement. (no-console)\n312:21 - Unexpected console statement. (no-console)\n325:21 - Unexpected console statement. (no-console)\n346:17 - Unexpected console statement. (no-console)\n359:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/changepassword.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/changepassword.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/error.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/errorpage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/errorpage.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/products/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/products/index.js should pass ESLint\n\n88:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/products/product.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/products/product.js should pass ESLint\n\n26:9 - Unexpected console statement. (no-console)\n149:21 - Unexpected console statement. (no-console)\n155:21 - Unexpected console statement. (no-console)\n175:17 - Unexpected console statement. (no-console)\n190:13 - Unexpected console statement. (no-console)\n206:29 - Unexpected console statement. (no-console)\n224:21 - Unexpected console statement. (no-console)\n253:25 - Unexpected console statement. (no-console)\n262:25 - Unexpected console statement. (no-console)\n272:21 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/products/search.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/products/search.js should pass ESLint\n\n64:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/signin.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/signin.js should pass ESLint\n\n107:22 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/signup.js should pass ESLint\n\n40:17 - Unexpected console statement. (no-console)\n76:26 - \'event\' is defined but never used. (no-unused-vars)\n276:21 - Unexpected console statement. (no-console)');
  });

  QUnit.test('helpers/contains.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/contains.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/eq.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/eq.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-time.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-time.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/mul.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/mul.js should pass ESLint\n\n7:3 - Unexpected console statement. (no-console)\n8:3 - Unexpected console statement. (no-console)');
  });

  QUnit.test('helpers/order-coupon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/order-coupon.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/sum.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/sum.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/account.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/account.js should pass ESLint\n\n');
  });

  QUnit.test('routes/account/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/account/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/account/products.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/account/products.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass ESLint\n\n13:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/cart.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/cart.js should pass ESLint\n\n');
  });

  QUnit.test('routes/changepassword.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/changepassword.js should pass ESLint\n\n');
  });

  QUnit.test('routes/error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/error.js should pass ESLint\n\n');
  });

  QUnit.test('routes/errorpage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/errorpage.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/products/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/products/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/products/product.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/products/product.js should pass ESLint\n\n');
  });

  QUnit.test('routes/products/search.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/products/search.js should pass ESLint\n\n31:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/signin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/signin.js should pass ESLint\n\n');
  });

  QUnit.test('routes/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/signup.js should pass ESLint\n\n');
  });

  QUnit.test('services/cart-products.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/cart-products.js should pass ESLint\n\n24:17 - Unexpected console statement. (no-console)');
  });

  QUnit.test('services/filter-store.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/filter-store.js should pass ESLint\n\n');
  });

  QUnit.test('services/passwordcomplexity.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/passwordcomplexity.js should pass ESLint\n\n');
  });
});
define('z-kart/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('z-kart/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'z-kart/tests/helpers/start-app', 'z-kart/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('z-kart/tests/helpers/resolver', ['exports', 'z-kart/resolver', 'z-kart/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('z-kart/tests/helpers/start-app', ['exports', 'z-kart/app', 'z-kart/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('z-kart/tests/integration/components/add-edit-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-edit-product', 'Integration | Component | add edit product', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "w9Fc5zLC",
      "block": "{\"statements\":[[1,[26,[\"add-edit-product\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "i95gBNF6",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"add-edit-product\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/add-edit-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-edit-user', 'Integration | Component | add edit user', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "jwwkeEE+",
      "block": "{\"statements\":[[1,[26,[\"add-edit-user\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "T+jhcBr4",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"add-edit-user\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/admin-nav-bar-lis-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-nav-bar-lis', 'Integration | Component | admin nav bar lis', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wWzz3zj2",
      "block": "{\"statements\":[[1,[26,[\"admin-nav-bar-lis\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "nh/9EJTR",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"admin-nav-bar-lis\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/admin-nav-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-nav-bar', 'Integration | Component | admin nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "U/w7jrd0",
      "block": "{\"statements\":[[1,[26,[\"admin-nav-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "cXpxTH5j",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"admin-nav-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/admin-navi-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-navi-bar', 'Integration | Component | admin navi bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "4UCjFVtm",
      "block": "{\"statements\":[[1,[26,[\"admin-navi-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "zyL8XFPq",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"admin-navi-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/alert-pop-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('alert-pop', 'Integration | Component | alert pop', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "qQoNc+Me",
      "block": "{\"statements\":[[1,[26,[\"alert-pop\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "H43Ayj5a",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"alert-pop\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/authentication-layout-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('authentication-layout', 'Integration | Component | authentication layout', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "KjE6EA6l",
      "block": "{\"statements\":[[1,[26,[\"authentication-layout\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "CQzQ65So",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"authentication-layout\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/cart-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('cart-product', 'Integration | Component | cart product', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "jXp5NMyp",
      "block": "{\"statements\":[[1,[26,[\"cart-product\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "KKS8qSon",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"cart-product\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/change-password-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('change-password', 'Integration | Component | change password', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "uOmIUotY",
      "block": "{\"statements\":[[1,[26,[\"change-password\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9vZu/0CM",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"change-password\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/customers-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('customers-table', 'Integration | Component | customers table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "gt5/dJx+",
      "block": "{\"statements\":[[1,[26,[\"customers-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wyxZuZbK",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"customers-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/filter-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('filter-bar', 'Integration | Component | filter bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UJWwn6GG",
      "block": "{\"statements\":[[1,[26,[\"filter-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ZTBnWaP1",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"filter-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/homepage-tour-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('homepage-tour', 'Integration | Component | homepage tour', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "1VEqgPPv",
      "block": "{\"statements\":[[1,[26,[\"homepage-tour\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "28o6O6Xx",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"homepage-tour\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/loading-component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('loading-component', 'Integration | Component | loading component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "o3Iyf2Ya",
      "block": "{\"statements\":[[1,[26,[\"loading-component\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "H5hzFHgC",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"loading-component\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/navigation-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('navigation-bar', 'Integration | Component | navigation bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "94uRl1Kr",
      "block": "{\"statements\":[[1,[26,[\"navigation-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6Ex0uJmA",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"navigation-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/navigation-list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('navigation-list', 'Integration | Component | navigation list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "abMiR6qe",
      "block": "{\"statements\":[[1,[26,[\"navigation-list\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "MjG8T/bD",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"navigation-list\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/order-component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('order-component', 'Integration | Component | order component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Y69RY6mB",
      "block": "{\"statements\":[[1,[26,[\"order-component\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "S4OgcK0o",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"order-component\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/order-details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('order-details', 'Integration | Component | order details', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "FL+D+1gL",
      "block": "{\"statements\":[[1,[26,[\"order-details\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tywF3fBg",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"order-details\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/orderproducts-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('orderproducts-table', 'Integration | Component | orderproducts table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "jLMSxviL",
      "block": "{\"statements\":[[1,[26,[\"orderproducts-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "eHjisQ1l",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"orderproducts-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/orders-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('orders-table', 'Integration | Component | orders table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+3vQyhi9",
      "block": "{\"statements\":[[1,[26,[\"orders-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "3w0cUEKt",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"orders-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/pop-up-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('pop-up', 'Integration | Component | pop up', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UGpAAkp/",
      "block": "{\"statements\":[[1,[26,[\"pop-up\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "KsoLxidD",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"pop-up\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/poster-banner-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('poster-banner', 'Integration | Component | poster banner', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UQbkPNLx",
      "block": "{\"statements\":[[1,[26,[\"poster-banner\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "AyHwfZnW",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"poster-banner\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/product-layout-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('product-layout', 'Integration | Component | product layout', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "FwZ7fuot",
      "block": "{\"statements\":[[1,[26,[\"product-layout\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "8vOrQgbZ",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"product-layout\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/products-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('products-table', 'Integration | Component | products table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "iLY2sQPa",
      "block": "{\"statements\":[[1,[26,[\"products-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Y3r7+jXa",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"products-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/search-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('search-bar', 'Integration | Component | search bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "FzvoM0hE",
      "block": "{\"statements\":[[1,[26,[\"search-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "jKfMJFsx",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"search-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/success-order-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('success-order', 'Integration | Component | success order', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "0pHoXA1H",
      "block": "{\"statements\":[[1,[26,[\"success-order\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "gmnYy1Jh",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"success-order\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/components/zkart-logo-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('zkart-logo', 'Integration | Component | zkart logo', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "sHLefnHJ",
      "block": "{\"statements\":[[1,[26,[\"zkart-logo\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qJQlqbYT",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"zkart-logo\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('z-kart/tests/integration/helpers/compare-stock-count-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('compare-stock-count', 'helper:compare-stock-count', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "CCJnD+7a",
      "block": "{\"statements\":[[1,[33,[\"compare-stock-count\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/compare-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('compare', 'helper:compare', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "8OHtpfB/",
      "block": "{\"statements\":[[1,[33,[\"compare\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/contains-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('contains', 'helper:contains', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "XBuLjKpc",
      "block": "{\"statements\":[[1,[33,[\"contains\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/eq-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('eq', 'helper:eq', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "1SYOrDlN",
      "block": "{\"statements\":[[1,[33,[\"eq\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/format-time-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('format-time', 'helper:format-time', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "jGwYvE1s",
      "block": "{\"statements\":[[1,[33,[\"format-time\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/mul-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('mul', 'helper:mul', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "20UZKLBN",
      "block": "{\"statements\":[[1,[33,[\"mul\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/order-coupon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('order-coupon', 'helper:order-coupon', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "pfOjnMML",
      "block": "{\"statements\":[[1,[33,[\"order-coupon\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/integration/helpers/sum-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sum', 'helper:sum', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "TZAJT03u",
      "block": "{\"statements\":[[1,[33,[\"sum\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('z-kart/tests/test-helper', ['z-kart/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('z-kart/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-edit-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-edit-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-edit-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-edit-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-nav-bar-lis-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-nav-bar-lis-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-nav-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-nav-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-navi-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-navi-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/alert-pop-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/alert-pop-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/authentication-layout-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/authentication-layout-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/cart-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cart-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/change-password-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/change-password-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/customers-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/customers-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/filter-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/filter-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/homepage-tour-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/homepage-tour-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/loading-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/loading-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/navigation-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/navigation-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/navigation-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/navigation-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/order-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/order-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/order-details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/order-details-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/orderproducts-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/orderproducts-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/orders-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/orders-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/pop-up-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pop-up-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/poster-banner-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/poster-banner-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/product-layout-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/product-layout-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/products-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/products-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/search-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/search-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/success-order-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/success-order-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/zkart-logo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/zkart-logo-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/compare-stock-count-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/compare-stock-count-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/compare-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/compare-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/contains-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/contains-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/eq-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/eq-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/format-time-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-time-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/mul-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/mul-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/order-coupon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/order-coupon-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/sum-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/sum-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/account-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/account-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/add-customer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/add-customer-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/add-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/add-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/cart-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/cart-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/changepassword-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/changepassword-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/edit-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/edit-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/edit-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/edit-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/edituser-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/edituser-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/errorpage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/errorpage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/products/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/products/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/products/product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/products/product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/products/search-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/products/search-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/signin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/signin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/account-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/account-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/account/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/account/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/account/products-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/account/products-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/add-customer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/add-customer-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/add-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/add-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/cart-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/cart-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/changepassword-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/changepassword-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/edit-product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/edit-product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/edit-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/edit-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/errorpage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/errorpage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/products/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/products/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/products/product-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/products/product-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/products/search-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/products/search-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/signin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/cart-products-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/cart-products-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/filter-store-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/filter-store-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/maxproducts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/maxproducts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/passwordcomplexity-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/passwordcomplexity-test.js should pass ESLint\n\n');
  });
});
define('z-kart/tests/unit/controllers/account-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:account', 'Unit | Controller | account', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/add-customer-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:add-customer', 'Unit | Controller | add customer', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/add-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:add-product', 'Unit | Controller | add product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:admin', 'Unit | Controller | admin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/cart-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:cart', 'Unit | Controller | cart', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/changepassword-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:changepassword', 'Unit | Controller | changepassword', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/edit-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:edit-product', 'Unit | Controller | edit product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/edit-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:edit-user', 'Unit | Controller | edit user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/edituser-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:edituser', 'Unit | Controller | edituser', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/error-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:error', 'Unit | Controller | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/errorpage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:errorpage', 'Unit | Controller | errorpage', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:index', 'Unit | Controller | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/products/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:products/index', 'Unit | Controller | products/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/products/product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:products/product', 'Unit | Controller | products/product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/products/search-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:products/search', 'Unit | Controller | products/search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/signin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:signin', 'Unit | Controller | signin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/controllers/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:signup', 'Unit | Controller | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('z-kart/tests/unit/routes/about-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/account-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:account', 'Unit | Route | account', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/account/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:account/index', 'Unit | Route | account/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/account/products-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:account/products', 'Unit | Route | account/products', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/add-customer-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:add-customer', 'Unit | Route | add customer', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/add-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:add-product', 'Unit | Route | add product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin', 'Unit | Route | admin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/cart-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:cart', 'Unit | Route | cart', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/changepassword-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:changepassword', 'Unit | Route | changepassword', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/edit-product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:edit-product', 'Unit | Route | edit product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/edit-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:edit-user', 'Unit | Route | edit user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/error-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:error', 'Unit | Route | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/errorpage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:errorpage', 'Unit | Route | errorpage', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/products/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:products/index', 'Unit | Route | products/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/products/product-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:products/product', 'Unit | Route | products/product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/products/search-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:products/search', 'Unit | Route | products/search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/signin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:signin', 'Unit | Route | signin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/routes/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:signup', 'Unit | Route | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('z-kart/tests/unit/services/cart-products-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:cart-products', 'Unit | Service | cart products', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('z-kart/tests/unit/services/filter-store-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:filter-store', 'Unit | Service | filter store', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('z-kart/tests/unit/services/maxproducts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:maxproducts', 'Unit | Service | maxproducts', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('z-kart/tests/unit/services/passwordcomplexity-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:passwordcomplexity', 'Unit | Service | passwordcomplexity', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
require('z-kart/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
