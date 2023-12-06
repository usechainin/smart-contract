const endpoint =
  "https://api.studio.thegraph.com/query/60400/chainlinkhackathon/version/latest";

const query = `
  {
    newApplicants {
      id
      applicant
      listingID
      profileURL
    }
  }
`;

const fetchData = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    // Handle the data here
    console.log("GraphQL Response:", data);

    // Access newApplicants array
    const newApplicants = data.data.newApplicants;
    console.log("New Applicants:", newApplicants);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to fetch data
fetchData();
