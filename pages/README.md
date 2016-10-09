# Page Object Pattern

> "now possible to build up large test suites using this pattern. There are no additional packages required to create page objects. It turns out that Object.create provides all necessary features we need:
>
> * inheritance between page objects
> * lazy loading of elements and
> * encapsulation of methods and actions
>
> "The goal behind page objects is to abstract any page information away from the actual tests. Ideally you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you’ve completely redesigned your page." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

## Sample Page Object

```
// login.page.js
var Page = require('./page')
var LoginPage = Object.create(Page, {
    /**
     * define elements
     */
    username: { get: function () { return browser.element('#username'); } },
    password: { get: function () { return browser.element('#password'); } },
    form:     { get: function () { return browser.element('#login'); } },
    flash:    { get: function () { return browser.element('#flash'); } },
    /**
     * define or overwrite page methods
     */
    open: { value: function() {
        Page.open.call(this, 'login');
    } },
    submit: { value: function() {
        this.form.submitForm();
    } }
});
module.exports = LoginPage
```
### Rule of Thumb
1. Define page selectors in getter functions
2. Define page actions in properties and methods

> "A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML."
> The basic rule of thumb:
>
> 3. It should allow to do anything and see anything that a human can
> 4. It should also provide an interface that's easy to access and modify
> 5. It should hide the underlying widgetry
> 6. It should have accessor methods that take and return your values and commands
>   * check boxes should use booleans
>   * buttons should be represented by action oriented method names
>
> The page object should encapsulate the mechanics required to find and manipulate the data in the gui control itself." by [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

> "From the structural side it makes sense to separate spec files and page objects and put them into different directories."…"This is the basic principle of how to write page objects with WebdriverIO. Note that you can build up way more complex page object structures than this. For example have specific page objects for modals or split up a huge page object into different sections objects that inherit from the main page object. The pattern gives you really a lot of opportunities to encapsulate page information from your actual tests, which is important to keep your test suite structured and clear in times where the project and number of tests grows." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

### Define Selector i.e Getter Function
> …"all important selectors that are required in our page object as getter functions."…" These functions get evaluated when you actually access the property and not when you generate the object. With that you always request the element before you do an action on it." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)

> "**get**: A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property." by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

### Define Action i.e "value" Function
> "Methods are actions that can be performed on objects. Object properties can be both primitive values, other objects, and functions. An object method is an object property containing a function definition." by [W3 Schools](http://www.w3schools.com/js/js_object_definition.asp)

> "Properties are the most important part of any JavaScript object."…"Properties are the values associated with a JavaScript object."…"All properties have a name. In addition they also have a value. The value is one of the property's attributes. Other attributes are: enumerable, configurable, and writable."…"In JavaScript, all attributes can be read, but only the value attribute can be changed (and only if the property is writable)." by [W3 Schools](http://www.w3schools.com/js/js_properties.asp)

> "**value**: Can be any valid JavaScript value (number, object, function, etc)." by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

