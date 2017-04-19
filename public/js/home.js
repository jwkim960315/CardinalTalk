// Search Ajax
$('button[type="submit"]').on('click', e => {
    var searchQuery = $('input[name="course_code"]')[0].value;
    if (searchQuery === '') return;
    $('input[name="course_code"]')[0].value = '';
    $.ajax({
        url: 'api/courses',
        data: {
            courseCode: searchQuery
        }
    }).done(res => {
        if (res.length === 0)
            return $('#course-list').html('<h1> No matches were found </h1>');
        $('#course-list').html(res.map((course) => {
            // Still have to figure out the course data structure
            return `<li class="list-group-item">
                        <a href="#">
                            ${course}
                        </a>
                    </li>`
        }));
    });
});

// Catalog Ajax
$('a[href="/catalog"]').on('click', e => {
    $.ajax({
        url: 'api/all_courses'
    }).done(res => {
        $('#course-list').html(res.map((course) => {
            // Still have to figure out the course data structure
            return `<li class="list-group-item">
                        <a href="#">
                            ${course}
                        </a>
                    </li>`
        }));
    });
});