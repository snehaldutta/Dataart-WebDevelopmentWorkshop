// script.js
document.addEventListener("DOMContentLoaded", () => {
    const timelineSection = document.querySelector("section");
    const modal = document.getElementById("modal");

    // Fetch events from events.json
    fetch("data/events.json")
        .then(res => res.json())
        .then(events => renderTimeline(events))
        .catch(err => console.error("Error loading events:", err));

    function renderTimeline(events) {
        events.forEach(event => {
            const marker = document.createElement("div");
            marker.classList.add("event-marker");
            marker.textContent = event.year;
            marker.style.cursor = "pointer";

            // Click to open modal
            marker.addEventListener("click", () => openModal(event));

            timelineSection.appendChild(marker);
        });
    }

    function openModal(event) {
        modal.innerHTML = `
            <div class="modal-content" style="
                background:#fff; 
                max-width:600px; 
                margin:5% auto; 
                padding:1rem; 
                border-radius:6px; 
                position:relative;
            ">
                <span class="close" style="
                    position:absolute; 
                    top:10px; 
                    right:15px; 
                    font-size:24px; 
                    cursor:pointer;
                ">&times;</span>
                <h2>${event.year} - ${event.title}</h2>
                <img src="${event.imageURL}" alt="${event.title}" style="width:100%;border-radius:6px;margin-top:1rem;">
                <p style="margin-top:1rem;">${event.description}</p>
                <small style="display:block;margin-top:0.5rem;color:#555;">Category: ${event.category}</small>
            </div>
        `;
        modal.style.display = "block";

        // Close button
        modal.querySelector(".close").addEventListener("click", closeModal);

        // Close when clicking outside content
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function closeModal() {
        modal.style.display = "none";
    }
});
