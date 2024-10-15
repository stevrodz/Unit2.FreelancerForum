// Initial freelancer data
const freelancers = [
    { name: "Alice", price: 30, occupation: "writer" },
    { name: "Bob", price: 50, occupation: "teacher" }
];

// New freelancers to be added
const newFreelancers = [
    { name: "Carol", price: 70, occupation: "programmer" },
    { name: "David", price: 40, occupation: "designer" },
    { name: "Eve", price: 90, occupation: "consultant" },
    { name: "Dean", price: 100, occupation: "hunter" },
    { name: "Zoe", price: 200, occupation: "striper" }
];

// Track the index of the next freelancer to be added
let currentIndex = 0;

// Function to create and style elements dynamically
function createStyledElement(tag, textContent = '', styles = {}) {
    const element = document.createElement(tag);
    element.textContent = textContent;

    // Apply inline styles
    for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
    }

    return element;
}

// Function to render the page layout
function renderPage() {
    // Create and style the container
    const container = createStyledElement('div', '', {
        width: '80%',
        margin: '20px auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    });
    
    // Create and style the title
    const title = createStyledElement('h1', 'Freelancer Forum', {
        fontSize: '2em',
        marginBottom: '20px'
    });

    // Create and style the average price section
    const avgPriceContainer = createStyledElement('div', '', {
        fontSize: '1.2em',
        marginBottom: '20px'
    });
    const avgPriceLabel = createStyledElement('h2', 'Average Starting Price: ', {
        display: 'inline-block',
        marginRight: '10px'
    });
    const avgPriceValue = createStyledElement('span', '$0', {
        display: 'inline-block'
    });
    avgPriceContainer.appendChild(avgPriceLabel);
    avgPriceContainer.appendChild(avgPriceValue);

    // Create and style the table
    const table = createStyledElement('table', '', {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    });

    // Create the table header
    const headerRow = createStyledElement('tr', '', {
        backgroundColor: '#f2f2f2'
    });
    ['Name', 'Occupation', 'Starting Price'].forEach(text => {
        const headerCell = createStyledElement('th', text, {
            padding: '10px',
            border: '1px solid #ddd'
        });
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Create the table body
    const tableBody = createStyledElement('tbody');
    table.appendChild(tableBody);

    // Append everything to the container and then to the body
    container.appendChild(title);
    container.appendChild(avgPriceContainer);
    container.appendChild(table);
    document.body.appendChild(container);

    return { tableBody, avgPriceValue };
}

// Function to render the freelancers in the table
function renderFreelancers(tableBody) {
    // Clear the table before rendering
    tableBody.innerHTML = '';

    freelancers.forEach(freelancer => {
        const row = createStyledElement('tr');

        const nameCell = createStyledElement('td', freelancer.name, {
            padding: '10px',
            border: '1px solid #ddd'
        });
        const occupationCell = createStyledElement('td', freelancer.occupation, {
            padding: '10px',
            border: '1px solid #ddd'
        });
        const priceCell = createStyledElement('td', `$${freelancer.price}`, {
            padding: '10px',
            border: '1px solid #ddd'
        });

        row.appendChild(nameCell);
        row.appendChild(occupationCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    });
}

// Function to calculate and display the average price
function calculateAveragePrice(avgPriceElement) {
    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0);
    const average = total / freelancers.length;
    avgPriceElement.textContent = `$${average.toFixed(2)}`;
}

// Function to add a new freelancer
function addNewFreelancer() {
    if (currentIndex < newFreelancers.length) {
        const newFreelancer = newFreelancers[currentIndex];
        freelancers.push(newFreelancer);
        
        // Re-render the table and update the average price
        renderFreelancers(tableBody);
        calculateAveragePrice(avgPriceValue);
        
        currentIndex++;  // Move to the next freelancer in the array
    } else {
        // If all freelancers have been added, clear the interval
        clearInterval(intervalID);
        console.log("All freelancers have been added.");
    }
}

// Initial page load
const { tableBody, avgPriceValue } = renderPage();
renderFreelancers(tableBody);
calculateAveragePrice(avgPriceValue);

// Set interval to add new freelancers every 5 seconds
const intervalID = setInterval(addNewFreelancer, 5000);
