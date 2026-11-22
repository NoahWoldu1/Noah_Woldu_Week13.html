const btnLoad = document.getElementById("btnLoad");
const output = document.getElementById("output");

btnLoad.addEventListener("click", loadData);

async function loadData() {

    output.innerHTML = "<p>Loading dog breeds...</p>";
    btnLoad.disabled = true;

    try {
        // Fetch data from the public Dog API
        const response = await fetch(
            "https://dog.ceo/api/breeds/list/all"
        );

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Unable to retrieve data.");
        }

        // Convert the response into JSON
        const data = await response.json();

        if (data.status !== "success") {
            throw new Error("The API returned an error.");
        }

        // Convert the breed object into an array
        const breeds = Object.entries(data.message);

        // Get the first 10 dog breeds
        const firstTen = breeds.slice(0, 10);

        // Create HTML to display the data
        let html = "<h2>First 10 Dog Breeds</h2>";
        html += "<ul>";

        firstTen.forEach(function(breed) {
            const breedName = breed[0];
            const subBreeds = breed[1];

            const formattedName =
                breedName.charAt(0).toUpperCase() +
                breedName.slice(1);

            html += "<li>";
            html += "<strong>" + formattedName + "</strong>";

            if (subBreeds.length > 0) {
                html += " - Sub-breeds: ";
                html += subBreeds.join(", ");
            } else {
                html += " - No sub-breeds listed";
            }

            html += "</li>";
        });

        html += "</ul>";

        // Display the results on the webpage
        output.innerHTML = html;

    } catch (error) {

        // Display an error message if the request fails
        output.innerHTML =
            '<p class="error">Error loading data: ' +
            error.message +
            "</p>";

        console.error("Fetch Error:", error);

    } finally {
        btnLoad.disabled = false;
    }
}
