var form = document.getElementById('resumeForm');
var resumeDiv = document.getElementById('resume');
var innerContainer = document.getElementById('innerContainer');
document.addEventListener("DOMContentLoaded", function () {
    var profilepic = document.getElementById('pic');
    var inputFile = document.getElementById('profilePicture');
    inputFile.onchange = function () {
        profilepic.src = URL.createObjectURL(inputFile.files[0]);
    };
    form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        var fileInput = document.getElementById('profilePicture');
        var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function () {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: reader.result,
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        };
        if (file) {
            reader.readAsDataURL(file); // Read the image file
        }
        else {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: '',
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        }
    });
    function generateResume(data) {
        var imageHTML = data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" class=\"image\">") : '';
        resumeDiv.innerHTML = "\n      <div class=\"resumeContainer\">\n          <div class=\"information\">\n              <div class=\"nameAndImage\">\n                  <div>".concat(imageHTML, "</div>\n                  <h2>").concat(data.name, "</h2>\n                  <p>").concat(data.jobTitle, "</p>\n              </div>\n              <div class=\"Contact\">\n                <div class=\"box\">\n                <i class=\"fa-solid fa-paper-plane\"></i>\n                <p>").concat(data.email, "</p>\n                </div>\n                <div class=\"box\">\n                <i class=\"fa-solid fa-phone\"></i>\n                <p>").concat(data.phone, "</p>\n                </div>\n              </div>\n          </div>\n          <div class=\"data\">\n              <div class=\"education space\">\n              <h2>Education</h2>\n              <p>").concat(data.degree, " from ").concat(data.school, "</p>\n              </div>\n              <div class=\"experience space\">\n              <h2>Experience</h2>\n              <p>").concat(data.jobTitle, " at ").concat(data.company, "</p>\n              </div>\n              <div class=\"skills space\">\n              <h2>Skills</h2>\n              <ul>\n              ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n              </ul>\n              </div>\n          </div>\n      </div>\n      ");
        innerContainer.style.display = "none";
    }
});
