interface ResumeData {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  school: string;
  degree: string;
  jobTitle: string;
  company: string;
  skills: string[];
}

const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDiv = document.getElementById('resume') as HTMLDivElement;
const innerContainer = document.getElementById('innerContainer') as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  
    const profilepic = document.getElementById('pic') as HTMLImageElement;
    const inputFile = document.getElementById('profilePicture') as HTMLInputElement;

    inputFile.onchange = () => {
      if (inputFile.files && inputFile.files[0]) {
        profilepic.src = URL.createObjectURL(inputFile.files[0]);
      } else {
        console.log("No file selected.");
      }
    };
    

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
      const file = fileInput.files?.[0];

      const reader = new FileReader();
      reader.onload = function () {
          const formData: ResumeData = {
              name: (document.getElementById('name') as HTMLInputElement).value,
              email: (document.getElementById('email') as HTMLInputElement).value,
              phone: (document.getElementById('phone') as HTMLInputElement).value,
              profilePicture: reader.result as string, // Image data URL
              school: (document.getElementById('school') as HTMLInputElement).value,
              degree: (document.getElementById('degree') as HTMLInputElement).value,
              jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value,
              company: (document.getElementById('company') as HTMLInputElement).value,
              skills: (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim()),
          };
          generateResume(formData);
      };

      if (file) {
          reader.readAsDataURL(file); // Read the image file
      } else {
          const formData: ResumeData = {
              name: (document.getElementById('name') as HTMLInputElement).value,
              email: (document.getElementById('email') as HTMLInputElement).value,
              phone: (document.getElementById('phone') as HTMLInputElement).value,
              profilePicture: '',
              school: (document.getElementById('school') as HTMLInputElement).value,
              degree: (document.getElementById('degree') as HTMLInputElement).value,
              jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value,
              company: (document.getElementById('company') as HTMLInputElement).value,
              skills: (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim()),
          };

          generateResume(formData);
      }
  });

  function generateResume(data: ResumeData) {
      const imageHTML = data.profilePicture ? `<img src="${data.profilePicture}" class="image">` : '';

      resumeDiv.innerHTML = `
      <div class="resumeContainer">
          <div class="information">
              <div class="nameAndImage">
                  <div>${imageHTML}</div>
                  <h2>${data.name}</h2>
                  <p>${data.jobTitle}</p>
              </div>
              <div class="Contact">
                <div class="box">
                <i class="fa-solid fa-paper-plane"></i>
                <p>${data.email}</p>
                </div>
                <div class="box">
                <i class="fa-solid fa-phone"></i>
                <p>${data.phone}</p>
                </div>
              </div>
          </div>
          <div class="data">
              <div class="education space">
              <h2>Education</h2>
              <p>${data.degree} from ${data.school}</p>
              </div>
              <div class="experience space">
              <h2>Experience</h2>
              <p>${data.jobTitle} at ${data.company}</p>
              </div>
              <div class="skills space">
              <h2>Skills</h2>
              <ul>
              ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
              </div>
          </div>
      </div>
      `;
      innerContainer.style.display = "none";

  }

});