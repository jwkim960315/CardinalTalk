const bodyParser = require('body-parser');
const express = require('express');
// const {mongoose} = require('./db/mongoose');
const methodOverride = require('method-override');
var request = require('request-promise');

var courseInfos;
var courseRender;

// Helper Functions
var noNameChanger = function(lst) {
    if (lst === null)
        return ["TBA"];
    lst = lst.map((ob) => {
        return (ob["instructors"][0]["first_name"] === "** ERROR:  Name") ? "STAFF" : ob["instructors"][0]["first_name"] + " " + ob["instructors"][0]["last_name"];
    });

    var mySet = new Set();
    lst.forEach((name) => {
        mySet.add(name);
    });
    let newList = Array.from(mySet);
    return (newList.length === 0 || newList[0].length === 3) ? ["STAFF"] : newList;
};



const option = {
    uri: `http://webapps-test.wesleyan.edu/wapi/v1/public/academic/courses/${new Date().getFullYear()}`
};

request(option).then(res => {
    // console.dir(JSON.parse(res),{depth:null});
    res = JSON.parse(res);
    res = res["academic"]["courses"].map((course,index,arr) => {
        return {
            subject: course.subject,
            catalog_number: course.catalog_number,
            description: course.description,
            section: course.section,
            instructors: noNameChanger(course["meetings"]).join(", ")
        }
    });
    // console.log(res);
    // console.log(typeof res[0].subject);
    // courseRender = res.filter((course) => {
    //     return course.subject.toLowerCase().search(searchQuery) !== -1 || course.catalog_number.toLowerCase().search(searchQuery) !== -1 || course.description.toLowerCase().search(searchQuery) !== -1 || course.section.toLowerCase().search(searchQuery) !== -1 || course.instructors.toLowerCase().search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase()).search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase().slice(1)).search(searchQuery) !== -1;
    // });

    // courseRender = courseRender.sort((a,b) => {
    //     // console.log(a.subject,b.subject);
    //     return a.subject.toLowerCase() > b.subject.toLowerCase()
    // });

    courseRender = res;

    // console.dir(courseRender,{depth:null});
});


var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname));

app.set('view engine', 'ejs');


app.listen(port, () => {console.log(`Server is running at ${port}`)});


app.get('/',(req,res) => {
    res.render('home.ejs',{});
});

app.get('/catalog',(req,res) => {
    res.render('catalog',{});
})

app.get('/api/all_courses',(req,res) => {
    res.json(courseRender);
});


app.get('/search', (req,res) => {
        var searchQuery = req.body.toLowerCase();
        var result = courseRender.filter((course) => {
            return course.subject.toLowerCase().search(searchQuery) !== -1 || course.catalog_number.toLowerCase().search(searchQuery) !== -1 || course.description.toLowerCase().search(searchQuery) !== -1 || course.section.toLowerCase().search(searchQuery) !== -1 || course.instructors.toLowerCase().search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase()).search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase().slice(1)).search(searchQuery) !== -1;
        });
        console.log(res);
        res.render('home',{courseInfos: res});
});
