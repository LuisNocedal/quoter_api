const pageInitController = require('./controllers/pageInit');
const userController = require('./controllers/user');
const productController = require('./controllers/product');
const companyController = require('./controllers/company');
const clientController = require('./controllers/client');
const quoteController = require('./controllers/quote');

const loadRoutes = (app) => {

    //PageInit
    app.get('/page-init/products/:token',pageInitController.products);
    app.get('/page-init/create-product/:token',pageInitController.createProduct);
    app.post('/page-init/edit-product/',pageInitController.editProduct);
    app.get('/page-init/create-quote/:token',pageInitController.createQuote);
    app.get('/page-init/quotes/:token',pageInitController.quotes);
    app.post('/page-init/quote-detail',pageInitController.quoteDetail);
    app.post('/page-init/edit-quote',pageInitController.editQuote);

    //User
    app.post('/user/login',userController.login);
    app.post('/user/create',userController.createUser);

    //Product
    app.post('/product/create',productController.createProduct);
    app.post('/product/delete',productController.deleteProduct);
    app.post('/product/save-changes',productController.saveProductChanges);

    //Company
    app.post('/company/create',companyController.createCompany);

    //Company
    app.post('/client/create',clientController.createClient);

    //Quote
    app.post('/quote/create',quoteController.createQuote);
    app.post('/quote/save-changes',quoteController.saveQuoteChanges);
}

module.exports = {
    loadRoutes
}