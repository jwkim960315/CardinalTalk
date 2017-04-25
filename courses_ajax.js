// Wesleyan Courses Ajax Call
var courseInfos;

// jQuery.ajaxSetup({async:false});

$.ajax({
    url: `http://webapps-test.wesleyan.edu/wapi/v1/public/academic/courses/${new Date().getFullYear()}`
}).done(res => {
    console.log(courseInfos);
    courseInfos = res;
});







