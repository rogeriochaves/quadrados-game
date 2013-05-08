if (Meteor.isClient) {
  Template.hello.quadrado = {x: 200, y: 50}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
