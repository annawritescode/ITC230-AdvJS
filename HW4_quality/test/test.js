var expect = require("chai").expect;
var film = require("../lib/films");

//Find film

describe("films module", () => {
 it("returns requested film", function() {
   var result = film.get("Iris");
   expect(result).to.deep.equal({title: "Iris", director:"Albert Maysles", releaseDate:2014});
 });
 
 it("fails w/ invalid book", () => {
   var result = film.get("fake");
   expect(result).to.be.undefined;
 });
 
 // Add the film
it("adds the requested film", function() {
    var result = film.add({ title: "Herb and Dorthy", director: "Bernadine Colish", releaseDate: 2008});
    expect(result.added).to.be.true;
 });
 
 it("add failed with invalid title", () => {
     var result = film.add({ title: "Blah", director: "John Johnson", releaseDate: 2020 });
    expect(result.added).to.be.true;
 });
// delete the book yay or nay
 it("deletes the title", function() {
    var result = film.delete("movie2");
    expect(result.deleted).to.be.true;
 });
 
 it("delete failed with title", () => {
   var result = film.delete("nope");
   expect(result.deleted).to.be.false;
 });
});