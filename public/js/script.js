console.log('JS is loaded into the page');

$.ajax({
  url: 'http://192.168.33.10:3000/allProducts',
  type: 'GET',
  dataType: 'json',
  success:function(products){
    console.log(products);
  },
  error:function(error){
    console.log('ERROR');
    console.log(error);
  }
})
