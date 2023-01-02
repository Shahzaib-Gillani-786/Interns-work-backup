module.exports=(temp,product)=>{
    
    let output=temp.replace(/{%_id%}/g,product.id)
     output=output.replace(/{%name%}/g,product.name)
     output=output.replace(/{%email%}/g,product.email)
     output=output.replace(/{%password%}/g,product.password)
     output=output.replace(/{%retype%}/g,product.retype)
     return output;
  }