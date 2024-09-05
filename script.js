document.addEventListener("DOMContentLoaded", function() {
    const mobileNavButton = document.querySelector('.mobile-nav-button');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileNavButton.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    // Iezīmē aktivizētu saiti
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    // Uzzin kā lietotājs piekļūst mājaslapai (no datora vai telefona)
    if (window.innerWidth <= 768) {
        console.log('Accessed from a mobile device');
    } else {
        console.log('Accessed from a desktop device');
    }
});

//jobs.html bilžu rādīšanas loģika
document.addEventListener("DOMContentLoaded", function() {
    const jobs = document.querySelectorAll(".job");
    const jobDetails = document.querySelector(".job-details");

    // Add click event listener to each job
    jobs.forEach(job => {
        job.addEventListener("click", () => {
            const jobTitle = job.getAttribute("data-job");
            const jobDescription = document.querySelector(`.job-details .job-description img[src='../job_pictures/${jobTitle.toLowerCase().replace(' ', '')}.png']`);
            
            // Update job details view
            document.querySelector(".job-title").textContent = jobTitle;
            jobDescription.src = job.querySelector("img").src;

            // Show job details view
            jobDetails.classList.add("active");
        });
    });
});
