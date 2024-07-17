// const sum = require("./module/sum.js");
import AOS from "aos";

document.addEventListener('DOMContentLoaded', () => {
    console.log("using wow1");
    new AOS.init({
        duration: 2000,
        once: true
    });
    console.log("using wow2");
});
