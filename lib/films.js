//assignment 2 array

// array of objects
//let  declares variables in this scope block
let films = [
    {title:"The September Issue", director:"R.J. Cuttler", releaseDate:"2009"},
    {title:"The First Monday in May", director:"Andrew Rossi", releaseDate:"2016"},
    {title:"Dries", director:"Reiner Holzemer", releaseDate:"2017"},
    {title:"Dior and I", director:"Frederic Tcheng", releaseDate:"2014"},
    {title:"Iris", director:"Albert Maysles", releaseDate:"2014"},
    {title:"Franca: Chaos and Creation", director:"Francesco Carrozzini", releaseDate:"2016"},
    {title:"Manolo: The Boy Who Made Shoes For Lizards", director:"Michael Roberts", releaseDate:"2017"},
    {title:"Jeremy Scott the People's Designer", director:"Vlad Yudin", releaseDate:"2015"},
    {title:"Bill Cunningham's New York", director:"Richard Press", releaseDate:"2010"},
    {title:"A Man's Story", director:"Varon Bonicos", releaseDate:"2010"}
    
    ];
    
  
  
    
    exports.getAllFilms = function() {
        
        return films;
        
    };
    
    
   exports.findTitle = (title) => {
     return films.find((item) => {
      

         return item.title.toLowerCase() == title.toLowerCase(); 
     });  
   };

//Delete an item from the array
exports.delete = (title) => {
    let oldLength = films.length;
    const originalCount = films.length;
    films = films.filter((item) =>{
        
    
        
        return item.title.toLowerCase()!= title;    
        
    });
    
    //boolean to show item was deleted
    return {"deleted": films.length !== oldLength, "totoal": films.length};
    
    
    

};

    



   