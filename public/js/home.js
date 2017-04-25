// Wesleyan Courses Ajax Call
var courseInfos;

console.log("here");

var noNameChanger = function(lst) {
    if (lst === null)
        return ["Not Available"];
    lst = lst.filter((ob) => {
        return ob["instructors"][0]["first_name"] !== "** ERROR:  Name";
    }).map((ob,i,arr) => {
        return ob["instructors"][0]["first_name"] + " " + ob["instructors"][0]["last_name"];
    });
    return (lst.length === 0) ? ["Not Available"] : lst;
};

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
            // if (propName !== "section")
            //     return false;
            // else {
            //     a[propName] = "Same Class Different Sections";
            //     b[propName] = "Same Class Different Sections";
            // }
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

// var filterInfos = function(lst) {
//     lst.forEach((obj,i,arr) => {
//         arr.forEach((obj1,i1,arr1) => {
//             if (i !== i1) {
//                 if (isEquivalent(obj,obj1)) {
//                     courseInfos.add()
//                 }
//             }
//         })
//     })
// }
$('button[type="submit"]').on('click',function(e) {
    e.preventDefault();
    var searchQuery = $('input[type="text"]')[0].value.toLowerCase();
    console.log(typeof searchQuery);
    $('input[type="text"]')[0].value = '';
    $.ajax({
        url: `http://webapps-test.wesleyan.edu/wapi/v1/public/academic/courses/${new Date().getFullYear()}`
    }).done(res => {
        console.log(res);
        res = res["academic"]["courses"].map((course,index,arr) => {
            return {
                subject: course.subject,
                catalog_number: course.catalog_number,
                description: course.description,
                section: course.section,
                instructors: noNameChanger(course["meetings"]).join(", ")
            }
        });
        console.log(res);
        console.log(typeof res[0].subject);
        courseInfos = res.filter((course) => {
            return course.subject.toLowerCase().search(searchQuery) !== -1 || course.catalog_number.toLowerCase().search(searchQuery) !== -1 || course.description.toLowerCase().search(searchQuery) !== -1 || course.section.toLowerCase().search(searchQuery) !== -1 || course.instructors.toLowerCase().search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase()).search(searchQuery) !== -1 || (course.subject.toLowerCase()+course.catalog_number.toLowerCase().slice(1)).search(searchQuery) !== -1;
        });
        console.log(courseInfos);


        $('.all_courses').html(courseInfos.map((course,index,arr) => {
            return `
            <li class="list-group-item">
				<a href="#">${course.subject + course.catalog_number}: ${course.description}
				<br>
				Section: ${course.section}
				<br>
				Instructors: ${course.instructors}</a>
			</li>
    `
        }));
    });
});






