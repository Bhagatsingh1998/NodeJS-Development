const Product = require('../model/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/"
    });
  })
  .catch(err => console.log(err));
};


exports.getProduct = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/product-list", {
        pageTitle: "Shop Products",
        prods: products,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getDetails = (req, res, next) => {
  const productID = req.params.productId;
  Product.findById(productID)
  .then(product => {
    res.render(
      'shop/product-detail',
      {
        pageTitle: product.title,
        product: product,
        path: '/products'
      }
    );
  })
  .catch(err => console.log(err));
};


exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then((products) => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};




exports.postCart = (req, res, next) => {
  const productID = req.body.productId

  // finding whole product details based on product id
  Product.findById(productID)
  .then(product => {
    // in 'app.js' we created full fletched user. thus now can use the user model methods
    return req.user.addToCart(product)
  })
  .then(result => {
    // now we can see 'embedded document' in a cart document with an object which hold product data. 
    // thus now we have redeent data ie, product which is in 'products' model is in 'users' model also as a embedded document. Disadvatage: if we cange the product dta, then we have to change it in 'users' model. hence we have lot of redentet data. 
    // thus, going to cart model and only storing id
    // console.log(result)
  })
  .catch(err => console.log(err));


  // let fetchedCart;
  // let newQuantity = 1;

  // req.user.getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: productID } });
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
      
  //     if (product) {
  //       const oldQunatity = product.cartItem.quantity;
  //       newQuantity = oldQunatity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(productID)
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
}

// exports.postCartDeleteProduct = (req, res, next) => {
//   const productID = req.body.productId;

//   req.user.getCart()
//   .then(cart => {
//     return cart.getProducts({where: {id: productID}})
//   })
//   .then(products => {
//     const product = products[0];
//     return product.cartItem.destroy();
//   })
//   .then(() => res.redirect('/cart'))
//   .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({include: ['products']})
//     .then(orders => {
//     res.render('shop/orders', {
//       pageTitle: 'Orders',
//       path: '/orders',
//       orders: orders
//     });
//   })
//   .catch(err => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchCart;

//   req.user.getCart()
//   .then(cart => {
//     fetchCart = cart;
//     return cart.getProducts();
//   })
//   .then(products => {
//     return req.user.createOrder()
//     .then(order => {
//       return order.addProducts(products.map(product => {
//         product.orderItem = {
//           quantity: product.cartItem.quantity
//         }
//         return product;
//       }))
//     })
//     .catch(err => console.log(err));
//   })
//   .then(result => {
//     return fetchCart.setProducts(null);
//   })
//   .then(() => {
//     res.redirect('/orders');
//   })
//   .catch(err => console.log(err));
// };







