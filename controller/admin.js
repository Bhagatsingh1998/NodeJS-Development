const Product = require("../model/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Products",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  // const userId = req.user._id;
  // const product = new Product(title, imageUrl, price, description, null, userId);
  // passing the values to Product model within one argument as a object
  const product = new Product({
    // left hand are the keys which are definied in 'Product' model
    // right hand side are the values which are passed to 'product' model
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
  // save is the method which mongoose gives(we have not defined it in our product model). it doesnt give promise but we can still attach then() and catch() block to it
  product.save()
  .then(product => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode) {
    res.redirect('/');
  }
  const productID = req.params.productID;
  Product.findById(productID)
  .then(product => {
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit Products",
      editing: editMode,
      product: product
    });
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const upadatedDesciption = req.body.description;

  const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, upadatedDesciption,productID);
  updatedProduct.save()
  .then(() => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  Product.deleteById(productID)
  .then(() => {
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getProducts = (req, res, next) => {

  Product.fetchAll()
  .then(products => {
    res.render("admin/products", {
      path: "/admin/products",
      pageTitle: "Admin Add Products",
      prods: products,
    });
  })
  .catch(err => console.log(err));
};






