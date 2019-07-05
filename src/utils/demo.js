// import counter from "@/pages/counter/counter";
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
